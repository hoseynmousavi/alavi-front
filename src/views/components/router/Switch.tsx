import {serverReq} from "ContextWrapper"
import animate from "helpers/general/animate"
import nothing from "helpers/general/nothing"
import startViewTransition from "helpers/general/startViewTransition"
import uuidGenerator from "helpers/general/uuidGenerator"
import changeRouter from "helpers/router/changeRouter"
import checkIsPopState from "helpers/router/checkIsPopState"
import pathToRegex from "helpers/router/pathToRegex"
import getIsMobile from "helpers/theme/getIsMobile"
import useLayoutEffectJustChanges from "hooks/general/useLayoutEffectJustChanges"
import useSyncedState from "hooks/general/useSyncedState"
import {Children, memo, ReactElement, useEffect, useId, useRef} from "react"
import {SwitchChildProps, SwitchProps, SwitchStateType} from "types/RouterType"
import SwitchItem from "views/components/router/SwitchItem"

function Switch(props: SwitchProps) {
    const {children, className = "", isParentRendering = true, level, onActiveRouteChange, isTab} = props
    const initialId = useId()
    const arrayChildren = Children.toArray(children) as ReactElement<SwitchChildProps>[]
    const urls = arrayChildren.reduce((sum: Array<RegExp>, item) => [...sum, pathToRegex({path: item.props.path, exact: item.props.exact})], [])
    const [state, setState, stateRef] = useSyncedState<Array<SwitchStateType>>(getDefaultState)
    const contRef = useRef<HTMLDivElement>(null)
    const lastScrollPosition = useRef<number>(null)
    const activeAnimateRef = useRef<Animation | undefined>(null)

    function getDefaultState() {
        const defaultStateArr = []
        const defaultUrl = typeof window !== "undefined" ? window.location.pathname : serverReq.path
        const showChildIndex = urls.findIndex(url => new RegExp(url).test(defaultUrl))
        defaultStateArr.push({showChildIndex, location: defaultUrl, id: initialId})
        setTimeout(() => onActiveRouteChange?.({activeRouteIndex: showChildIndex}), 100)
        return defaultStateArr
    }

    useLayoutEffectJustChanges(() => {
        if (lastScrollPosition.current !== null) {
            window.scrollTo({top: lastScrollPosition.current, behavior: isTab ? "smooth" : "instant"})
        }
    }, [state])

    useEffect(() => {
        function changeRoute(e: PopStateEvent) {
            if ((e.target instanceof Window)) {
                const {type} = e
                const locationTemp = window.location.pathname
                const showChildIndexTemp = urls.findIndex(url => new RegExp(url).test(locationTemp))
                const {showChildIndex, location} = stateRef.current[stateRef.current.length - 1] || {}
                const {data} = e?.target?.history?.state ?? {}
                if ((type === "popstate" || data !== "for-history") && location !== locationTemp) {
                    const {isContainer} = arrayChildren?.[showChildIndexTemp]?.props ?? {}
                    if (!isContainer || showChildIndex !== showChildIndexTemp) {
                        setStateFunc({
                            e,
                            showChildIndex: showChildIndexTemp,
                            location: locationTemp,
                        })
                        return false
                    }
                    else {
                        setStateFunc({
                            e: {type: "update"},
                            showChildIndex: showChildIndexTemp,
                            location: locationTemp,
                        })
                        return !!isContainer
                    }
                }
            }
        }

        return changeRouter({level, callback: changeRoute})
        // eslint-disable-next-line
    }, [])

    function getDelta({showChildIndex}: { showChildIndex: number }) {
        let delta = 1
        if (stateRef.current.length) {
            for (let i = stateRef.current.length - 1; i--; i >= 0) {
                if (stateRef.current[i].showChildIndex === showChildIndex) {
                    delta = (stateRef.current.length - 1) - i
                    break
                }
            }
        }
        return delta
    }

    function setStateFunc({e, showChildIndex, location, id = uuidGenerator()}: { e: PopStateEvent | { type: "update" }, showChildIndex: number, location: string, id?: string }) {
        lastScrollPosition.current = 0
        const {type} = e || {}
        let animeType = type

        if (type === "update") {
            lastScrollPosition.current = null
            const lastItemRef = stateRef.current[stateRef.current.length - 1]
            stateRef.current = [...stateRef.current.slice(0, stateRef.current.length - 1), {...lastItemRef, showChildIndex, location}]
            changeState()
        }
        else {
            function pushState() {
                const lastItemRef = stateRef.current[stateRef.current.length - 1]
                lastItemRef.lastScrollY = window.scrollY
                stateRef.current = [...stateRef.current, {showChildIndex, location, id}]
            }

            if (type === "replacestate") {
                const lastItemRef = stateRef.current[stateRef.current.length - 1]
                stateRef.current = [...stateRef.current.slice(0, stateRef.current.length - 1), {...lastItemRef, showChildIndex, location, id}]
            }
            else if (type === "pushstate") {
                pushState()
            }
            else if (type === "popstate") {
                const isPopState = checkIsPopState(e)
                if (isPopState) {
                    const delta = getDelta({showChildIndex})
                    const lastItemRef = stateRef.current[stateRef.current.length - (delta + 1)]
                    stateRef.current = [
                        ...stateRef.current.slice(0, stateRef.current.length - (delta + 1)),
                        {...lastItemRef, showChildIndex, location, ...(!lastItemRef?.id ? {id} : {})},
                    ]
                    if (lastItemRef?.lastScrollY) lastScrollPosition.current = lastItemRef.lastScrollY
                }
                else {
                    animeType = "pushstate"
                    pushState()
                }
            }

            const isMobile = getIsMobile()
            startViewTransition({
                update: changeState,
                types: [isTab ? "router-tab" : `${animeType === "replacestate" ? "mobile-desktop" : isMobile ? "mobile" : "desktop"}-${animeType}`],
                addBodyClassName: isTab ? "tab-animating" : "",
            })
                .catch(() => {
                    if (contRef.current) {
                        animate({
                            element: contRef.current,
                            keyframes: [{opacity: 1}, {opacity: 0}],
                            options: {duration: 200, easing: "ease-in-out", fill: "forwards"},
                            beforeRunAnimate: () => activeAnimateRef.current?.cancel(),
                        })
                            .then(animation => {
                                activeAnimateRef.current = animation
                                activeAnimateRef.current
                                    .finished
                                    .then(() => {
                                        changeState()
                                        setTimeout(() => {
                                            if (contRef.current) {
                                                animate({
                                                    element: contRef.current,
                                                    keyframes: [{opacity: 0}, {opacity: 1}],
                                                    options: {duration: 150, easing: "ease-in-out", fill: "forwards"},
                                                })
                                                    .then(animation => {
                                                        activeAnimateRef.current = animation
                                                        activeAnimateRef.current
                                                            .finished
                                                            .catch(nothing)
                                                    })
                                            }
                                        }, 10)
                                    })
                                    .catch(nothing)
                            })
                            .catch(() => {
                                changeState()
                            })
                    }
                })
        }

        function changeState() {
            if (onActiveRouteChange) {
                onActiveRouteChange({activeRouteIndex: showChildIndex})
                setTimeout(() => setState([...stateRef.current]), 10)
            }
            else {
                setState([...stateRef.current])
            }
        }

    }

    const output = state.map((item, index) => {
        const {showChildIndex, location, id} = item || {}
        const element = arrayChildren[showChildIndex]
        if (element) {
            return <SwitchItem key={id}
                               element={element}
                               location={location}
                               index={index}
                               stateLength={state.length}
                               isParentRendering={isParentRendering}
                               isTab={isTab}
            />
        }
        else return null
    })

    return <div className={`${isTab ? "router-tab" : ""} ${className}`} ref={contRef}>{output}</div>
}

export default memo(Switch)
