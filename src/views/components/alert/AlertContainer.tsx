import alertManager from "helpers/alert/alertManager"
import {lazy, Suspense, useEffect, useState} from "react"
import {AlertModalType} from "types/AlertModalType"

const AlertModal = lazy(() => import("views/components/alert/AlertModal"))

function AlertContainer() {
    const [isModalOpen, setIsModalOpen] = useState<Omit<AlertModalType, "close"> | null>(null)
    const {Icon, submitType, title, desc, submitText, cancelText, onSubmit, containerRef} = isModalOpen || {}

    useEffect(() => {
        function onAlertModal({detail: props}: { detail: Omit<AlertModalType, "close"> }) {
            setIsModalOpen(props)
        }

        return alertManager.subscribeOpenAlertModal({callback: onAlertModal})
        // eslint-disable-next-line
    }, [])

    function close() {
        setIsModalOpen(null)
    }

    if (isModalOpen) {
        return (
            <Suspense fallback={null}>
                <AlertModal close={close}
                            Icon={Icon}
                            submitType={submitType}
                            title={title as string}
                            desc={desc}
                            submitText={submitText as string}
                            cancelText={cancelText}
                            onSubmit={onSubmit as () => void}
                            containerRef={containerRef}
                />
            </Suspense>
        )
    }
}

export default AlertContainer
