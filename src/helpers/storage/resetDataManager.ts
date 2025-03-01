function configResetData() {
    window.resetData = function (props) {
        const event = new CustomEvent("resetData", {detail: props})
        window.dispatchEvent(event)
    }
}

function resetData({isAfterLogin}: { isAfterLogin: boolean }) {
    if (!window.resetData) {
        configResetData()
    }

    window.resetData?.({isAfterLogin})

    if (!isAfterLogin) {
        clearTimeout(window.refreshTokenTimer)
    }
}

function setResetDataListener({callBack}: { callBack: (props: { detail: { isAfterLogin: boolean } }) => void }) {
    // @ts-ignore
    window.addEventListener("resetData", callBack, {passive: true})
}

const resetDataManager = {
    resetData,
    setResetDataListener,
}

export default resetDataManager
