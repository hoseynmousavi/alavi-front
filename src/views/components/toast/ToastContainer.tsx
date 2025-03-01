import useTheme from "context/theme/hooks/useTheme"
import onPageLoaded from "helpers/general/onPageLoaded"
import uuidGenerator from "helpers/general/uuidGenerator"
import toastManager from "helpers/theme/toastManager"
import {useEffect, useRef, useState} from "react"
import {CreatedToastType, HTMLDivElementWithClear} from "types/ToastType"
import Toast from "views/components/toast/Toast"

function ToastContainer() {
    const [pageLoaded, setPageLoaded] = useState(false)
    const [activeToasts, setActiveToasts] = useState<Array<CreatedToastType>>([])
    const itemsRef = useRef<{ [key: string]: HTMLDivElementWithClear }>({})
    const {hideDesktopHeader} = useTheme()

    useEffect(() => {
        onPageLoaded({callback: () => setPageLoaded(true)})
    }, [])

    useEffect(() => {
        function onToast({detail: props}: { detail: CreatedToastType }) {
            const {id = uuidGenerator(), message, description, type = "INFO", onClick, haveClose = true, Icon, removeOnChangeLocation = true, forceNew = false} = props
            setActiveToasts(activeToasts => {
                if (forceNew) {
                    const preSames = activeToasts.filter(item => item.message === message)
                    preSames.forEach(item => itemsRef.current[item.id].clearItem())
                    return [{id, message, description, type, onClick, haveClose, Icon, removeOnChangeLocation}, ...activeToasts]
                }
                else {
                    const isNotRedundant = activeToasts.every(item => item.message !== message)
                    if (isNotRedundant) {
                        return [{id, message, description, type, onClick, haveClose, Icon, removeOnChangeLocation}, ...activeToasts]
                    }
                    else {
                        return activeToasts
                    }
                }
            })
        }

        return toastManager.subscribeAddToast({callback: onToast})
    }, [])

    function clearItem(id: string) {
        setActiveToasts(activeToasts => activeToasts.filter(item => item.id !== id))
    }

    return (
        <div className={`toast-container ${hideDesktopHeader ? "hide-desktop-header" : ""}`}>
            {
                pageLoaded && activeToasts.map(item =>
                    <Toast key={item.id} itemsRef={itemsRef} item={item} clearMe={clearItem}/>,
                )
            }
        </div>
    )
}

export default ToastContainer
