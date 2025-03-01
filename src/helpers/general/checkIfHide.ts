import URLS, {UrlType} from "constant/routing/URLS"
import pathToRegex from "helpers/router/pathToRegex"

interface CheckIfHideProps {
    location: string,
    hidePages?: Array<string | UrlType>,
    showPages?: Array<string>
}

function checkIfHide(props: CheckIfHideProps) {
    const {location, hidePages, showPages} = props
    const urlsThatShouldCheck: { [key: string]: string | Function | UrlType } = {...URLS.mainContainer.routes} // Order is important
    const urlsKeys = Object.keys(urlsThatShouldCheck)
    for (let i = 0; i < urlsKeys.length; i++) {
        const key = urlsKeys[i]
        const url = urlsThatShouldCheck[key]
        const path = typeof url === "object" ? url.entry : typeof url === "string" ? url : ""
        const shouldHide = hidePages ? hidePages.indexOf(path) !== -1 : showPages?.indexOf(path) === -1
        if (typeof url !== "function") {
            const matched = pathToRegex({path}).test(location)
            if (matched) return shouldHide
        }
    }
}

export default checkIfHide
