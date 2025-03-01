import useGetProject from "context/project/hooks/useGetProject"
import getTextConstant from "helpers/general/getTextConstant"
import {PageRouterType} from "types/RouterType"
import Button from "views/components/button/Button"
import Footer from "views/components/footer/Footer"
import Image from "views/components/image/Image"
import LoadingWrapper from "views/components/loading/LoadingWrapper"

function PdpPage({route: {params: {id}}}: PageRouterType) {
    const {data} = useGetProject({id})
    const {description, cover_image, title, province, county, funded_amount, required_amount, financial_completion_percentage} = data || {}
    const {textConstant} = getTextConstant()
    if (data) {
        return (
            <>
                <div className="pdp-page">
                    <div className="pdp-page-hero">
                        <div className="pdp-page-hero-first">
                            <div className="pdp-page-hero-first-title">{title}</div>
                            <div className="pdp-page-hero-first-detail">
                                <div>{textConstant.province(province?.name)}</div>
                                <div className="pdp-page-hero-first-detail-border"/>
                                <div>{textConstant.county(county?.name)}</div>
                            </div>
                            <div className="home-project-progress">{textConstant.progressFund(funded_amount || "0", required_amount || "100")}</div>
                            <div className="home-project-bar">
                                <div style={{width: +(financial_completion_percentage || 20) + "%"}}/>
                            </div>
                            <br/>
                            <br/>
                            <Button>{textConstant.involve}</Button>
                        </div>
                        <Image className="pdp-page-hero-second" src={cover_image} resize={{size: 400}}/>
                    </div>
                    <div className="pdp-page-description">
                        <div className="pdp-page-description-title">{textConstant.descProject}</div>
                        <div className="pdp-page-description-txt">
                            {description}
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        )
    }
    else {
        return <LoadingWrapper/>
    }
}

export default PdpPage