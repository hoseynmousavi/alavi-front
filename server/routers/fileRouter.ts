import {Express, NextFunction} from "express"
import fs from "fs"
import path from "path"
import {ExpressRequestType} from "types/ExpressRequestType"
import {ExpressResponseType} from "types/ExpressResponseType"
import setCacheHeader from "../helpers/setCacheHeader"

let files: Array<string> = []

if (process.env.NODE_ENV === "production") {
    fs.readdir(`./build`, (err, fls) => {
        if (err) console.error(err)
        else files = [...fls]
    })
}

function fileRouter(app: Express) {
    app.route("/static/*").get((req: ExpressRequestType, res: ExpressResponseType) => {
        setCacheHeader({res, cache: "public, max-age=2592000, immutable"})
        if (process.env.NODE_ENV === "production") {
            res.sendFile(path.resolve(`./build/${req.path}`))
        }
        else {
            res.redirect(301, `http://localhost:3000${req.path}`)
        }
    })

    app.route("/media/*").get((req: ExpressRequestType, res: ExpressResponseType) => {
        setCacheHeader({res, cache: "public, max-age=2592000, immutable"})
        if (process.env.NODE_ENV === "production") {
            res.sendFile(path.resolve(`./build/${req.path}`))
        }
        else {
            res.redirect(301, `http://localhost:3000${req.path}`)
        }
    })

    app.route("/:file")
        .get((req: ExpressRequestType, res: ExpressResponseType, next: NextFunction) => {
            const {file} = req.params
            if (process.env.NODE_ENV === "production") {
                if (files.indexOf(file) !== -1) {
                    const shouldNotCache = file === "service-worker.js" || file === "asset-manifest.json"
                    setCacheHeader({res, cache: shouldNotCache ? "max-age=0" : "public, max-age=604800, stale-while-revalidate=86400"})
                    res.sendFile(path.resolve(`./build/${file}`))
                }
                else {
                    next()
                }
            }
            else {
                const fileExtensionRegexp = new RegExp("[^/?]+\\.[^/]+$")
                if (file.match(fileExtensionRegexp)) {
                    setCacheHeader({res, cache: "public, max-age=60"})
                    res.redirect(301, `http://localhost:3000${req.path}`)
                }
                else {
                    next()
                }
            }
        })
}

export default fileRouter