import themeReducer, {themeInit} from "context/theme/themeReducer"
import {ThemeActionType, ThemeStateType} from "context/theme/ThemeType"
import useThemeColorBar from "hooks/theme/useThemeColorBar"
import {createContext, Dispatch, ReactNode, useReducer} from "react"
import BodyScrollbar from "views/components/body-scrollbar/BodyScrollbar"

// @ts-ignore
export const themeContext = createContext<{ themeState: ThemeStateType, themeDispatch: Dispatch<ThemeActionType> }>(null)

function ThemeProvider({children}: { children: ReactNode }) {
    const [themeState, themeDispatch] = useReducer(themeReducer, themeInit())
    useThemeColorBar()

    return (
        <themeContext.Provider value={{themeState, themeDispatch}}>
            {children}
            <BodyScrollbar/>
        </themeContext.Provider>
    )
}

export default ThemeProvider
