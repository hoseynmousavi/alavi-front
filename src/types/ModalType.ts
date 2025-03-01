import {ReactNode, RefObject} from "react"

export interface ModalImperativeRef {
    desktopClose?: () => void;
    mobileClose?: () => void;
}

export interface DesktopModalType {
    children: ReactNode,
    className?: string,
    backClassName?: string,
    close: () => void,
    disableClose?: boolean,
    root?: HTMLElement | null
    ref: RefObject<ModalImperativeRef>
}

export interface MobileModalType extends DesktopModalType {
    mobileRootClassName?: string,
}

export interface ModalType extends Omit<MobileModalType, "ref"> {
    statusBarColor?: string,
    justDesktopView?: boolean
    desktopRoot?: HTMLElement | null,
    mobileRoot?: HTMLElement | null,
}
