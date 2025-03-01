import {serverReq} from "ContextWrapper"
import {useEffect} from "react"

interface HeadProps {
    isRendering: boolean,
    title: string,
    description?: string | null,
    image?: string,
    structuredData?: object,
    // canonical?: string
}

function Head(props: HeadProps) {
    const {isRendering, title, description, image, structuredData} = props

    useEffect(() => {
        if (isRendering) {
            const setTitle = title || process.env.REACT_APP_NAME || ""
            document.title = setTitle
            document.querySelector("meta[property='og:title']")?.setAttribute("content", setTitle)
            document.querySelector("meta[name='twitter:title']")?.setAttribute("content", setTitle)

            const setDescription = description || process.env.REACT_APP_DESCRIPTION || ""
            document.querySelector("meta[name='description']")?.setAttribute("content", setDescription)
            document.querySelector("meta[property='og:description']")?.setAttribute("content", setDescription)
            document.querySelector("meta[name='twitter:description']")?.setAttribute("content", setDescription)

            const setImage = image || process.env.REACT_APP_IMAGE || ""
            document.querySelector("meta[property='og:image']")?.setAttribute("content", setImage)
            document.querySelector("meta[name='twitter:image']")?.setAttribute("content", setImage)
        }
        // eslint-disable-next-line
    }, [isRendering, title, description, image])

    if (typeof window === "undefined" && isRendering) {
        serverReq.metaTitle = title
        if (description) {
            serverReq.metaDescription = description
        }
        if (image) {
            serverReq.metaImage = image
        }
        if (structuredData) {
            serverReq.metaStructuredData = structuredData
        }
        // serverReq.metaCanonical = canonical || (process.env.DOMAIN_URL + serverReq.path)
    }

    return undefined
}

export default Head