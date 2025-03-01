import useScreen from "context/screen/hooks/useScreen"
import animate from "helpers/general/animate"
import nothing from "helpers/general/nothing"
import useEffectJustChanges from "hooks/general/useEffectJustChanges"
import CloseSquareSvg from "media/svg/CloseSquareSvg"
import CloseSvg from "media/svg/CloseSvg"
import InfoSquareSvg from "media/svg/InfoSquareSvg"
import TickSquareSvg from "media/svg/TickSquareSvg"
import WarningSquareSvg from "media/svg/WarningSquareSvg"
import {RefObject, useEffect, useRef} from "react"
import {ComponentAsPropsType} from "types/ComponentAsPropsType"
import {CreatedToastType, HTMLDivElementWithClear} from "types/ToastType"
import MaterialLink from "views/components/material/MaterialLink"

const icons = {
    "SUCCESS": TickSquareSvg,
    "INFO": InfoSquareSvg,
    "WARNING": WarningSquareSvg,
    "FAIL": CloseSquareSvg,
}

interface ToastProps {
    itemsRef: RefObject<{ [key: string]: HTMLDivElementWithClear }>,
    item: CreatedToastType,
    clearMe: (id: string) => void
}

function Toast(props: ToastProps) {
    const toastTimeMS = 5 * 1000
    const {itemsRef, item: {id, message, description, type, onClick, haveClose, Icon, removeOnChangeLocation}, clearMe} = props
    const {isAppFocused} = useScreen()
    const toastMessageRef = useRef<HTMLDivElement>(null)
    const clearTimer = useRef<ReturnType<typeof setTimeout>>(null)
    const animationRef = useRef<Animation>(null)
    const progressBarRef = useRef<HTMLDivElement>(null)
    const ShowIcon: ComponentAsPropsType = Icon ? Icon : icons[type]

    useEffect(() => {
        if (!!toastMessageRef.current && !!progressBarRef.current) {
            const toastRef = itemsRef.current[id].el
            toastRef.style.transition = "height var(--first-transition), margin-bottom var(--first-transition), padding var(--first-transition), opacity var(--first-transition) var(--first-transition-time)"
            toastRef.style.height = toastMessageRef.current.scrollHeight + 26 + "px"
            toastRef.style.marginBottom = "8px"
            toastRef.style.padding = "12px 12px"
            toastRef.style.opacity = "1"

            animate({element: progressBarRef.current, keyframes: [{width: "0%"}, {width: "100%"}], options: {duration: toastTimeMS, easing: "linear", fill: "forwards"}})
                .then(animation => {
                    animationRef.current = animation
                    if (!isAppFocused) animationRef.current.pause()
                    animationRef.current.finished
                        .then(clearItem)
                        .catch(nothing)
                })
                .catch(() => {
                    setTimeout(clearItem, toastTimeMS)
                })

            return () => {
                animationRef.current?.cancel()
            }
        }

        // eslint-disable-next-line
    }, [])

    useEffectJustChanges(() => {
        const animationReadyState = animationRef.current?.playState
        if (isAppFocused && animationReadyState === "paused") {
            animationRef.current?.play()
        }
        else if (!isAppFocused && animationReadyState === "running") {
            animationRef.current?.pause()
        }
    }, [isAppFocused])

    useEffect(() => {
        if (removeOnChangeLocation) {
            window.addEventListener("popstate", clearItem, {passive: true})
            window.addEventListener("pushstate", clearItem, {passive: true})
            window.addEventListener("replacestate", clearItem, {passive: true})

            return () => {
                window.removeEventListener("popstate", clearItem)
                window.removeEventListener("pushstate", clearItem)
                window.removeEventListener("replacestate", clearItem)
            }
        }
        // eslint-disable-next-line
    }, [])

    function clearItem() {
        if (!clearTimer.current && id) {
            const toastRef = itemsRef.current[id].el
            toastRef.style.transition = "height var(--first-transition) var(--first-transition-time), margin-bottom var(--first-transition) var(--first-transition-time), padding var(--first-transition) var(--first-transition-time), opacity var(--first-transition)"
            toastRef.style.height = "0"
            toastRef.style.marginBottom = "0"
            toastRef.style.padding = "0 12px"
            toastRef.style.opacity = "0"
            clearTimer.current = setTimeout(() => clearMe(id), 500)
        }
    }

    function onClickFunc() {
        onClick?.()
        clearItem()
    }

    function setRef(el: HTMLDivElement) {
        if (id) {
            if (el) {
                itemsRef.current[id] = {el, clearItem}
            }
            else {
                delete itemsRef.current[id]
            }
        }
    }

    return (
        <div className={`toast-item ${type}`} ref={setRef} style={{height: "0", opacity: "0", marginBottom: "0", padding: "0 12px"}} onTouchEnd={!onClick ? clearItem : undefined} onClick={onClick ? onClickFunc : clearItem}>
            <div className="toast-item-message" ref={toastMessageRef}>
                <ShowIcon className={`toast-item-message-icon ${type}`}/>
                <div className="toast-item-message-header">
                    {
                        message &&
                        <div className="toast-item-message-header-title">{message}</div>
                    }
                    {
                        description &&
                        <div className="toast-item-message-header-desc">{description}</div>
                    }
                </div>
            </div>
            {
                haveClose &&
                <MaterialLink className="toast-item-close" onClick={onClick ? clearItem : undefined}>
                    <CloseSvg className="toast-item-close-icon"/>
                </MaterialLink>
            }
            <div className="toast-item-progress" ref={progressBarRef}/>
        </div>
    )
}

export default Toast
