import URLS from "constant/routing/URLS"
import {ProjectType} from "context/project/ProjectType"
import getTextConstant from "helpers/general/getTextConstant"
import Image from "views/components/image/Image"
import MaterialLink from "views/components/material/MaterialLink"

function HomeProject({data}: { data: ProjectType }) {
    const {id, cover_image, title, description, financial_completion_percentage, funded_amount, required_amount} = data
    const {textConstant} = getTextConstant()
    return (
        <MaterialLink className="home-project" link={{to: URLS.mainContainer.routes.pdpLink(id)}}>
            <Image className="home-project-img" src={cover_image} alt={title} resize={{size: 300}}/>
            <div className="home-project-title">{title}</div>
            <div className="home-project-desc">{description}</div>
            <div className="home-project-progress">{textConstant.progressFund(funded_amount || "0", required_amount || "100")}</div>
            <div className="home-project-bar">
                <div style={{width: +(financial_completion_percentage || 20) + "%"}}/>
            </div>
        </MaterialLink>
    )
}

export default HomeProject