export interface ThemeStateType {
    hideDesktopHeader: boolean,
    coloredDesktopHeader: boolean,
}

export interface ToggleDesktopHeaderDisplayActionType {
    type: "TOGGLE_DESKTOP_HEADER_DISPLAY",
    payload: {
        hideDesktopHeader: boolean
    }
}

export interface ToggleDesktopHeaderColorActionType {
    type: "TOGGLE_DESKTOP_HEADER_COLOR",
    payload: {
        coloredDesktopHeader: boolean
    }
}

export type ThemeActionType =
    ToggleDesktopHeaderDisplayActionType |
    ToggleDesktopHeaderColorActionType
