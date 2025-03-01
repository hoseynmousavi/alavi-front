import stopPropagation from "helpers/general/stopPropagation"
import router from "helpers/router/router"
import {MouseEvent, useImperativeHandle, useRef, useState} from "react"
import {createPortal} from "react-dom"
import {DesktopModalType} from "types/ModalType"

function DesktopModal(props: DesktopModalType) {
    const {children, className, backClassName, close, ref, disableClose, root = document.body} = props
    const [hide, setIsHide] = useState(false)
    const desktopModalRef = useRef<HTMLDivElement>(null)

    useImperativeHandle(ref, () => ({
        desktopClose: closeModal,
        // eslint-disable-next-line
    }), [])

    function closeModal() {
        setIsHide(true)
        if (close) {
            setTimeout(close, 350)
        }
    }

    function goBackIfNotHiding(e: MouseEvent) {
        stopPropagation(e)
        if (disableClose) {
        }
        else if (!hide) {
            router.back()
        }
    }

    return (
        createPortal(
            <>
                <div className={`modal-background ${backClassName} ${hide ? "hide" : ""}`} onClick={goBackIfNotHiding}/>
                <div className={`desktop-modal ${className} ${hide ? "hide" : ""}`} ref={desktopModalRef} onClick={stopPropagation}>
                    {children}
                </div>
            </>
            ,
            root as HTMLElement,
        )
    )
}

export default DesktopModal
