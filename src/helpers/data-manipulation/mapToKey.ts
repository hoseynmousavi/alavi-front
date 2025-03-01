function mapToKey<T, K extends keyof T>(array: Array<T>, key: K) {
    return array.map(el => el[key])
}

export default mapToKey
