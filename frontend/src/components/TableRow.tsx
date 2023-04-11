import { useState } from "react";
import toast from "react-hot-toast";
import { IGateway } from "../interfaces/gateway";
import { deleteGateway } from "../services/gateway";
import remove from '../assets/icons/delete.svg';
import edit from '../assets/icons/edit.svg';
import show from '../assets/icons/show.svg';
import { Confirm } from "./Confirm";
import { CreateGateway } from "./CreateGateway";
import { Show } from "./Show";

interface Props {
    gateway: IGateway;
    onDelete: (refresh: boolean) => void
}

export const TableRow = ({ gateway, onDelete }: Props) => {
    const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
    const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
    const [isOpenShow, setIsOpenShow] = useState<boolean>(false);

    const handleRemoveModal = async (visible: boolean, ok: boolean) => {
        setIsOpenConfirm(visible);
        if (ok) {
            toast.promise(
                deleteGateway(gateway._id ? gateway._id : ""),
                {
                    error: "An error occurred while deleting a gateway.",
                    success: () => {
                        onDelete(true);
                        return "Gateway deleted successfully."
                    },
                    loading: "Deleting"
                }
            )
        }
    }

    const handleCreateModal = (isOpen: boolean, refresh: boolean) => {
        setIsOpenEdit(isOpen)
        onDelete(refresh)
    }

    const handleShowModal = (isOpen:  boolean) => {
        setIsOpenShow(isOpen)
    }
    return (
        <div className="table__gridify table_row">
            <span>{gateway.name}</span>
            <span>{gateway.peripherals.length} / 10</span>
            <span>{gateway.ip_address}</span>
            <div className="actions">
                <button onClick={() => setIsOpenShow(!isOpenShow)} ><img src={show} alt="show-icon" width="14px" height="14px" /></button>
                <button onClick={() => setIsOpenEdit(!isOpenEdit)} ><img src={edit} alt="show-icon" width="14px" height="14px" /></button>
                <button onClick={() => setIsOpenConfirm(!isOpenConfirm)} ><img src={remove} alt="show-icon" width="14px" height="14px" /></button>
            </div>
            {isOpenConfirm && (
                <Confirm setIsOpen={handleRemoveModal} />
            )}
            {isOpenEdit && (
                <CreateGateway type="edit" data={gateway} setIsOpen={handleCreateModal} />
            )}
            {isOpenShow && (
                <Show setIsOpen={handleShowModal} data={gateway}/>
            )}
        </div>
    )
}