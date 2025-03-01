import {ScreenStateType} from "context/screen/ScreenType"
import parseQueryString from "helpers/query-param/parseQueryString"
import getIsMobile from "helpers/theme/getIsMobile"
import getIsVertical from "helpers/theme/getIsVertical"
import useResize from "hooks/general/useResize"
import {createContext, Dispatch, ReactNode, SetStateAction, useEffect, useLayoutEffect, useState} from "react"

// @ts-ignore
export const screenContext = createContext<{ state: ScreenStateType, setState: Dispatch<SetStateAction<ScreenStateType>> }>(null)

function ScreenProvider({children}: { children: ReactNode }) {
    const [state, setState] = useState(setInitial)
    useResize({resizeCallback})

    useEffect(() => {
        document.addEventListener("visibilitychange", () =>
            setState(state => ({...state, isAppFocused: !document.hidden})),
        )
    }, [])

    function resizeCallback() {
        const isMobile = getIsMobile()
        const isVertical = getIsVertical()
        setState(state => {
                if (state.isMobile !== isMobile || state.isVertical !== isVertical) return {...state, isMobile, isVertical}
                else return state
            },
        )
    }

    function setInitial() {
        const isAppFocused = true
        const isAppView = parseQueryString().v === "m"
        const modalStackCount = 0
        const isMobile = getIsMobile()
        const isVertical = getIsVertical()

        return {
            isMobile,
            isVertical,
            isAppFocused,
            isAppView,
            modalStackCount,
        }
    }

    useLayoutEffect(() => {
        window.screenState = state
        window.screenSetState = setState
    }, [state, setState])

    return (
        <screenContext.Provider value={{state, setState}}>
            {children}
        </screenContext.Provider>
    )
}

export default ScreenProvider
