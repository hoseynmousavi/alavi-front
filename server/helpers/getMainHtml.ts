import fs from "fs"
import path from "path"

let indexHtml = ""

const htmlPath = process.env.NODE_ENV === "production" ? "./build/index.html" : "./public/index.html"

fs.readFile(path.resolve(htmlPath), "utf-8", (err, data) => {
    if (err) {
        throw new Error("error reading index.html")
    }
    else {
        indexHtml = data

        if (process.env.NODE_ENV !== "production") {
            indexHtml = indexHtml.replaceAll("%PUBLIC_URL%", process.env.PUBLIC_URL || "")
            indexHtml = indexHtml.replace(`</head>`, `<script defer src="http://localhost:3000/static/js/bundle.js"></script></head>`)
        }
    }
})

function getMainHtml() {
    return indexHtml
}

export default getMainHtml