import {ReactElement} from "react"

export interface SwitchProps {
    children: ReactElement<SwitchChildProps> | Array<ReactElement<SwitchChildProps>>,
    className?: string,
    isParentRendering?: boolean,
    level: number,
    onActiveRouteChange?: ({activeRouteIndex}: { activeRouteIndex: number }) => void,
    isTab?: boolean,
}

export interface SwitchStateType {
    showChildIndex: number,
    location: string,
    id: string,
    lastScrollY?: number,
}

export interface SwitchChildProps {
    path: string
    exact: boolean
    isContainer: boolean
    location: string
    isRendering: boolean
}

export interface RouterType {
    isRendering: boolean,
    params: { [key: string]: string },
    location: string
}

export interface PageRouterType {
    route: RouterType
}

export interface SwitchItemProps {
    index: number,
    stateLength: number,
    element: ReactElement<SwitchChildProps>,
    location: string,
    isParentRendering?: boolean,
    isTab?: boolean,
}
