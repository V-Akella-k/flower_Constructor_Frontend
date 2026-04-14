import { observer } from "mobx-react-lite";
import { Modal } from "@/shared/ui/Modal/Modal";
import { RequestForm } from "@/features/RequestForm";
import { requestFormStore } from "@/features/RequestForm/model/requestFormStore";

export const RequestFormModal = observer(() => {
    return (
        <Modal isOpen={requestFormStore.isOpen} onClose={() => requestFormStore.close()}>
            <RequestForm />
        </Modal>
    );
});
