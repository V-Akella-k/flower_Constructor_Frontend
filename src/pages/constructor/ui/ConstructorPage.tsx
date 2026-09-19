import { FlowerCatalog } from "@/widgets/FlowersCatalog";
import "./constructor-page.css";
import { FlowerConstructor } from "@/widgets/flower-constructor/ui/FlowerConstructor";
import { orderFormStore } from "@/features/OrderForm/model/orderFormStore";

const ConstructorPage = () => {
    return (
        <div className="constructor-page">
            <div className="constructor-layout">
                <FlowerConstructor />
                <FlowerCatalog />
            </div>
            <div className='constructor-section__buttons'>
                <button
                    className="constructor-section__open-popup"
                    onClick={() => orderFormStore.open()}
                >
                Оставить заказ
                </button>
            </div>
        </div>
    );
};

export default ConstructorPage;