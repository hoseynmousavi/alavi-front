import router from "helpers/router/router"

function closeModals() {
    if (window.screenState?.modalStackCount) {
        for (let i = 0; i < window.screenState.modalStackCount; i++) {
            router.back()
        }
    }
}

export default closeModals