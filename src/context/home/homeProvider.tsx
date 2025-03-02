import homeReducer, {homeInit} from "context/home/homeReducer"
import {HomeActionType, HomeState} from "context/home/HomeType"
import {createContext, Dispatch, ReactNode, useReducer} from "react"

// @ts-ignore
export const homeContext = createContext<{ homeState: HomeState, homeDispatch: Dispatch<HomeActionType> }>(null)

function HomeProvider({children, ...props}: { children: ReactNode }) {
    const [homeState, homeDispatch] = useReducer(homeReducer, homeInit(props))

    return (
        <homeContext.Provider value={{homeState, homeDispatch}}>
            {children}
        </homeContext.Provider>
    )
}

export default HomeProvider