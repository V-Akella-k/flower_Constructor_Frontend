// import { makeAutoObservable } from "mobx";

// export type SceneItem = {
//   id: string;
//   flowerId: string;
//   modelLink: string;
//   position: [number, number, number];
//   rotation: [number, number, number];
//   scale: [number, number, number];
// };

// class SceneStore {
//   items: SceneItem[] = [];
//   selectedId: string | null = null;
//   transformMode: "translate" | "rotate" | "scale" = "translate";

//   constructor() {
//     makeAutoObservable(this);
//   }

//   addFlowerToScene(payload: Omit<SceneItem, "id">) {
//     const item = { id: crypto.randomUUID(), ...payload };
//     this.items.push(item);
//     this.selectedId = item.id;
//   }

//   select(id: string | null) {
//     this.selectedId = id;
//   }

//   setMode(mode: SceneStore["transformMode"]) {
//     this.transformMode = mode;
//   }

//   updateItemTransform(id: string, t: Partial<Pick<SceneItem, "position" | "rotation" | "scale">>) {
//     const item = this.items.find((x) => x.id === id);
//     if (!item) return;
//     if (t.position) item.position = t.position;
//     if (t.rotation) item.rotation = t.rotation;
//     if (t.scale) item.scale = t.scale;
//   }

//   removeSelected() {
//     if (!this.selectedId) return;
//     this.items = this.items.filter((x) => x.id !== this.selectedId);
//     this.selectedId = null;
//   }
// }

// export const sceneStore = new SceneStore();


import { makeAutoObservable } from "mobx";

export type SceneItem = {
  id: string;
  flowerId: string;
  modelLink: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
};

class SceneStore {
  items: SceneItem[] = [];
  selectedId: string | null = null;
  transformMode: "translate" | "rotate" | "scale" = "translate";

  constructor() {
    makeAutoObservable(this);
  }

  addFlowerToScene(payload: Omit<SceneItem, "id">) {
    const item: SceneItem = { id: crypto.randomUUID(), ...payload };
    this.items.push(item);
    this.selectedId = item.id;
  }

  select(id: string | null) {
    this.selectedId = id;
  }

  setMode(mode: SceneStore["transformMode"]) {
    this.transformMode = mode;
  }

  updateItemTransform(
    id: string,
    t: Partial<Pick<SceneItem, "position" | "rotation" | "scale">>
  ) {
    const item = this.items.find((x) => x.id === id);
    if (!item) return;
    if (t.position) item.position = t.position;
    if (t.rotation) item.rotation = t.rotation;
    if (t.scale) item.scale = t.scale;
  }

  remove(id: string) {
    this.items = this.items.filter((x) => x.id !== id);
    if (this.selectedId === id) this.selectedId = null;
  }

  removeSelected() {
    if (!this.selectedId) return;
    this.remove(this.selectedId);
  }
}

export const sceneStore = new SceneStore();
