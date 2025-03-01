import {ToggleDesktopHeaderColorActionType, ToggleDesktopHeaderDisplayActionType} from "context/theme/ThemeType"
import {Dispatch} from "react"

function toggleDesktopHeaderDisplay({hideDesktopHeader, themeDispatch}: { hideDesktopHeader: boolean, themeDispatch: Dispatch<ToggleDesktopHeaderDisplayActionType> }) {
    themeDispatch({
        type: "TOGGLE_DESKTOP_HEADER_DISPLAY",
        payload: {hideDesktopHeader},
    })
}

function toggleDesktopHeaderColor({coloredDesktopHeader, themeDispatch}: { coloredDesktopHeader: boolean, themeDispatch: Dispatch<ToggleDesktopHeaderColorActionType> }) {
    themeDispatch({
        type: "TOGGLE_DESKTOP_HEADER_COLOR",
        payload: {coloredDesktopHeader},
    })
}

const themeActions = {
    toggleDesktopHeaderDisplay,
    toggleDesktopHeaderColor,
}

export default themeActions
