import URLS from "constant/routing/URLS"
import FA_TEXT from "constant/text/FA_TEXT"
import {ProjectType} from "context/project/ProjectType"
import getTextConstant from "helpers/general/getTextConstant"
import ArrowDownSvg from "media/svg/ArrowDownSvg"
import MaterialLink from "views/components/material/MaterialLink"
import ProjectsRowItem from "views/components/projects-row/ProjectsRowItem"

function ProjectsRow({projects, title = FA_TEXT.projectChances2, link = URLS.mainContainer.routes.projects}: { projects: Array<ProjectType>, title?: string, link?: string }) {
    const {textConstant} = getTextConstant()
    return (
        <div>
            <div className="home-projects-header">
                <div className="home-projects-header-title">{title}</div>
                <MaterialLink className="home-projects-header-all" link={{to: link}}>
                    {textConstant.showAll}
                    <ArrowDownSvg/>
                </MaterialLink>
            </div>
            <div className="home-projects-list">
                {
                    projects.map(data =>
                        <ProjectsRowItem key={data.id} data={data}/>,
                    )
                }
            </div>
        </div>
    )
}

export default ProjectsRow
