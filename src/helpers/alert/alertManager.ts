import {AlertModalType} from "types/AlertModalType"

function configAlertManager() {
    window.openAlertModal = function (props: Omit<AlertModalType, "close">) {
        const event = new CustomEvent("openAlertModal", {detail: props})
        window.dispatchEvent(event)
    }
}

function openAlertModal(props: Omit<AlertModalType, "close">) {
    if (!window.openAlertModal) {
        configAlertManager()
    }

    window.openAlertModal(props)
}

function subscribeOpenAlertModal({callback}: { callback: ({detail}: { detail: Omit<AlertModalType, "close"> }) => void }) {
    // @ts-ignore
    window.addEventListener("openAlertModal", callback, {passive: true})
    // @ts-ignore
    return () => window.removeEventListener("openAlertModal", callback)
}

const alertManager = {
    openAlertModal,
    subscribeOpenAlertModal,
}

export default alertManager
