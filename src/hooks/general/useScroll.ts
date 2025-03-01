import {useEffect} from "react"

interface useScrollProps {
    scrollCallback: () => void,
    onUnMount?: () => void,
    isRendering: boolean,
    dependencies?: Array<any>
    callOnMount?: boolean
}

function useScroll(props: useScrollProps) {
    const {scrollCallback, onUnMount, callOnMount, isRendering, dependencies} = props

    useEffect(() => {
        if (isRendering) {
            function onScroll() {
                scrollCallback()
            }

            if (callOnMount) {
                onScroll()
            }

            window.addEventListener("scroll", onScroll, {passive: true})
            return () => {
                window.removeEventListener("scroll", onScroll)
                onUnMount?.()
            }
        }
        // eslint-disable-next-line
    }, [...(dependencies || []), isRendering])
}

export default useScroll
