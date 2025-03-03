import useSvg from "hooks/general/useSvg"
import {RefObject} from "react"

function LineArrowSvg({className, iconRef}: { className?: string, iconRef?: RefObject<SVGSVGElement | null> }) {
    return (
        <svg className={className} viewBox="0 0 24 24" ref={iconRef}>
            {
                useSvg(
                    `<path fill-rule="evenodd" clip-rule="evenodd" d="M11.212 4.563a.75.75 0 0 1 0 1.06l-5.634 5.635h14.685a.75.75 0 0 1 0 1.5H5.578l5.634 5.633a.75.75 0 1 1-1.06 1.06l-6.915-6.913a.75.75 0 0 1 0-1.061l6.914-6.914a.75.75 0 0 1 1.06 0z"/>`,
                    "LineArrowSvg",
                )
            }
        </svg>
    )
}

export default LineArrowSvg
