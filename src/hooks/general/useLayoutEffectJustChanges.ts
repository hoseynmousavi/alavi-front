import {useLayoutEffect, useRef} from "react"

function useLayoutEffectJustChanges(callback: () => void, dependencies?: Array<any>) {
    const ref = useRef(false)

    useLayoutEffect(() => {
        if (!ref.current) {
            ref.current = true
        }
        else {
            return callback()
        }
        // eslint-disable-next-line
    }, dependencies || [])
}

export default useLayoutEffectJustChanges
