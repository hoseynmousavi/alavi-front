import {RefObject, useEffect} from "react"

function useResizeObserver({isRendering, ref, callback}: { isRendering: boolean, ref: RefObject<HTMLElement | null> | null, callback: (arg: ResizeObserverEntry[]) => void }) {
    useEffect(() => {
        if (ref?.current && isRendering) {
            const resizeObserver = new ResizeObserver(callback)
            resizeObserver.observe(ref.current)

            return () => resizeObserver.disconnect()
        }
        // eslint-disable-next-line
    }, [isRendering])
}

export default useResizeObserver