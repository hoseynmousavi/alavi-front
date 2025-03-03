import URLS from "constant/routing/URLS"
import useGetCategoriesList from "context/category/hooks/useGetCategoriesList"
import useGetProjectsList from "context/project/hooks/useGetProjectsList"
import getTextConstant from "helpers/general/getTextConstant"
import parseQueryString from "helpers/query-param/parseQueryString"
import router from "helpers/router/router"
import useEffectJustChanges from "hooks/general/useEffectJustChanges"
import useGetMoreOnPaginate from "hooks/request/useGetMoreOnPaginate"
import {useState} from "react"
import {PageRouterType} from "types/RouterType"
import Footer from "views/components/footer/Footer"
import Loader from "views/components/loading/Loader"
import LoadingWrapper from "views/components/loading/LoadingWrapper"
import ProjectsRowItem from "views/components/projects-row/ProjectsRowItem"
import ProjectsPageCategoryBtn from "views/pages/ProjectsPageCategoryBtn"

function ProjectsPage({route: {isRendering}}: PageRouterType) {
    const [categoryId, setCategoryId] = useState<number | null>(setInitialCategoryId)
    const {textConstant} = getTextConstant()
    const {data: categories, isLoading: categoriesLoading} = useGetCategoriesList()
    const {data: projects, isLoading: projectsLoading, getMore} = useGetProjectsList({isRendering, categoryId})

    useGetMoreOnPaginate({getMore, isRendering})

    function setInitialCategoryId() {
        const {categoryId} = parseQueryString()
        return categoryId && typeof categoryId === "string" ? +categoryId : null
    }

    useEffectJustChanges(() => {
        if (isRendering) {
            router.replaceState({url: URLS.mainContainer.routes.projectsLink(categoryId), data: "for-history"})
        }
        // eslint-disable-next-line
    }, [categoryId])


    if (categoriesLoading) return <LoadingWrapper/>
    return (
        <>
            <div className="projects-page">
                <h1 className="projects-page-title">{textConstant.projectChances}</h1>
                <div className="projects-page-category">
                    <ProjectsPageCategoryBtn setCategoryId={setCategoryId} isActive={!categoryId} title={textConstant.allCats} id={null}/>
                    {
                        categories.map(category =>
                            <ProjectsPageCategoryBtn key={category.id} setCategoryId={setCategoryId} isActive={categoryId === category.id} title={category.name} id={category.id}/>,
                        )
                    }
                </div>
                {
                    projectsLoading ?
                        <Loader/>
                        :
                        !!projects.length ?
                            <div className="projects-page-list">
                                {
                                    projects.map(project =>
                                        <ProjectsRowItem data={project} key={project.id}/>,
                                    )
                                }
                            </div>
                            :
                            <div className="projects-page-404">{textConstant.noProjectFound}</div>
                }
            </div>
            <Footer/>
        </>
    )
}

export default ProjectsPage
