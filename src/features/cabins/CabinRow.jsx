import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";

import { formatCurrency } from "../../utils/helpers";
import styled from "styled-components";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CreateCabinForm from "./CreateCabinForm";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Price = styled.div`
    font-family: "Sono";
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: "Sono";
    font-weight: 500;
    color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
    const { isDeleting, deleteCabin } = useDeleteCabin();
    const { isCreating, createCabin } = useCreateCabin();
    const isWorking = isDeleting || isCreating;

    const {
        id: cabinId,
        description,
        discount,
        image,
        maxCapacity,
        name,
        regularPrice,
    } = cabin;

    function handleCopyCabin() {
        createCabin({
            name: `Copy of ${name}`,
            description,
            discount,
            image,
            maxCapacity,
            regularPrice,
        });
    }

    return (
        <Table.Row>
            <Img src={image} alt={description} />
            <Cabin>{name}</Cabin>
            <div>Fits up to {maxCapacity} guests</div>
            <Price>{formatCurrency(regularPrice)}</Price>
            {discount ? (
                <Discount>{formatCurrency(discount)}</Discount>
            ) : (
                <span>&mdash;</span>
            )}
            <div>
                <Modal>
                    <Menus.Menu>
                        <Menus.Toggle id={cabinId} />
                        <Menus.List name={cabinId}>
                            <Menus.Button
                                icon={<HiSquare2Stack />}
                                disabled={isWorking}
                                onClick={handleCopyCabin}
                            >
                                Duplicate
                            </Menus.Button>
                            <Modal.Open opens="edit">
                                <Menus.Button icon={<HiPencil />}>
                                    Edit
                                </Menus.Button>
                            </Modal.Open>

                            <Modal.Open opens="delete">
                                <Menus.Button icon={<HiTrash />}>
                                    Delete
                                </Menus.Button>
                            </Modal.Open>
                        </Menus.List>
                        <Modal.Window name="edit">
                            <CreateCabinForm cabinToEdit={cabin} />
                        </Modal.Window>
                        <Modal.Window name="delete">
                            <ConfirmDelete
                                resourceName="cabin"
                                onConfirm={() => deleteCabin(cabinId)}
                                disabled={isWorking}
                            />
                        </Modal.Window>
                    </Menus.Menu>
                </Modal>
            </div>
        </Table.Row>
    );
}

export default CabinRow;
