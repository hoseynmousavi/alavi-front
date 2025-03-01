import {Request} from "express"
import {ImagePreloadType, ImageSrcType} from "types/ImageType"

export interface ExpressRequestType extends Request {
    svgs?: Record<string, string>
    metaTitle?: string,
    metaDescription?: string,
    metaImage?: string,
    metaStructuredData?: Object,
    metaPreloadImgs?: Array<{ src: ImageSrcType, preload: ImagePreloadType }>,
}