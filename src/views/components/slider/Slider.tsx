import {SliderItemType} from "context/home/HomeType"
import debounce from "helpers/general/debounce"
import useEffectJustChanges from "hooks/general/useEffectJustChanges"
import {useEffect, useRef, useState} from "react"
import SliderDotItem from "views/components/slider/SliderDotItem"
import SliderItem from "views/components/slider/SliderItem"

function Slider({items, isRendering}: { items: Array<SliderItemType>, isRendering: boolean }) {
    const [slideIndex, setSlideIndex] = useState(0)
    const [activeSlidePercent, setActiveSlidePercent] = useState(0)
    const contRef = useRef<HTMLDivElement>(null)
    const [showCarouselLoopItems, setShowCarouselLoopItems] = useState(false)
    const scrollTimerRef = useRef(null)

    useEffect(() => {
        setShowCarouselLoopItems(true)
    }, [])

    useEffectJustChanges(() => {
        contRef.current?.scrollTo({left: -1 * contRef.current.offsetWidth})
    }, [showCarouselLoopItems])

    function onScroll() {
        if (contRef.current) {
            if (contRef.current.scrollLeft === 0) {
                debounce({
                    func: () => contRef.current?.scrollTo?.({left: -1 * (contRef.current.scrollWidth - 2 * contRef.current.offsetWidth), behavior: "instant"}),
                    delay: 30,
                    timerRef: scrollTimerRef,
                })
            }
            else if (Math.ceil(Math.abs(contRef.current.scrollLeft)) === contRef.current.scrollWidth - contRef.current.offsetWidth) {
                debounce({
                    func: () => contRef.current?.scrollTo?.({left: -1 * contRef.current.offsetWidth, behavior: "instant"}),
                    delay: 30,
                    timerRef: scrollTimerRef,
                })
            }
            else {
                const preValue = slideIndex
                const newValue = Math.min(items.length - 1, Math.max(0, Math.round(Math.abs(contRef.current.scrollLeft) / contRef.current.offsetWidth) - 1))
                if (preValue !== newValue) {
                    setActiveSlidePercent(0)
                    setSlideIndex(newValue)
                }
            }
        }
    }

    function goNext() {
        contRef.current?.scrollTo({left: contRef.current.scrollLeft - contRef.current.offsetWidth, behavior: "smooth"})
    }

    return (
        <div className="slider">
            <div className="slider-content hide-scroll" ref={contRef} onScroll={onScroll}>
                {
                    showCarouselLoopItems &&
                    <SliderItem data={items[items.length - 1]}
                                goNext={goNext}
                                setActiveSlidePercent={setActiveSlidePercent}
                                isRendering={false}
                                isActive={false}
                    />
                }
                {
                    items.map((data, index) =>
                        <SliderItem key={index}
                                    data={data}
                                    goNext={goNext}
                                    setActiveSlidePercent={setActiveSlidePercent}
                                    isRendering={isRendering}
                                    isActive={index === slideIndex}
                        />,
                    )
                }
                {
                    showCarouselLoopItems &&
                    <SliderItem data={items[0]}
                                goNext={goNext}
                                setActiveSlidePercent={setActiveSlidePercent}
                                isRendering={false}
                                isActive={false}
                    />
                }
            </div>
            <div className="slider-dots hide-scroll">
                {
                    items.map((_, index) =>
                        <SliderDotItem key={index}
                                       isActive={index === slideIndex}
                                       activeSlidePercent={activeSlidePercent}
                        />,
                    )
                }
            </div>
        </div>
    )
}

export default Slider
