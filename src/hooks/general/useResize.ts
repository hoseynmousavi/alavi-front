import {useEffect} from "react"

interface useResizeProps {
    resizeCallback: EventListener,
    onUnMount?: () => void,
    dependencies?: Array<any>
}

function useResize(props: useResizeProps) {
    const {resizeCallback, onUnMount, dependencies} = props
    useEffect(() => {
        window.addEventListener("resize", resizeCallback, {passive: true})
        return () => {
            window.removeEventListener("resize", resizeCallback)
            onUnMount?.()
        }
        // eslint-disable-next-line
    }, dependencies || [])
}

export default useResize
