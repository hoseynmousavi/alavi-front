import router from "helpers/router/router"
import {AlertModalType} from "types/AlertModalType"
import Button from "views/components/button/Button"
import Modal from "views/components/modal/Modal"

function AlertModal(props: AlertModalType) {
    const {Icon, close, submitType = "primary", title, desc, submitText, cancelText, onSubmit, containerRef} = props

    function onSubmitClick() {
        router.back()
        setTimeout(onSubmit, 50)
    }

    return (
        <Modal className="alert-modal" justDesktopView close={close} desktopRoot={containerRef}>
            <div className="alert-modal-header">
                {Icon && <Icon className="alert-modal-header-icon"/>}
            </div>
            <div className="alert-modal-title">{title}</div>
            {
                desc &&
                <div className="alert-modal-desc">{desc}</div>
            }
            <Button className="alert-modal-submit" desktopType={submitType} desktopIsFullWidth desktopSize="medium" onClick={onSubmitClick} dataTestId="alert-modal-submit-button">{submitText}</Button>
            {
                cancelText &&
                <Button className="alert-modal-cancel" desktopType="primary" desktopIsFullWidth desktopSize="medium" onClick={router.back}>{cancelText}</Button>
            }
        </Modal>
    )
}

export default AlertModal
