function arrayToKeyObject<T, K extends keyof T>(array: Array<T>, key: K) {
    return array.reduce((sum, curr) => ({...sum, [curr[key] as string]: curr}), {})
}

export default arrayToKeyObject
