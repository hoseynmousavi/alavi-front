import {Dispatch, memo, SetStateAction, useEffect, useRef} from "react"
import Image from "views/components/image/Image"
import MaterialLink from "views/components/material/MaterialLink"

interface SliderItemProps {
    data: { desktop_image: string, mobile_image: string },
    goNext: () => void,
    setActiveSlidePercent: Dispatch<SetStateAction<number>>,
    isRendering: boolean,
    isActive: boolean
}

function SliderItem({data: {desktop_image, mobile_image}, goNext, setActiveSlidePercent, isRendering, isActive}: SliderItemProps) {
    const verticalPoster = mobile_image
    const horizontalPoster = desktop_image
    const timerRef = useRef<ReturnType<typeof setTimeout>>(null)
    const imgTimerProgressRef = useRef(0)
    const imgTimerTotalRef = useRef(5)

    useEffect(() => {
        if (isRendering && isActive) {

            imgTimerProgressRef.current = 0

            function doJob() {
                imgTimerProgressRef.current += 1
                if (imgTimerProgressRef.current === 6) {
                    goNext()
                }
                else {
                    setActiveSlidePercent(Math.round(imgTimerProgressRef.current / imgTimerTotalRef.current * 100))
                    timerRef.current = setTimeout(doJob, 1000)
                }
            }

            doJob()

            return () => {
                if (timerRef.current) clearTimeout(timerRef.current)
            }
        }
        // eslint-disable-next-line
    }, [isActive, isRendering])

    return (
        <MaterialLink className={`slider-content-item ${isActive ? "active" : ""}`}>
            <Image className="slider-content-item-img"
                   src={verticalPoster || horizontalPoster}
                   resize={{size: 300}}
                   desktopSrc={horizontalPoster || verticalPoster}
                   desktopResize={{size: 800}}
                   alt={""}
                   loading={isActive ? "eager" : "lazy"}
                   preload={isActive ? "all" : undefined}
            />
        </MaterialLink>
    )
}

export default memo(SliderItem)
