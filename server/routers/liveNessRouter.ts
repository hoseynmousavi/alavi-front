import {Express} from "express"
import {ExpressRequestType} from "types/ExpressRequestType"
import {ExpressResponseType} from "types/ExpressResponseType"

function liveNessRouter(app: Express) {
    app.route("/is-live")
        .get((req: ExpressRequestType, res: ExpressResponseType) => {
            res.sendStatus(200)
        })
}

export default liveNessRouter