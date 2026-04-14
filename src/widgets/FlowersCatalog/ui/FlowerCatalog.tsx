import { useEffect } from "react"
import { CatalogCard } from "./CatalogCard"
import { flowerStore } from "../model/flowerStore"
import { observer } from "mobx-react-lite";
import './flower-catalog.css'

export const FlowerCatalog = observer(() => {
    useEffect(() => {
        flowerStore.loadAllFlowers();
    }, []);

    const flowers = flowerStore.getFlowers();

    return (
        <aside className="catalog-panel">
            <div className="catalog-panel__header">
                <h3 className="catalog-panel__title">Каталог цветов</h3>
            </div>

            <div className="catalog-grid">
                {flowers.map((flower) => (
                    <CatalogCard
                        key={flower.flower_id}
                        flowerId={String(flower.flower_id)}
                        modelLink={flower.model_link}   // <-- важно: реальное поле с glb url
                        imgLink={flower.img ?? ""}
                        title={flower.name ?? ""}
                    />
                ))}
            </div>
        </aside>
    );
});