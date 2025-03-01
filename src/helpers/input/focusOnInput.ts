import {RefObject} from "react"

function focusOnInput({ref}: { ref: RefObject<null | HTMLInputElement> }) {
    setTimeout(() => {
        const valueLength = ref?.current?.value?.length ?? 0
        try {
            ref?.current?.setSelectionRange?.(valueLength, valueLength)
            ref?.current?.focus?.()
        }
        catch (e) {
            ref?.current?.focus?.()
        }
    }, 10)
}

export default focusOnInput