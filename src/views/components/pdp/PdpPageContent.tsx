import URLS from "constant/routing/URLS"
import useGetProjectsList from "context/project/hooks/useGetProjectsList"
import {ProjectType} from "context/project/ProjectType"
import getTextConstant from "helpers/general/getTextConstant"
import {useState} from "react"
import Button from "views/components/button/Button"
import Footer from "views/components/footer/Footer"
import Image from "views/components/image/Image"
import Loader from "views/components/loading/Loader"
import PdpPayModal from "views/components/pdp/PdpPayModal"
import ProjectsRow from "views/components/projects-row/ProjectsRow"

function PdpPageContent({data, isRendering}: { data: ProjectType, isRendering: boolean }) {
    const {id, description, cover_image, title, province, county, funded_amount, required_amount, financial_completion_percentage, tags} = data
    const categoryId = tags[0].id
    const categoryName = tags[0].name
    const {data: similarProjects, isLoading} = useGetProjectsList({isRendering, categoryId})
    const showSimilarProjects = similarProjects.filter(item => item.id !== id).slice(0, 3) // TODO wow delete
    const {textConstant} = getTextConstant()
    const [showPayModal, setShowPayModal] = useState(false)

    function togglePayModal() {
        setShowPayModal(showPayModal => !showPayModal)
    }

    return (
        <div className="pdp">
            <div className="pdp-page">
                <div className="pdp-page-hero">
                    <div className="pdp-page-hero-first">
                        <div className="pdp-page-hero-first-title">{title}</div>
                        <div className="pdp-page-hero-first-detail">
                            <div>{textConstant.province(province.name)}</div>
                            <div className="pdp-page-hero-first-detail-border"/>
                            <div>{textConstant.county(county.name)}</div>
                            <div className="pdp-page-hero-first-detail-border"/>
                            <div>{categoryName}</div>
                        </div>
                        <div className="pdp-page-hero-first-nav">
                            <div className="pdp-page-hero-first-nav-detail">
                                <div className="pdp-page-hero-first-progress">{textConstant.progressFund(funded_amount, required_amount)}{textConstant.fundGot}</div>
                                <div className="pdp-page-hero-first-progress-bar">
                                    <div style={{width: +financial_completion_percentage + "%"}}/>
                                </div>
                            </div>
                            <Button mobileSize="medium" className="pdp-page-hero-first-btn" desktopSize="large" onClick={togglePayModal}>{textConstant.involve}</Button>
                        </div>
                        <div className="pdp-page-hero-first-count"><span>{textConstant.peopleCount(40)}</span>{textConstant.involvedPeopleCount}</div>
                    </div>
                    <Image className="pdp-page-hero-second" src={cover_image} resize={{size: 400}}/>
                </div>

                <div className="pdp-page-description">
                    <div className="pdp-page-description-title">{textConstant.descProject}</div>
                    <div className="pdp-page-description-txt">
                        {description}
                    </div>
                </div>

                {
                    isLoading ?
                        <Loader/>
                        :
                        !!showSimilarProjects.length &&
                        <ProjectsRow projects={showSimilarProjects}
                                     title={textConstant.projectSimilarChances2}
                                     link={URLS.mainContainer.routes.projectsLink(categoryId)}
                        />
                }

            </div>
            <Footer/>

            {
                showPayModal &&
                <PdpPayModal close={togglePayModal}/>
            }
        </div>
    )
}

export default PdpPageContent
