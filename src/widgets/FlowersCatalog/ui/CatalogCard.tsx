import { DND_MIME } from '@/features/drag-flower-to-scene/model/types';
import './catalog-card.css';

interface CatalogCardProps {
    imgLink: string,
    title: string,
    modelLink: string,
    flowerId: string,
}

export const CatalogCard = ({ flowerId, title, imgLink, modelLink }: CatalogCardProps) => {
    return (
        <div
            className="catalog-card"
            draggable
            onDragStart={(e) => {
                const payload = { flowerId, title, modelLink };
                console.log("DRAG START:", payload);

                e.dataTransfer.setData(DND_MIME, JSON.stringify(payload));
                e.dataTransfer.effectAllowed = "copy";
            }}
        >
            {imgLink ? (
                <img className="catalog-card__img" src={imgLink} alt={title} />
            ) : (
                <div className="catalog-card__img catalog-card__img--placeholder" />
            )}
            <span className="catalog-card__title">{title}</span>
        </div>
    );
};