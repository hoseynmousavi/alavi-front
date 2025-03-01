import {NextFunction} from "express"
import {ExpressRequestType} from "types/ExpressRequestType"
import {ExpressResponseType} from "types/ExpressResponseType"
import setCacheHeader from "../helpers/setCacheHeader"

function redirectTrailingSlash() {
    return (req: ExpressRequestType, res: ExpressResponseType, next: NextFunction) => {
        const {originalUrl} = req
        if (originalUrl.length > 1 && originalUrl.endsWith("/")) {
            const domain = process.env.DOMAIN_URL
            setCacheHeader({res, cache: "max-age=1800"})
            res.redirect(301, domain + originalUrl.slice(0, originalUrl.length - 1))
        }
        else {
            next()
        }
    }
}

export default redirectTrailingSlash