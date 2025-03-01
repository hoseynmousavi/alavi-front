import {cloneElement, memo, Suspense} from "react"
import {SwitchItemProps} from "types/RouterType"
import LoadingWrapper from "views/components/loading/LoadingWrapper"

function SwitchItem(props: SwitchItemProps) {
    const {index, stateLength, element, location, isParentRendering, isTab} = props
    const isRendering = index === stateLength - 1 && isParentRendering
    return (
        <div className="router-container" style={!isRendering ? {display: "none"} : {}}>
            <Suspense fallback={isTab ? null : <LoadingWrapper/>}>
                {cloneElement(element, {location, isRendering})}
            </Suspense>
        </div>
    )
}

export default memo(SwitchItem)
