import { IGateway } from "../interfaces/gateway"
import close from '../assets/icons/close.svg'
import pc from '../assets/icons/pc.svg';
import { getDateFormat } from "../helpers/date";

interface Props {
    data: IGateway
    setIsOpen: (isOpen: boolean) => any
}

export const Show = ({ setIsOpen, data }: Props) => {
    return (
        <div className="create_gateway_container">
            <div className="create_gateway_container__backdrop" onClick={() => setIsOpen(false)}></div>
            <div className="create_gateway_container__form">
                <button className="close" onClick={() => setIsOpen(false)}>
                    <img src={close} alt="close_icon" width="14px" height="14px" />
                </button>

                <div className="create_gateway_container__form__header">
                    <span>Gateway Info</span>
                </div>
                <div className="create_gateway_container__form__row gateway_row">
                    <span><strong>Name: </strong>{data.name}</span>
                    <span><strong>IP Address: </strong>{data.ip_address}</span>
                </div>
                {data.peripherals.map((peripheral, index) => (
                <div key={index} className="create_gateway_container__form__row peripheral_row">
                    <span><strong>UID: </strong>{peripheral.UID}</span>
                    <span><strong>Vendor: </strong>{peripheral.vendor}</span>
                    <span><strong>Status: </strong><span className={peripheral.status}>{peripheral.status}</span></span>
                    <span><strong>Created: </strong>{getDateFormat(peripheral.createdAt ? peripheral.createdAt : "")}</span>
                </div>
                ))}
            </div>
        </div>
    )
}