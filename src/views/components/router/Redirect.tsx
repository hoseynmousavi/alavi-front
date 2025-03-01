import router from "helpers/router/router"
import {useEffect, useRef} from "react"

interface RedirectProps {
    to: string,
    push?: boolean,
    isRendering: boolean,
}

function Redirect({to, push, isRendering}: RedirectProps) {
    const timer = useRef<ReturnType<typeof setTimeout>>(null)

    useEffect(() => {
        if (isRendering) {
            if (timer.current) clearTimeout(timer.current)
            timer.current = setTimeout(() => {
                if (push) {
                    router.pushState({url: to})
                }
                else {
                    router.replaceState({url: to})
                }
            }, 100)
        }
        // eslint-disable-next-line
    }, [isRendering])

    return null
}

export default Redirect
