import PLACEHOLDER_IMAGES from "constant/images/PLACEHOLDER_IMAGES"
import {ImageResizeType, ImageSrcType} from "types/ImageType"

interface getResizedImageProps {
    src?: ImageSrcType,
    resize: ImageResizeType
}

function getResizedImage({src, resize: {placeholder = PLACEHOLDER_IMAGES.default, size = 300, isHeight = false, blur, aspectRatio}}: getResizedImageProps) {
    const multiple = 2
    let sizedImage = placeholder

    if (src) {
        if (!src?.endsWith?.(".svg") && size) {
            const key = isHeight ? "h" : "w"
            const multipleValue = Math.floor(size * multiple)
            const oppositeKey = !isHeight ? "h" : "w"
            const oppositeValue = aspectRatio ? Math.floor(oppositeKey === "h" ? multipleValue / aspectRatio : aspectRatio * multipleValue) : ""
            sizedImage = `${src}?x-img=v1/format,type_webp,lossless_false/resize,${key}_${multipleValue}${oppositeValue ? `,${oppositeKey}_${oppositeValue}` : ""}`
            if (blur) sizedImage += `/blur,sigma_${blur}`
        }
        else {
            sizedImage = src
        }
    }

    return {sizedImage, placeholder}
}

export default getResizedImage