import API_URLS from "constant/routing/API_URLS"
import {GetProjectsActionType, ProjectType} from "context/project/ProjectType"
import {Dispatch} from "react"
import request from "request/request"

function getList({projectDispatch}: { projectDispatch: Dispatch<GetProjectsActionType> }) {
    return request.get({url: API_URLS.projects})
        .then((res: { results: Array<ProjectType>, count: number }) => {
            const action: GetProjectsActionType = {type: "GET_PROJECTS", payload: {res}}
            projectDispatch(action)
        })
}

const projectActions = {
    getList,
}

export default projectActions
