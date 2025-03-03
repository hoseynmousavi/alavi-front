import checkParentHasClass from "helpers/general/checkParentHasClass"
import checkParentIsScrolling from "helpers/general/checkParentIsScrolling"
import stopPropagation from "helpers/general/stopPropagation"
import router from "helpers/router/router"
import {MouseEvent, TouchEvent, useEffect, useImperativeHandle, useRef} from "react"
import {createPortal} from "react-dom"
import {MobileModalType} from "types/ModalType"
import useModalScrollable from "views/components/modal/hooks/useModalScrollable"

export const MODAL_DONT_GESTURE = "dont-gesture"

function MobileModal(props: MobileModalType) {
    const {children, mobileRootClassName, className, backClassName, close, ref, disableClose, root = document.body} = props
    const startedGesturing = useRef(false)
    const isGesturing = useRef(false)
    const posX = useRef(0)
    const posY = useRef(0)
    const translateY = useRef<number>(0)
    const deltaX = useRef(0)
    const deltaY = useRef(0)
    const sidebarRef = useRef<HTMLDivElement>(null)
    const sidebarContentRef = useRef<HTMLDivElement>(null)
    const modalBackRef = useRef<HTMLDivElement>(null)
    const isHiding = useRef(false)
    useModalScrollable({ref: sidebarContentRef})

    useImperativeHandle(ref, () => ({
        mobileClose: hideSidebar,
        // eslint-disable-next-line
    }), [])

    useEffect(() => {
        const {isFull} = getHeightAndFull()
        if (isFull && sidebarRef.current) {
            sidebarRef.current.style.borderRadius = "0 0 0 0"
        }
        // eslint-disable-next-line
    }, [])

    function getHeightAndFull() {
        const height = sidebarRef?.current?.clientHeight ?? 0
        const isFull = height === window.innerHeight
        return {height, isFull}
    }

    function onTouchStart(e: TouchEvent | MouseEvent) {
        stopPropagation(e)
        if (e.target instanceof HTMLElement && !checkParentHasClass(e.target, MODAL_DONT_GESTURE) && !isHiding.current && !checkParentIsScrolling(e.target)) {
            posX.current = "touches" in e ? e.touches?.[0].clientX : e.clientX
            posY.current = "touches" in e ? e.touches?.[0].clientY : e.clientY
            startedGesturing.current = true
        }
    }

    function onTouchMove(e: TouchEvent | MouseEvent) {
        deltaX.current = posX.current - ("touches" in e ? e.touches?.[0].clientX : e.clientX)

        if (isGesturing.current || (startedGesturing.current && deltaX.current < 8 && deltaX.current > -8)) {
            if (e.target instanceof HTMLElement && !checkParentIsScrolling(e.target) && !!sidebarRef?.current && !!sidebarContentRef.current && !!modalBackRef.current) {
                stopPropagation(e)
                isGesturing.current = true
                deltaY.current = posY.current - ("touches" in e ? e.touches?.[0].clientY : e.clientY)
                if (deltaY.current < 0) sidebarContentRef.current.style.overflowY = "hidden"
                const {height, isFull} = getHeightAndFull()
                posY.current = "touches" in e ? e.touches?.[0].clientY : e.clientY
                translateY.current = translateY.current - deltaY.current >= 0 ? translateY.current - deltaY.current <= height ? translateY.current - deltaY.current : height : 0
                window.requestAnimationFrame(() => !!sidebarRef.current && (sidebarRef.current.style.transform = `translate3d(0, ${translateY.current}px, 0)`))
                if (isFull) {
                    sidebarRef.current.style.transition = "border-radius linear 0.2s"
                    window.requestAnimationFrame(() => {
                        if (sidebarRef.current) {
                            if (translateY.current === 0) sidebarRef.current.style.borderRadius = "0 0 0 0"
                            else sidebarRef.current.style.borderRadius = "var(--third-radius) var(--third-radius) 0 0"
                        }
                    })
                }
                modalBackRef.current.style.opacity = `${1 - translateY.current / height}`
            }
            else {
                isGesturing.current = false
            }
        }

        startedGesturing.current = false
    }

    function onTouchEnd() {
        if (isGesturing.current && !!sidebarContentRef.current) {
            sidebarContentRef.current.style.removeProperty("overflow-y")
            const {height} = getHeightAndFull()
            if (deltaY.current > 3) showSidebar()
            else if (deltaY.current < -3) router.back()
            else if (translateY.current > height / 2) router.back()
            else showSidebar()
            isGesturing.current = false
        }
    }

    function showSidebar() {
        if (translateY.current !== 0 && !!sidebarRef?.current && !!modalBackRef.current) {
            const {isFull} = getHeightAndFull()
            translateY.current = 0
            sidebarRef.current.style.transition = "transform linear 0.2s, border-radius linear 0.2s"
            window.requestAnimationFrame(() => !!sidebarRef.current && (sidebarRef.current.style.transform = `translate3d(0, ${translateY.current}px, 0)`))
            if (isFull) window.requestAnimationFrame(() => !!sidebarRef.current && (sidebarRef.current.style.borderRadius = "0 0 0 0"))
            modalBackRef.current.style.transition = "opacity linear 0.2s"
            modalBackRef.current.style.opacity = "1"
            setTimeout(() => {
                sidebarRef.current?.style?.removeProperty?.("transform")
                sidebarRef.current?.style?.removeProperty?.("transition")
                modalBackRef.current?.style?.removeProperty?.("transition")
            }, 250)
        }
    }

    function hideSidebar() {
        const {height, isFull} = getHeightAndFull()
        if (translateY.current !== height && !!sidebarRef?.current) {
            isHiding.current = true
            translateY.current = height
            if (sidebarRef?.current) {
                sidebarRef.current.style.transition = "transform linear 0.2s, border-radius linear 0.2s"
                window.requestAnimationFrame(() => !!sidebarRef.current && (sidebarRef.current.style.transform = `translate3d(0, ${translateY.current}px, 0)`))
                if (isFull) window.requestAnimationFrame(() => !!sidebarRef.current && (sidebarRef.current.style.borderRadius = "var(--third-radius) var(--third-radius) 0 0"))
            }
            if (modalBackRef?.current) {
                modalBackRef.current.style.transition = "opacity linear 0.2s"
                modalBackRef.current.style.opacity = `0`
            }
            setTimeout(close, 250)
        }
    }

    function goBackIfNotHiding(e: MouseEvent) {
        e.stopPropagation()
        if (disableClose) {

        }
        else if (!isHiding.current) {
            isHiding.current = true
            router.back()
        }
    }

    return (
        createPortal(
            <>
                <div className={`modal-background ${backClassName}`} ref={modalBackRef} onClick={goBackIfNotHiding}/>
                <div className={`mobile-modal ${mobileRootClassName}`} ref={sidebarRef} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onClick={stopPropagation}>
                    <div className="mobile-modal-line">
                        <div className="mobile-modal-line-line"/>
                    </div>
                    <div className={`mobile-modal-content ${className}`} ref={sidebarContentRef}>
                        {children}
                    </div>
                </div>
            </>,
            root as HTMLElement,
        )
    )
}

export default MobileModal
