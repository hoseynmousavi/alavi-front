import ToastType, {CreatedToastType} from "types/ToastType"

function configToast() {
    // @ts-ignore
    window.addToast = function (props: ToastType) {
        const event = new CustomEvent("addToast", {detail: props})
        window.dispatchEvent(event)
    }
}

function addToast(props: ToastType) {
    // @ts-ignore
    if (!window.addToast) {
        configToast()
    }

    // @ts-ignore
    window.addToast(props)
}

function subscribeAddToast({callback}: { callback: ({detail}: { detail: CreatedToastType }) => void }) {
    // @ts-ignore
    window.addEventListener("addToast", callback, {passive: true})
    // @ts-ignore
    return () => window.removeEventListener("addToast", callback)
}

const toastManager = {
    addToast,
    subscribeAddToast,
}

export default toastManager
