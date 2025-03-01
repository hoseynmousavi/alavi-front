import crypto from "crypto"
import {PurgeCSS} from "purgecss"
import purgeHtml from "purgecss-from-html"
import getMainCSS from "../helpers/getMainCSS"

function getCriticalCss({html}: { html: string }) {
    const {mainCSS, cssLink} = getMainCSS()
    if (mainCSS && cssLink && global.redisClient) {
        const cssMD5 = crypto.createHash("md5").update(mainCSS).digest("hex")
        const htmlMD5 = crypto.createHash("md5").update(html).digest("hex")
        const redisCssKey = `${htmlMD5}-${cssMD5}`
        return global.redisClient.get(redisCssKey)
            .then(css => {
                if (css) {
                    return getFinalHtml({html, cssLink, css})
                }
                else {
                    return computeCriticalCss({html, mainCSS, cssLink, redisCssKey})
                }
            })
            .catch(err => {
                console.error("redis get error: ", err)
                return computeCriticalCss({html, mainCSS, cssLink, redisCssKey})
            })
    }
    else {
        return new Promise(resolve => resolve(html))
    }
}

function computeCriticalCss({html, mainCSS, cssLink, redisCssKey}: { html: string, mainCSS: string, cssLink: string, redisCssKey: string }) {
    return new PurgeCSS().purge({
        content: [{raw: html, extension: "html"}],
        css: [{raw: mainCSS}],
        extractors: [{extractor: purgeHtml, extensions: ["html"]}],
        safelist: [/loading-wrapper/],
        keyframes: true,
        fontFace: true,
        variables: true,
    })
        .then(([{css}]) => {
            if (global.redisClient) {
                global.redisClient.set(
                    redisCssKey,
                    css,
                    {EX: 5184000}, // 60 days in seconds
                )
                    .catch(err => console.error("write to redis failed: ", err))
            }

            return getFinalHtml({html, cssLink, css})
        })
}

function getFinalHtml({html, cssLink, css}: { html: string, cssLink: string, css: string }) {
    return html
        .replace(`<link href="${cssLink}" rel="stylesheet">`, ``)
        .replace(`</head>`, `<style id="inline-css">${css}</style></head>`)
        .replace(`</body>`, `<link rel="preload" href="${cssLink}" as="style" onload="this.onload=null;this.rel='stylesheet';document.getElementById('inline-css').remove()"></body>`)
}

export default getCriticalCss