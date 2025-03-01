import useScreen from "context/screen/hooks/useScreen"
import onPopState from "helpers/router/onPopState"
import {useEffect, useRef} from "react"
import {ModalImperativeRef, ModalType} from "types/ModalType"
import DesktopModal from "views/components/modal/DesktopModal"
import MobileModal from "views/components/modal/MobileModal"

function Modal(props: ModalType) {
    const {
        mobileRootClassName = "",
        className = "",
        backClassName = "",
        children,
        close,
        statusBarColor,
        justDesktopView,
        root,
        desktopRoot,
        mobileRoot,
        disableClose,
    } = props
    const {isMobile} = useScreen()
    const modalRef = useRef<ModalImperativeRef>({})

    useEffect(() => {
        onPopState({
            statusBarColor: statusBarColor ? statusBarColor : "#050909",
            callback: () => {
                modalRef.current.desktopClose?.()
                modalRef.current.mobileClose?.()
            },
        })
        // eslint-disable-next-line
    }, [])

    if (isMobile && !justDesktopView) {
        return (
            <MobileModal mobileRootClassName={mobileRootClassName} className={className} backClassName={backClassName} close={close} ref={modalRef} root={mobileRoot || root} disableClose={disableClose}>
                {children}
            </MobileModal>
        )
    }
    else {
        return (
            <DesktopModal className={className} backClassName={backClassName} close={close} ref={modalRef} root={desktopRoot || root} disableClose={disableClose}>
                {children}
            </DesktopModal>
        )
    }
}

export default Modal
