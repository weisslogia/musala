import { useState } from 'react'
import add from '../assets/icons/add.svg'
import remove from '../assets/icons/delete.svg'
import { IPeripheral } from '../interfaces/peripheral'

interface Props {
    isLast: boolean,
    index: number,
    peripheral: IPeripheral,
    onFinish: () => any
    updatePeripheral: (index: number, peripheral: IPeripheral) => any
    onDelete: (index: number) => any
}

export const CreatePeripheral = ({ isLast, index, peripheral, onFinish, updatePeripheral, onDelete }: Props) => {
    const [UID, setUID] = useState<number>(peripheral.UID)
    const [status, setStatus] = useState<string>(peripheral.status)
    const [vendor, setVendor] = useState<string>(peripheral.vendor)

    const changeUID = (evt: any) => {
        setUID(Number(evt.target.value))
        updatePeripheral(index, {UID: Number(evt.target.value), status, vendor})
    }

    const changeStatus = (evt: any) => {
        setStatus(evt.target.value)
        updatePeripheral(index, {UID, status: evt.target.value, vendor})
    }

    const changeVendor = (evt: any) => {
        setVendor(evt.target.value)
        updatePeripheral(index, {UID, status, vendor: evt.target.value})
    }

    return (
        <div className="create_gateway_container__form__row">
            <div className="create_gateway_container__form__row__input_container peripheral uid">
                <input type="number" value={UID} onChange={changeUID} placeholder="UID" />
            </div>
            <div className="create_gateway_container__form__row__input_container peripheral">
                <select value={status} onChange={changeStatus}>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                </select>
            </div>
            <div className="create_gateway_container__form__row__input_container peripheral">
                <input type="text" value={vendor} placeholder="Vendor" onChange={changeVendor} />
            </div>
            {isLast && (
                <button onClick={onFinish} className="subform__addNew">
                    <img src={add} alt="close_icon" width="16px" height="16px" />
                </button>
            )}
            {!isLast && (
                <button onClick={() => onDelete(index)} className="subform__addNew">
                    <img src={remove} alt="close_icon" width="16px" height="16px" />
                </button>
            )}
        </div>
    )
}