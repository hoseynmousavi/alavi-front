import URLS from "constant/routing/URLS"
import useGetProjectsList from "context/project/hooks/useGetProjectsList"
import {ProjectType} from "context/project/ProjectType"
import getTextConstant from "helpers/general/getTextConstant"
import getWindowScrollAndHeight from "helpers/general/getWindowScrollAndHeight"
import router from "helpers/router/router"
import share from "helpers/share/share"
import getRgbaFromColor from "helpers/theme/getRgbaFromColor"
import useScroll from "hooks/general/useScroll"
import LineArrowSvg from "media/svg/LineArrowSvg"
import ShareSvg from "media/svg/ShareSvg"
import {useRef, useState} from "react"
import {MaterialLinkRefType} from "types/MaterialLinkType"
import Button from "views/components/button/Button"
import Image from "views/components/image/Image"
import Loader from "views/components/loading/Loader"
import MaterialLink from "views/components/material/MaterialLink"
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
    const headerRef = useRef<HTMLDivElement>(null)
    const secondBtnRef = useRef<MaterialLinkRefType>(null)
    const firstBtnRef = useRef<MaterialLinkRefType>(null)

    useScroll({scrollCallback, isRendering})

    function scrollCallback() {
        const {scrollTop} = getWindowScrollAndHeight()
        const scroll = Math.max(0, scrollTop)
        const progress = Math.min(scroll / 50, 1)
        if (headerRef.current) {
            headerRef.current.style.backgroundColor = getRgbaFromColor({variable: "--surface-color", alpha: Math.max(0, progress - 0.05)})
            headerRef.current.style.paddingInline = `calc(var(--first-solid-padding) - 12px * ${progress})`
            headerRef.current.style.paddingBlock = `calc(16px - 8px * ${progress})`
        }

        if (firstBtnRef.current && secondBtnRef.current) {
            firstBtnRef.current.style.transition =
                secondBtnRef.current.style.transition =
                    "none"

            firstBtnRef.current.style.backgroundColor =
                secondBtnRef.current.style.backgroundColor =
                    getRgbaFromColor({variable: "--surface-color", alpha: Math.max(0, 0.9 - progress)})
        }
    }

    function togglePayModal() {
        setShowPayModal(showPayModal => !showPayModal)
    }

    function onShare() {
        share({title: title})
    }

    return (
        <div className="pdp">
            <div className="pdp-page">
                <div className="pdp-page-mobile-header" ref={headerRef}>
                    <MaterialLink contRef={firstBtnRef} className="pdp-page-mobile-header-btn back" onClick={router.back}><LineArrowSvg/></MaterialLink>
                    <MaterialLink contRef={secondBtnRef} className="pdp-page-mobile-header-btn" onClick={onShare}><ShareSvg/></MaterialLink>
                </div>
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

            {
                showPayModal &&
                <PdpPayModal close={togglePayModal}/>
            }
        </div>
    )
}

export default PdpPageContent
