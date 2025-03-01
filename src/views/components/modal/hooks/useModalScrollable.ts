import useResizeObserver from "hooks/theme/useResizeObserver"
import {RefObject} from "react"

function useModalScrollable({ref}: { ref: RefObject<HTMLElement | null> }) {
    useResizeObserver({ref, isRendering: true, callback})

    function callback() {
        if (ref.current) {
            const isScrollable = ref.current.scrollHeight > ref.current.clientHeight
            if (isScrollable) {
                ref.current.style.touchAction = "auto"
            }
            else {
                ref.current.style.removeProperty("touch-action")
            }
        }
    }
}

export default useModalScrollable