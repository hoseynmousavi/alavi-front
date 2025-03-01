import themeActions from "context/theme/themeActions"
import {themeContext} from "context/theme/themeProvider"
import {use} from "react"

function useTheme() {
    const {themeState: {hideDesktopHeader, coloredDesktopHeader}, themeDispatch} = use(themeContext)

    function toggleDesktopHeaderDisplay({hideDesktopHeader}: { hideDesktopHeader: boolean }) {
        themeActions.toggleDesktopHeaderDisplay({hideDesktopHeader, themeDispatch})
    }

    function toggleDesktopHeaderColor({coloredDesktopHeader}: { coloredDesktopHeader: boolean }) {
        themeActions.toggleDesktopHeaderColor({coloredDesktopHeader, themeDispatch})
    }

    return {
        hideDesktopHeader,
        toggleDesktopHeaderDisplay,
        coloredDesktopHeader,
        toggleDesktopHeaderColor,
    }
}

export default useTheme
