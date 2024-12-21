import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateBooking from "./CreateBooking";

function AddBooking() {
    return (
        <div>
            <Modal>
                <Modal.Open opens="add-booking">
                    <Button>Add new booking</Button>
                </Modal.Open>
                <Modal.Window name="add-booking">
                    <CreateBooking />
                </Modal.Window>
            </Modal>
        </div>
    );
}

export default AddBooking;
