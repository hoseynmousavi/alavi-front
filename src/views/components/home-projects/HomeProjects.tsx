import {ProjectType} from "context/project/ProjectType"
import getTextConstant from "helpers/general/getTextConstant"
import ArrowDownSvg from "media/svg/ArrowDownSvg"
import HomeProject from "views/components/home-projects/HomeProject"
import MaterialLink from "views/components/material/MaterialLink"

function HomeProjects({projects}: { projects: Array<ProjectType> }) {
    const {textConstant} = getTextConstant()
    return (
        <div className="home-projects">
            <div className="home-projects-header">
                <div className="home-projects-header-title">{textConstant.projectChances2}</div>
                <MaterialLink className="home-projects-header-all">
                    {textConstant.showAll}
                    <ArrowDownSvg/>
                </MaterialLink>
            </div>
            <div className="home-projects-list">
                {
                    projects.map(data =>
                        <HomeProject key={data.id} data={data} />
                    )
                }
            </div>
        </div>
    )
}

export default HomeProjects