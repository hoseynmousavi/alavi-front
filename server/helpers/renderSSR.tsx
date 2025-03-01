import App from "App"
import SCREEN_CONSTANT from "constant/general/SCREEN_CONSTANT"
import ContextWrapper, {serverReq} from "ContextWrapper"
import ReactDOMServer from "react-dom/server"
import {ExpressRequestType} from "types/ExpressRequestType"
import {ExpressResponseType} from "types/ExpressResponseType"
import {ImagePreloadType, ImageSrcType} from "types/ImageType"
import getCategories from "../helpers/getCategories"
import getCriticalCss from "../helpers/getCriticalCss"
import getMainHtml from "../helpers/getMainHtml"
import HtmlWritable from "../helpers/HtmlWritable"
import sendCsrHtml from "../helpers/sendCsrHtml"
import setCacheHeader from "../helpers/setCacheHeader"

interface renderSSRProps {
    req: ExpressRequestType,
    res: ExpressResponseType,
    data?: {

    },
    status: number
}

function renderSSR({req, res, data = {}, status}: renderSSRProps) {
    getCategories()
        .then(category => {
            const htmlWritable = new HtmlWritable()
            const {pipe} = ReactDOMServer.renderToPipeableStream(
                <ContextWrapper req={req} {...data} category={category}>
                    <App/>
                </ContextWrapper>,
                {
                    onAllReady: () => pipe(htmlWritable),
                    onError: err => {
                        console.error("error on stream in renderToPipeableStream", err)
                        sendCsrHtml({req, res, status: 500})
                    },
                },
            )
            htmlWritable.on("finish", () => {
                let html = getMainHtml()
                let renderedBody = htmlWritable.getHtml()

                if (serverReq.metaTitle) {
                    html = html.replaceAll(process.env.REACT_APP_NAME || "", serverReq.metaTitle)
                }
                if (serverReq.metaDescription) {
                    html = html.replaceAll(process.env.REACT_APP_DESCRIPTION || "", serverReq.metaDescription)
                }
                if (serverReq.metaImage) {
                    html = html.replaceAll(process.env.REACT_APP_IMAGE || "", serverReq.metaImage)
                }
                if (serverReq.metaStructuredData) {
                    html = html.replace(`</head>`, `<script type="application/ld+json">${decodeURIComponent(JSON.stringify(serverReq.metaStructuredData))}</script></head>`)
                }
                // if (serverReq.metaCanonical) {
                //     html = html.replace(`</head>`, `<link rel="canonical" href="${decodeURIComponent(serverReq.metaCanonical)}"/></head>`)
                // }
                if (serverReq.metaPreloadImgs) {
                    serverReq.metaPreloadImgs.forEach(({src, preload}: { src: ImageSrcType, preload: ImagePreloadType }) => {
                        if (src) {
                            html = html.replace(`</head>`, `<link rel="preload" as="image" href="${src}" crossorigin="anonymous" ${preload === "mobile" ? `media="${SCREEN_CONSTANT.mobileMedia}"` : preload === "desktop" ? `media="${SCREEN_CONSTANT.desktopMedia}"` : ""}/></head>`)
                        }
                    })
                }

                html = html
                    .replace(`<div id="svg-container" style="display:none"></div>`, `<div id="svg-container" style="display: none">${Object.values(req.svgs || []).join("")}</div>`)
                    .replace(`<div id="root"></div>`, `<div id="root">${renderedBody}</div><script id="server-data">window.serverData = ${JSON.stringify({...data, category})}</script><script id="server-ssr"></script>`)

                getCriticalCss({html})
                    .then(finalHtml => {
                        if (!res.sent) {
                            setCacheHeader({res, cache: "max-age=0"})
                            res.status(status).send(finalHtml)
                            res.sent = true
                        }
                    })
            })
        })
        .catch(() => {
            sendCsrHtml({req, res, status: 200})
        })
}

export default renderSSR
