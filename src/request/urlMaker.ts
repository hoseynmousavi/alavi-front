import {SERVER_URL} from "constant/routing/SERVER_URL"
import createQueryString from "helpers/query-param/createQueryString"

function urlMaker({url, params}: { url: string, params?: Record<string, string | number | null | Array<string>> }) {
    return SERVER_URL + "/" + url + "/" + (params ? createQueryString({params}) : "")
}

export default urlMaker
