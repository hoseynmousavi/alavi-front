interface SliderDotItemProps {
    activeSlidePercent: number,
    isActive: boolean,
}

function SliderDotItem({isActive, activeSlidePercent}: SliderDotItemProps) {
    return (
        <div className={`slider-dots-item ${isActive ? "active" : ""}`}>
            <div className={`slider-dots-item-inner ${isActive ? "active" : ""}`} style={{width: isActive ? `${activeSlidePercent}%` : "0"}}/>
        </div>
    )
}

export default SliderDotItem
