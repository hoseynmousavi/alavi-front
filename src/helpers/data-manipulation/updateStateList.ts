function updateStateList<T>(initial: Array<T> | undefined, array: Array<T>) {
    return [...(initial || []), ...array]
}

export default updateStateList
