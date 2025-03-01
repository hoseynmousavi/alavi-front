import {CSSProperties, MouseEventHandler, ReactNode, RefObject} from "react"
import LinkType from "types/LinkType"

type btnType = "primary" | "primary-light"

export type ButtonMobileType = btnType

export type ButtonDesktopType = btnType

export type ButtonSizeType = "xx-large" | "x-large" | "large" | "medium" | "small"

export interface ButtonType {
    btnRef?: RefObject<HTMLDivElement & HTMLAnchorElement & HTMLButtonElement> | RefObject<null>,
    mobileType?: ButtonMobileType,
    desktopType?: ButtonDesktopType,
    desktopIsFullWidth?: boolean,
    mobileIsFullWidth?: boolean,
    desktopSize?: ButtonSizeType,
    mobileSize?: ButtonSizeType,
    desktopIsSquare?: boolean,
    mobileIsSquare?: boolean,
    desktopIsRounded?: boolean,
    mobileIsRounded?: boolean,
    isLoading?: boolean,
    isDisable?: boolean,
    className?: string,
    style?: CSSProperties,
    ariaLabel?: string,
    children?: ReactNode,
    link?: LinkType,
    onClick?: MouseEventHandler | ((props: any) => void),
    onDisableClick?: MouseEventHandler | (() => void),
    rippleColor?: string,
    disableRipple?: boolean,
    isDiv?: boolean,
    escapeStart?: boolean,
    escapeEnd?: boolean,
    escapeBlock?: boolean,
    dataTestId?: string,
}
