import {serverReq} from "ContextWrapper"

function parseQueryString({query}: { query?: string | object } = {}) {
    let paramsObj: Record<string, string | Array<string>> = {}
    const search = query !== undefined ? query : typeof window !== "undefined" ? window.location.search : serverReq?.query ?? ""
    if (search) {
        // @ts-ignore
        const params = new URLSearchParams(search)
        for (let p of params) {
            const [key, value] = p
            if (!paramsObj[key]) {
                paramsObj[key] = value
            }
            else {
                if (Array.isArray(paramsObj[key])) {
                    paramsObj[key].push(value)
                }
                else {
                    paramsObj[key] = [paramsObj[key], p[1]]
                }
            }
        }
    }
    return paramsObj
}

export default parseQueryString