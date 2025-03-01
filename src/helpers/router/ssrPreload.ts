import {serverReq} from "ContextWrapper"
import {ImagePreloadType} from "types/ImageType"

interface SSRPreloadProps {
    sizedImage?: string,
    desktopSizedImage?: string,
    preload?: ImagePreloadType
}

function SsrPreload({sizedImage, desktopSizedImage, preload}: SSRPreloadProps) {
    if (typeof window === "undefined" && preload && (sizedImage || desktopSizedImage)) {
        if (!serverReq.metaPreloadImgs) serverReq.metaPreloadImgs = []

        switch (preload) {
            case "mobile":
                if (sizedImage) serverReq.metaPreloadImgs.push({src: sizedImage, preload})
                break
            case "desktop":
                serverReq.metaPreloadImgs.push({src: desktopSizedImage || sizedImage, preload})
                break
            default: {
                if (desktopSizedImage && sizedImage) {
                    serverReq.metaPreloadImgs.push({src: desktopSizedImage, preload: "desktop"})
                    serverReq.metaPreloadImgs.push({src: sizedImage, preload: "mobile"})
                }
                else if (desktopSizedImage) {
                    serverReq.metaPreloadImgs.push({src: desktopSizedImage, preload: "all"})
                }
                else if (sizedImage) {
                    serverReq.metaPreloadImgs.push({src: sizedImage, preload: "all"})
                }
            }
        }
    }
}

export default SsrPreload
