import router from "helpers/router/router"
import {MouseEvent, useRef} from "react"
import {useMaterialType} from "types/MaterialLinkType"

function useMaterialLink(props: useMaterialType) {
    const {rippleColor, contRef, isDisable, disableRipple, onDisableClick, onClick, link} = props
    const {to, replace, data, target} = link || {}
    const tempRef = useRef<HTMLDivElement & HTMLAnchorElement & HTMLButtonElement>(null)
    const propRef = contRef || tempRef

    function appendRipple(e: MouseEvent) {
        if (propRef.current) {
            const {clientX, clientY} = e || {}
            const rect = propRef.current.getBoundingClientRect()
            let rippleContainer: null | HTMLSpanElement = document.createElement("span")
            rippleContainer.className = "ripple-container"
            const ripple = document.createElement("span")
            ripple.className = "ripple"
            if (rippleColor) ripple.style.backgroundColor = rippleColor
            ripple.style.height = ripple.style.width = 1.3 * Math.max(rect.width, rect.height) + "px"
            rippleContainer.appendChild(ripple)
            propRef.current.appendChild(rippleContainer)
            ripple.style.top = clientY - rect.top - ripple.offsetHeight / 2 + "px"
            ripple.style.left = clientX - rect.left - ripple.offsetWidth / 2 + "px"

            setTimeout(() => {
                try {
                    if (rippleContainer) {
                        propRef?.current?.removeChild?.(rippleContainer)
                        rippleContainer = null
                    }
                }
                catch (e) {
                }
            }, 600)
        }
    }

    function _onClick(e: MouseEvent) {
        if (isDisable) {
            onDisableClick?.(e)
        }
        else {
            if (!disableRipple) appendRipple(e)
            onClick?.(e)
        }

        if (to) {
            const isExternal =
                !!target ||
                (to.startsWith("http") && (new URL(to).host !== window.location.host)) ||
                (!to.startsWith("/") && !to.startsWith("http"))

            if (!isExternal) {
                e.preventDefault()
                if (onClick) {
                    setTimeout(route, 20)
                }
                else {
                    route()
                }
            }
        }
    }

    function route() {
        if (to) {
            if (replace) router.replaceState({url: to, data})
            else router.pushState({url: to, data})
        }
    }

    return {
        _onClick,
        propRef,
    }
}

export default useMaterialLink
