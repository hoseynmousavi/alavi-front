import getWindowScrollAndHeight from "helpers/general/getWindowScrollAndHeight"
import useScroll from "hooks/general/useScroll"
import {createContext, ReactNode, useRef, useState} from "react"

// @ts-ignore
export const scrollContext = createContext<{ isScrollingDown: boolean }>(null)

function ScrollProvider({children}: { children: ReactNode }) {
    const [isScrollingDown, setIsScrollingDown] = useState(false)
    const scrollYRef = useRef(0)
    const scrollDiff = useRef(0)
    useScroll({scrollCallback, isRendering: true})

    function scrollCallback() {
        const {scrollTop, clientHeight, scrollHeight} = getWindowScrollAndHeight()
        const scrollY = Math.max(0, Math.min(scrollTop, scrollHeight - clientHeight))
        if (scrollY > scrollYRef.current) {
            if (scrollDiff.current >= 0) scrollDiff.current += scrollY - scrollYRef.current
            else scrollDiff.current = 0
        }
        else {
            if (scrollDiff.current <= 0) scrollDiff.current -= scrollYRef.current - scrollY
            else scrollDiff.current = 0
        }

        const bodyScrollHeight = scrollHeight - +(getComputedStyle(document.body).padding.split(" ").pop() ?? "").replace("px", "")
        const activateEffect = bodyScrollHeight - clientHeight > 400
        const reachedStart = scrollY <= 0
        const reachedEnd = scrollY + clientHeight > bodyScrollHeight - 250
        const margin = 56

        if (scrollDiff.current <= -margin || !activateEffect || reachedEnd || reachedStart) {
            setIsScrollingDown(false)
        }
        else if (scrollDiff.current >= margin) {
            setIsScrollingDown(true)
        }
        scrollYRef.current = scrollY
    }

    return (
        <scrollContext.Provider value={{isScrollingDown}}>
            {children}
        </scrollContext.Provider>
    )
}

export default ScrollProvider
