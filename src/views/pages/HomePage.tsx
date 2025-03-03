import useGetCategoriesList from "context/category/hooks/useGetCategoriesList"
import useGetSlider from "context/home/hooks/useGetSlider"
import useGetProjectsList from "context/project/hooks/useGetProjectsList"
import {PageRouterType} from "types/RouterType"
import Footer from "views/components/footer/Footer"
import HomeCategories from "views/components/home-categories/HomeCategories"
import LoadingWrapper from "views/components/loading/LoadingWrapper"
import ProjectsRow from "views/components/projects-row/ProjectsRow"
import Slider from "views/components/slider/Slider"

function HomePage({route: {isRendering}}: PageRouterType) {
    const {data: slider, isLoading: sliderLoading} = useGetSlider({isRendering})
    const {data: projects, isLoading: projectsLoading} = useGetProjectsList({isRendering, categoryId: null})
    const {data: categories, isLoading: categoriesLoading} = useGetCategoriesList()
    const isLoading = sliderLoading || projectsLoading || categoriesLoading

    if (isLoading) return <LoadingWrapper/>

    return (
        <>
            <div className="home-page">
                <Slider items={slider} isRendering={isRendering}/>
                <ProjectsRow projects={projects.slice(0, 3)}/>
                <HomeCategories categories={categories}/>
            </div>
            <Footer/>
        </>
    )
}

export default HomePage
