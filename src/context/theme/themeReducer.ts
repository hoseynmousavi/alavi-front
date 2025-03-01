import {ThemeActionType, ThemeStateType} from "context/theme/ThemeType"

const themeInitialState: ThemeStateType = {
    hideDesktopHeader: false,
    coloredDesktopHeader: false,
}

export function themeInit() {
    return themeInitialState
}

function themeReducer(state: ThemeStateType = themeInitialState, action: ThemeActionType) {
    switch (action.type) {
        case "TOGGLE_DESKTOP_HEADER_DISPLAY": {
            const {hideDesktopHeader} = action.payload
            return {
                ...state,
                hideDesktopHeader,
            }
        }
        case "TOGGLE_DESKTOP_HEADER_COLOR": {
            const {coloredDesktopHeader} = action.payload
            return {
                ...state,
                coloredDesktopHeader,
            }
        }
        default: {
            throw new Error()
        }
    }
}

export default themeReducer
