import {PageRouterType} from "types/RouterType"
import Slider from "views/components/slider/Slider"

function HomePage({route: {isRendering}}: PageRouterType) {
    const sliderItems = [
        {
            mobileSrc: "https://mehr-media.digikala.com/images/42c58bc243c04baabe75017800969963/d9adea46bee14d16aff72497cc82265d.JPG",
            desktopSrc: "https://mehr-media.digikala.com/images/9886acf361e946ee82dbfbc080af04ca/f1ffecca65204372a3f140543daa4143.jpg",
        },
        {
            mobileSrc: "https://mehr-media.digikala.com/images/78882a4e36a54b8b91c2d301d910e497/dd937d5f4348402da05afa8dff721583.jpg",
            desktopSrc: "https://mehr-media.digikala.com/images/39b918477a834a92956ae15bef5551e2/cbc511b2dea64dcc877b493f3761b413.jpg",
        },
    ]
    return (
        <div className="home-page">
            <Slider items={sliderItems} isRendering={isRendering}/>
        </div>
    )
}

export default HomePage
