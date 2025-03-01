import {KeyboardEvent, KeyboardEventHandler} from "react"

interface onInputKeyDownProps {
    disableSubmit?: boolean,
    onSubmit?: () => void,
    onSubmitDisable?: () => void,
    checkError?: (e: any) => void,
}

function onInputKeyDown(props: onInputKeyDownProps): ReturnType<(e: KeyboardEvent) => KeyboardEventHandler<HTMLInputElement>> {
    const {disableSubmit, onSubmit, onSubmitDisable, checkError} = props
    return function (e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            if (!disableSubmit) {
                onSubmit?.()
            }
            else {
                checkError?.(e)
                onSubmitDisable?.()
            }
        }
    }
}

export default onInputKeyDown
