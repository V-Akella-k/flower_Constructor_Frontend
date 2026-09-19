import { observer } from "mobx-react-lite";
import { Modal } from "@/shared/ui/Modal/Modal";
import { OrderForm } from "@/features/OrderForm";
import { orderFormStore } from "@/features/OrderForm/model/orderFormStore";

export const OrderFormModal = observer(() => {
    return (
        <Modal isOpen={orderFormStore.isOpen} onClose={() => orderFormStore.close()}>
            <OrderForm />
        </Modal>
    );
});
