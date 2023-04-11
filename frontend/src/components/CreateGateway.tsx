import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import close from '../assets/icons/close.svg'
import { IGateway } from '../interfaces/gateway'
import { IPeripheral } from '../interfaces/peripheral'
import { createGateway, editGateway } from '../services/gateway'
import { CreatePeripheral } from './CreatePeripheral'

interface Props {
    type: string;
    data?: IGateway
    setIsOpen: (isOpen: boolean, update: boolean) => any
}

export const CreateGateway = ({ type, data, setIsOpen }: Props) => {
    const [name, setName] = useState<{ error: string; message: string; value: string, dirty: boolean }>({ error: "", message: "", value: type === 'edit' && data ? data.name : "", dirty: type === 'edit' && data ? true : false });
    const [ipAddress, setIpAddress] = useState<{ error: string; message: string; value: string, dirty: boolean }>({ error: "", message: "", value: type === 'edit' && data ? data.ip_address : "", dirty: type === 'edit' && data ? true : false });
    const [peripherals, setPeripherals] = useState<IPeripheral[]>(type === 'edit' && data ? data.peripherals.concat({
        status: 'online',
        UID: data.peripherals[data.peripherals.length -1].UID +1,
        vendor: ''
    }) : [{
        status: 'online',
        UID: 0,
        vendor: ''
    }])

    const addNewPeripheralForm = () => {
        if (peripherals.length < 10) {
            setPeripherals(peripherals.concat([{ status: 'online', UID: peripherals.length, vendor: "" }]))
        } else {
            toast.error("You can only have 10 peripheral per gateway")
        }
    }

    useEffect(() => {
        if (!/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/.test(ipAddress.value) && ipAddress.dirty) {
            setIpAddress({ ...ipAddress, error: 'error', message: 'Invalid ip address' })
        } else {
            setIpAddress({ ...ipAddress, error: '', message: '' })
        }
    }, [ipAddress.value, ipAddress.dirty])

    useEffect(() => {
        if (name.value.trim() === "" && name.dirty) {
            setName({ ...name, error: 'error', message: 'The name is required' })
        } else {
            setName({ ...name, error: '', message: '' })
        }
    }, [name.error, name.value, name.dirty])

    const updatePeripherals = (i: number, peripheral: IPeripheral) => {
        const temp: IPeripheral[] = [];
        peripherals.forEach((el, index) => {
            if (index === i) {
                temp.push(peripheral)
            } else {
                temp.push(el)
            }
        })
        setPeripherals(temp)
    }

    const handleSubmit = async () => {
        if (!name.dirty || !ipAddress.dirty) {
            setName({ ...name, dirty: true })
            setIpAddress({ ...ipAddress, dirty: true })
        } else if (name.error === "" && ipAddress.error === "") {
            const gateway: IGateway = {
                ip_address: ipAddress.value,
                name: name.value,
                peripherals: peripherals.filter(p => p.vendor.trim() != "")
            }
            toast.promise(
                (type === 'edit' && data && data._id) ? editGateway(gateway, data._id) :createGateway(gateway),
                {
                    loading: "Saving",
                    success: () => {
                        setIsOpen(false, true);
                        return 'Gateway created successfully';
                    },
                    error: "An error occur on creating  a new gateway."
                }
            )
        }
    }

    const onDelete = (i: number) => {
        const temp: IPeripheral[] = [];
        peripherals.forEach((el, index) => {
            if (index !== i) {
                temp.push(el)
            }
        })
        setPeripherals([])
        setTimeout(() => {
            setPeripherals(temp)
        })
    }

    return (
        <div className="create_gateway_container">
            <div className="create_gateway_container__backdrop" onClick={() => setIsOpen(false, false)}></div>
            <div className="create_gateway_container__form">
                <button className="close" onClick={() => setIsOpen(false, false)}>
                    <img src={close} alt="close_icon" width="14px" height="14px" />
                </button>
                <div className="create_gateway_container__form__header">
                    <span>Create Gateway</span>
                </div>
                <div className="create_gateway_container__form__row">
                    <div>
                        <div className={`create_gateway_container__form__row__input_container ${name.error}`}>
                            <input type="text" value={name.value} onChange={(el) => setName({ ...name, value: el.target.value, dirty: true })} placeholder="Gateway name" />
                        </div>
                        <span className="create_gateway_container__form__row__input_container__error">{name.message}</span>
                    </div>
                    <div>
                        <div className={`create_gateway_container__form__row__input_container ${ipAddress.error}`}>
                            <input type="text" value={ipAddress.value} onChange={(el) => setIpAddress({ ...ipAddress, value: el.target.value, dirty: true })} placeholder="IP address" />
                        </div>
                        <span className="create_gateway_container__form__row__input_container__error">{ipAddress.message}</span>
                    </div>
                </div>
                {peripherals.map((peripheral, index) => (
                    <CreatePeripheral isLast={index + 1 === peripherals.length} key={index} index={index} onFinish={addNewPeripheralForm} peripheral={peripheral} updatePeripheral={updatePeripherals} onDelete={onDelete} />
                ))}
                <div className="create_gateway_container__form__row">
                    <div className="spacer" />
                    <button className='accent_button' onClick={handleSubmit}>{type === "edit" ? "Modify" :"Create"}</button>
                </div>
            </div>
        </div>
    )
}