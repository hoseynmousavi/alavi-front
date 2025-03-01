interface StartViewTransitionProps {
    update: () => void,
    types?: Array<string>,
    useUpdateForCatch?: boolean,
    addBodyClassName?: string
}

function startViewTransition(props: StartViewTransitionProps) {
    const {update, types, useUpdateForCatch, addBodyClassName} = props
    return new Promise((resolve, reject) => {
        if (document.startViewTransition) {
            if (addBodyClassName) {
                document.body.classList.add(addBodyClassName)
            }
            try {
                // @ts-ignore
                document.startViewTransition({update, types})
                    .finished
                    .then(() => removeBodyClass(addBodyClassName))
                resolve(null)
            }
            catch (e: any) {
                console.log(e?.message)
                removeBodyClass(addBodyClassName)
                rejectOrNot(reject, update, resolve, useUpdateForCatch)
            }
        }
        else {
            rejectOrNot(reject, update, resolve, useUpdateForCatch)
        }
    })
}

function rejectOrNot(reject: () => void, update: () => void, resolve: (props: any) => void, useUpdateForCatch?: boolean) {
    if (useUpdateForCatch) {
        update()
        resolve(null)
    }
    else {
        reject()
    }
}

function removeBodyClass(addBodyClassName?: string) {
    if (addBodyClassName) {
        document.body.classList.remove(addBodyClassName)
    }
}

export default startViewTransition
