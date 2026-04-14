import { FlowerCatalog } from "@/widgets/FlowersCatalog";
import "./constructor-page.css";
import { FlowerConstructor } from "@/widgets/flower-constructor/ui/FlowerConstructor";

const ConstructorPage = () => {
    return (
        <div className="constructor-page">
            <div className="constructor-layout">
                <FlowerConstructor />
                <FlowerCatalog />
            </div>
        </div>
    );
};

export default ConstructorPage;