import { observer } from "mobx-react-lite";
import { Canvas, useThree } from "@react-three/fiber";
import { Html, OrbitControls, TransformControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import "./flower-constructor.css";

import { DND_MIME, type DragFlowerPayload } from "@/features/drag-flower-to-scene/model/types";
import { sceneStore, type SceneItem } from "@/features/drag-flower-to-scene/model/store";

function Ground() {
    return (
        <mesh
            rotation-x={-Math.PI / 2}
            position={[0, 0, 0]}
            receiveShadow
            onPointerDown={() => sceneStore.select(null)}
        >
            <planeGeometry args={[30, 30]} />
            <meshStandardMaterial transparent opacity={0.15} />
        </mesh>
    );
}

/**
 * Нормализует размер модели: максимальная сторона bbox станет ~targetSize.
 * Центрирует модель по центру bbox.
 */
function NormalizedModel({ url, targetSize = 1 }: { url: string; targetSize?: number }) {
    const gltf = useGLTF(url);

    const normalized = useMemo(() => {
        const root = gltf.scene.clone(true);

        const box = new THREE.Box3().setFromObject(root);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        // центрируем вокруг (0,0,0)
        root.position.sub(center);

        // нормализуем размер
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const k = targetSize / maxDim;
        root.scale.setScalar(k);

        return root;
    }, [gltf.scene, targetSize]);

    return <primitive object={normalized} />;
}

function FlowerObject({
    item,
    onSelectObject,
}: {
    item: SceneItem;
    onSelectObject: (obj: THREE.Object3D | null) => void;
}) {
    const groupRef = useRef<THREE.Group>(null);

    return (
        <group
            ref={groupRef}
            position={item.position}
            rotation={item.rotation}
            scale={item.scale}
            onPointerDown={(e) => {
                e.stopPropagation();
                sceneStore.select(item.id);
                onSelectObject(groupRef.current);
            }}
        >
            <Suspense fallback={null}>
                <NormalizedModel url={item.modelLink} targetSize={1} />
            </Suspense>
        </group>
    );
}

function DropZone() {
    const { camera, gl, raycaster, scene } = useThree();

    const groundPlane = useMemo(
        () => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
        []
    );

    // фон (один раз)
    useEffect(() => {
        scene.background = new THREE.Color(0x563c29);
    }, [scene]);

    return (
        <Html fullscreen style={{ pointerEvents: "none" }}>
            <div
                style={{ position: "absolute", inset: 0, pointerEvents: "auto" }}
                onDragOver={(e) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = "copy";
                }}
                onDrop={(e) => {
                    e.preventDefault();

                    const raw = e.dataTransfer.getData(DND_MIME);
                    if (!raw) return;

                    const data = JSON.parse(raw) as DragFlowerPayload;
                    if (!data.modelLink) return;

                    const rect = gl.domElement.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

                    raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

                    const hit = new THREE.Vector3();
                    const ok = raycaster.ray.intersectPlane(groundPlane, hit);
                    if (!ok) return;

                    sceneStore.addFlowerToScene({
                        flowerId: data.flowerId,
                        modelLink: data.modelLink,
                        position: [hit.x, 0.05, hit.z], // чуть выше пола
                        rotation: [0, 0, 0],
                        scale: [1, 1, 1],
                    });
                }}
            />
        </Html>
    );
}

function Hud() {
    return (
        <Html fullscreen style={{ pointerEvents: "none" }}>
            <div
                style={{
                    position: "absolute",
                    left: 16,
                    top: 16,
                    display: "flex",
                    gap: 8,
                    pointerEvents: "auto",
                }}
            >
                <button onClick={() => sceneStore.setMode("translate")}>Move</button>
                <button onClick={() => sceneStore.setMode("rotate")}>Rotate</button>
                <button onClick={() => sceneStore.setMode("scale")}>Scale</button>
                <button
                    onClick={() => sceneStore.removeSelected()}
                    disabled={!sceneStore.selectedId}
                >
                    Delete
                </button>
            </div>
        </Html>
    );
}

const Scene = observer(() => {
    const orbitRef = useRef<any>(null);
    const tcRef = useRef<any>(null); // TransformControls instance
    const [selectedObject, setSelectedObject] = useState<THREE.Object3D | null>(null);

    // если сняли выделение — убираем gizmo target
    useEffect(() => {
        if (!sceneStore.selectedId) setSelectedObject(null);
    }, [sceneStore.selectedId]);

    // события TransformControls: отключаем orbit и синхронизируем трансформы в store
    useEffect(() => {
        const tc = tcRef.current;
        if (!tc) return;

        const onDraggingChanged = (event: any) => {
            if (orbitRef.current) orbitRef.current.enabled = !event.value;
        };

        const onChange = () => {
            if (!sceneStore.selectedId || !selectedObject) return;

            const p = selectedObject.position;
            const r = selectedObject.rotation;
            const s = selectedObject.scale;

            sceneStore.updateItemTransform(sceneStore.selectedId, {
                position: [p.x, p.y, p.z],
                rotation: [r.x, r.y, r.z],
                scale: [s.x, s.y, s.z],
            });
        };

        tc.addEventListener("dragging-changed", onDraggingChanged);
        tc.addEventListener("change", onChange);

        return () => {
            tc.removeEventListener("dragging-changed", onDraggingChanged);
            tc.removeEventListener("change", onChange);
        };
    }, [selectedObject]);

    return (
        <>
            <ambientLight intensity={0.7} />
            <directionalLight intensity={0.9} position={[10, 10, 5]} />
            <Ground />

            {sceneStore.items.map((item) => (
                <FlowerObject key={item.id} item={item} onSelectObject={setSelectedObject} />
            ))}

            {sceneStore.selectedId && selectedObject && (
                <TransformControls
                    ref={tcRef}
                    object={selectedObject}
                    mode={sceneStore.transformMode}
                />
            )}

            <DropZone />
            <OrbitControls ref={orbitRef} makeDefault enableDamping />
            <Hud />
        </>
    );
});

export const FlowerConstructor = observer(() => {
    return (
        <section className="flower-constructor">
            <div className="constructor-section">
                <div className="constructor-header">
                    <h2>3D Конструктор</h2>
                </div>

                <div className="constructor-content">
                    <div className="canvas-container">
                        <Canvas camera={{ position: [0, 3, 6], fov: 50 }}>
                            <Scene />
                        </Canvas>
                    </div>
                </div>
            </div>
        </section>
    );
});


// import { observer } from "mobx-react-lite";
// import { Canvas, useThree } from "@react-three/fiber";
// import { Html, OrbitControls, useGLTF } from "@react-three/drei";
// import * as THREE from "three";
// import { useMemo } from "react";
// import "./flower-constructor.css";

// import { DND_MIME, type DragFlowerPayload } from "@/features/drag-flower-to-scene/model/types";
// import { sceneStore } from "@/features/drag-flower-to-scene/model/store"; // или твой constructorStore

// function Ground() {
//     return (
//         <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]} receiveShadow>
//             <planeGeometry args={[20, 20]} />
//             <meshStandardMaterial transparent opacity={0.15} />
//         </mesh>
//     );
// }

// function FlowerInstance({ url, position, rotation, scale }: {
//     url: string;
//     position: [number, number, number];
//     rotation: [number, number, number];
//     scale: [number, number, number];
// }) {
//     const gltf = useGLTF(url);
//     const cloned = useMemo(() => gltf.scene.clone(true), [gltf.scene]);
//     return <primitive object={cloned} position={position} rotation={rotation} scale={scale} />;
// }

// function DropZone() {
//     const { camera, gl, raycaster, scene } = useThree();

//     // плоскость y=0
//     const groundPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), []);

//     // фон (опционально)
//     scene.background = useMemo(() => new THREE.Color(0x563c29), []);

//     return (
//         <Html fullscreen style={{ pointerEvents: "none" }}>
//             <div
//                 style={{ position: "absolute", inset: 0, pointerEvents: "auto" }}
//                 onDragOver={(e) => {
//                     e.preventDefault();
//                     e.dataTransfer.dropEffect = "copy";
//                 }}
//                 onDrop={(e) => {
//                     e.preventDefault();

//                     const raw = e.dataTransfer.getData(DND_MIME);
//                     console.log("DROP raw:", raw);
//                     if (!raw) return;

//                     const data = JSON.parse(raw) as DragFlowerPayload;
//                     console.log("DROP data:", data);

//                     const rect = gl.domElement.getBoundingClientRect();
//                     console.log("canvas rect:", rect);

//                     const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
//                     const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

//                     console.log("NDC:", { x, y });

//                     raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

//                     const hit = new THREE.Vector3();
//                     const ok = raycaster.ray.intersectPlane(groundPlane, hit);
//                     console.log("hit ok:", ok, "hit:", hit);
//                     if (!ok) return;

//                     sceneStore.addFlowerToScene({
//                         flowerId: data.flowerId,
//                         modelLink: data.modelLink,
//                         position: [hit.x, 0, hit.z],
//                         rotation: [0, 0, 0],
//                         scale: [1, 1, 1],
//                     });

//                     console.log("STORE items:", sceneStore.items);
//                 }}
//             />
//         </Html>
//     );
// }

// const Scene = observer(() => {
//     return (
//         <>
//             <ambientLight intensity={0.6} />
//             <directionalLight intensity={0.8} position={[10, 10, 5]} />
//             <Ground />

//             {sceneStore.items.map((item) => (
//                 <FlowerInstance
//                     key={item.id}
//                     url={item.modelLink}
//                     position={item.position}
//                     rotation={item.rotation}
//                     scale={item.scale}
//                 />
//             ))}
//             <DropZone />
//             <OrbitControls makeDefault enableDamping />
//         </>
//     );
// })

// export const FlowerConstructor = observer(() => {
//     return (
//         <section className="flower-constructor">
//             <div className="constructor-section">
//                 <div className="constructor-header">
//                     <h2>3D Конструктор</h2>
//                 </div>

//                 <div className="constructor-content">
//                     <div className="canvas-container">
//                         <Canvas camera={{ position: [0, 3, 6], fov: 50 }}>
//                             <Scene />
//                         </Canvas>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// });