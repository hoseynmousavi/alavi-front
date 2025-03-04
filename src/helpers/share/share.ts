import getTextConstant from "helpers/general/getTextConstant"
import nothing from "helpers/general/nothing"
import toastManager from "helpers/theme/toastManager"

function share({title, text}: { title?: string, text?: string } = {}) {
    const link = window.location.href
    const {toastConstant} = getTextConstant()

    if (navigator.share) {
        const shareData = {
            ...title ? {title} : {},
            ...text ? {text} : {},
            url: link,
        }

        navigator.share(shareData)
            .catch(nothing)
    }
    else {
        navigator.clipboard.writeText(link)
            .then(() => {
                toastManager.addToast({type: "INFO", message: toastConstant.linkCopied})
            })
    }
}

export default share
