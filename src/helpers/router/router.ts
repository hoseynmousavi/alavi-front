import uuidGenerator from "helpers/general/uuidGenerator"
import closeModals from "helpers/theme/closeModals"
import {MouseEvent} from "react"

function pushState({url, data = ""}: { url: string, data?: string }) {
    if (data !== "for-history" && window.screenState?.modalStackCount) {
        closeModals()
        setTimeout(() => {
            const id = uuidGenerator()
            window.routerPushState({id, data}, "", url)
        }, 250)
    }
    else {
        const id = uuidGenerator()
        window.routerPushState({id, data}, "", url)
    }
}

function replaceState({url, data = ""}: { url: string, data?: string }) {
    const stack = getMemoryStack()
    if (stack[stack.length - 2]?.location === url) {
        back()
    }
    else {
        const id = uuidGenerator()
        window.routerReplaceState({id, data}, "", url)
    }
}

function back(props?: { fallback?: string, delta?: number } | MouseEvent) {
    const fallback = props && "fallback" in props && typeof props.fallback === "string" ? props.fallback : "/"
    const delta = props && "delta" in props && typeof props.delta === "number" ? props.delta : -1
    if (delta) {
        const stack = getSessionStack()
        if (stack.length >= 1 - delta) {
            window.history.go(delta)
        }
        else {
            replaceState({url: fallback})
        }
    }
}

function getMemoryStack() {
    return window.memoryHistoryStack || []
}

function getSessionStack() {
    return window.sessionHistoryStack || []
}

function comesFrom() {
    const stack = getSessionStack()
    return stack[stack.length - 2]?.location || ""
}

const router = {
    pushState,
    replaceState,
    back,
    getMemoryStack,
    getSessionStack,
    comesFrom,
}

export default router
