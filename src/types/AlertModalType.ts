import {ButtonDesktopType} from "types/ButtonType"
import {ComponentAsPropsType} from "types/ComponentAsPropsType"

export interface AlertModalType {
    Icon?: ComponentAsPropsType,
    close: () => void,
    submitType?: ButtonDesktopType,
    title: string,
    desc?: string,
    submitText: string,
    cancelText?: string,
    onSubmit: () => void,
    containerRef?: HTMLElement
}