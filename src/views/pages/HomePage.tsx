import useGetCategoriesList from "context/category/hooks/useGetCategoriesList"
import useGetSlider from "context/home/hooks/useGetSlider"
import useGetProjectsList from "context/project/hooks/useGetProjectsList"
import {PageRouterType} from "types/RouterType"
import Footer from "views/components/footer/Footer"
import HomeCategories from "views/components/home-categories/HomeCategories"
import HomeProjects from "views/components/home-projects/HomeProjects"
import LoadingWrapper from "views/components/loading/LoadingWrapper"
import Slider from "views/components/slider/Slider"

function HomePage({route: {isRendering}}: PageRouterType) {
    const {data: slider, isLoading: sliderLoading} = useGetSlider({isRendering})
    const {data: projects, isLoading: projectsLoading} = useGetProjectsList()
    const {data: categories, isLoading: categoriesLoading} = useGetCategoriesList()
    const isLoading = sliderLoading || projectsLoading || categoriesLoading

    if (isLoading) return <LoadingWrapper/>

    return (
        <>
            <div className="home-page">
                <Slider items={slider} isRendering={isRendering}/>
                <HomeProjects projects={projects}/>
                <HomeCategories categories={categories}/>
            </div>
            <Footer/>
        </>
    )
}

export default HomePage