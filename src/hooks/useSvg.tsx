import {serverReq} from "ContextWrapper"
import {useEffect, useRef} from "react"

function useSvg(_svg: string, id: string) {
    const didMountRef = useRef(false)
    const isServer = typeof window === "undefined"

    const svg = `<svg id="${id}">${_svg}</svg>`

    if (!isServer) {
        if (!didMountRef.current) {
            if (!document.getElementById(id)) {
                if (!window.svgs) window.svgs = {}
                window.svgs[id] = 1
                let svgContainer = document.getElementById("svg-container")
                if (svgContainer) {
                    svgContainer.innerHTML += svg
                }
            }
            else {
                if (window.svgs?.[id]) {
                    window.svgs[id]++
                }
                else {
                    if (!window.svgs) window.svgs = {}
                    window.svgs[id] = 1
                }
            }
            didMountRef.current = true
        }
    }
    else {
        if (!serverReq?.svgs?.[id]) {
            if (!serverReq.svgs) serverReq.svgs = {}
            serverReq.svgs[id] = svg
        }
    }

    useEffect(() => {
        return () => {
            if (window.svgs?.[id]) {
                window.svgs[id]--
            }
            if (!window.svgs?.[id]) {
                const targetSvg = document.getElementById(id)
                if (targetSvg) targetSvg.remove()
            }
        }
        // eslint-disable-next-line
    }, [])

    return <use href={`#${id}`}/>
}

export default useSvg
