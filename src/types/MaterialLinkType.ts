import {CSSProperties, HTMLAttributeReferrerPolicy, MouseEventHandler, ReactNode, RefObject} from "react"
import LinkType from "types/LinkType"

export type MaterialLinkRefType = HTMLDivElement & HTMLAnchorElement & HTMLButtonElement

export interface useMaterialType {
    rippleColor?: string,
    contRef?: RefObject<HTMLDivElement & HTMLAnchorElement & HTMLButtonElement | null>,
    isDisable?: boolean,
    disableRipple?: boolean,
    onDisableClick?: MouseEventHandler,
    onClick?: MouseEventHandler,
    link?: LinkType,
}

export interface MaterialLinkType extends useMaterialType {
    children: ReactNode,
    isDiv?: boolean,
    className?: string,
    style?: CSSProperties,
    ariaLabel?: string,
    onMouseEnter?: MouseEventHandler,
    onMouseLeave?: MouseEventHandler,
    dataTestId?: string,
    referrerPolicy?: HTMLAttributeReferrerPolicy,
}
