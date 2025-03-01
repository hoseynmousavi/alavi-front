import fs from "fs"
import path from "path"

let css = {
    mainCSS: "",
    cssLink: "",
}

fs.readFile(path.resolve("./build/asset-manifest.json"), "utf-8", (err, data) => {
    if (!err) {
        const cssLink = JSON.parse(data).files["main.css"]
        fs.readFile(path.resolve(`./build${cssLink}`), "utf-8", (err, data) => {
            if (!err) {
                css.mainCSS = data
                css.cssLink = cssLink
            }
        })
    }
})

function getMainCSS() {
    return css
}

export default getMainCSS