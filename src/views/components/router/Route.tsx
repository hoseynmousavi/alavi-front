import useEffectJustChanges from "hooks/general/useEffectJustChanges"
import {memo, ReactElement, useState} from "react"
import {RouterType} from "types/RouterType"

interface RouteProps {
    location?: string,
    isRendering?: boolean,
    path: string,
    element: (route: RouterType) => ReactElement
    isContainer?: boolean
}

function Route(props: RouteProps) {
    const {location = "", isRendering = false, path, element} = props
    const [params, setParams] = useState(() => calcParams({location}))

    function calcParams({location}: { location: string }) {
        let tempParams: { [key: string]: string } = {}
        const pathSections = path.match(/\/(:?)((\w|\.|-)+)/g)
        const pathnameSections = location?.match(/\/(:?)((\w|%|\.|-)+)/g)
        if (pathSections && pathnameSections) {
            pathSections.forEach((item, index) => {
                if (item && pathnameSections[index]) tempParams[item.replace(/\/(:?)/g, "")] = pathnameSections[index].replace(/\//g, "")
            })
            return tempParams
        }
        else {
            return tempParams
        }
    }

    useEffectJustChanges(() => {
        setParams(calcParams({location}))
        // eslint-disable-next-line
    }, [location])

    return element({
        isRendering,
        params,
        location,
    })
}

export default memo(Route)
