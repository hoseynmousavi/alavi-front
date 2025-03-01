import {serverReq} from "ContextWrapper"
import {createContext, ReactNode, useEffect, useState} from "react"

// @ts-ignore
export const locationContext = createContext<{ location: string }>(null)

function LocationProvider({children}: { children: ReactNode }) {
    const [location, setLocation] = useState(typeof window !== "undefined" ? window.location.pathname : serverReq.path)

    useEffect(() => {
        function changeRoute() {
            const location = window.location.pathname
            setLocation(location)
        }

        window.addEventListener("popstate", changeRoute, {passive: true})
        window.addEventListener("pushstate", changeRoute, {passive: true})
        window.addEventListener("replacestate", changeRoute, {passive: true})
    }, [])

    return (
        <locationContext.Provider value={{location}}>
            {children}
        </locationContext.Provider>
    )
}

export default LocationProvider
