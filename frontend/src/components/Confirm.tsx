import close from '../assets/icons/close.svg'

interface Props {
    setIsOpen: (visible: boolean, ok: boolean) => any
}

export const Confirm = ({setIsOpen }: Props) => {

    return (
        <div className="create_gateway_container">
            <div className="create_gateway_container__backdrop" onClick={() => setIsOpen(false, false)}></div>
            <div className="create_gateway_container__form">
                <button className="close" onClick={() => setIsOpen(false, false)}>
                    <img src={close} alt="close_icon" width="14px" height="14px" />
                </button>
                <div className="create_gateway_container__form__header">
                    <span>Remove Element</span>
                </div>
                <div className="create_gateway_container__form__row">
                    Do you want to delete the selected gateway?
                </div>
                <div className="create_gateway_container__form__row">
                    <div className="spacer" />
                    <div style={{display: "flex"}}>
                    <button style={{display: "flex", marginRight: '10px'}} onClick={()=> setIsOpen(false, false)}>Cancel</button>
                    <button className='accent_button' onClick={()=> setIsOpen(false, true)}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}