import {ExpressRequestType} from "types/ExpressRequestType"
import {ExpressResponseType} from "types/ExpressResponseType"
import getMainHtml from "../helpers/getMainHtml"
import setCacheHeader from "../helpers/setCacheHeader"

interface sendCsrHtmlProps {
    req: ExpressRequestType,
    res: ExpressResponseType,
    status: number
}

function sendCsrHtml({req, res, status}: sendCsrHtmlProps) {
    try {
        if (!res.sent) {
            setCacheHeader({res, cache: "max-age=0"})
            const html = getMainHtml()
            res.status(status).send(html)
            res.sent = true
        }
    }
    catch (err) {
        console.error("sending response err:", err)
    }
}

export default sendCsrHtml