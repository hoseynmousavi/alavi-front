import useGetSlider from "context/home/useGetSlider"
import useGetProjectsList from "context/project/hooks/useGetProjectsList"
import {PageRouterType} from "types/RouterType"
import Footer from "views/components/footer/Footer"
import HomeCategories from "views/components/home-categories/HomeCategories"
import HomeProjects from "views/components/home-projects/HomeProjects"
import LoadingWrapper from "views/components/loading/LoadingWrapper"
import Slider from "views/components/slider/Slider"

function HomePage({route: {isRendering}}: PageRouterType) {
    const {data} = useGetSlider({isRendering})
    const {data: projects} = useGetProjectsList()
    if (data?.length && projects?.length) {
        return (
            <>
                <div className="home-page">
                    <Slider items={data} isRendering={isRendering}/>
                    <HomeProjects projects={projects}/>
                    <HomeCategories/>
                </div>
                <Footer/>
            </>
        )
    }
    else {
        return <LoadingWrapper/>
    }
}

export default HomePage
