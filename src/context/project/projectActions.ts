import API_URLS from "constant/routing/API_URLS"
import {GetProjectItemActionType, GetProjectsActionType, ProjectType} from "context/project/ProjectType"
import {Dispatch, RefObject} from "react"
import request from "request/request"

function getList({data: {categoryId, storeKey}, limit, offset, projectDispatch, cancelToken}: { data: { categoryId: number | null, storeKey: string }, projectDispatch: Dispatch<GetProjectsActionType>, limit: number, offset: number, cancelToken?: RefObject<AbortController | null> }) {
    return request.get({url: API_URLS.projects, params: {limit, offset, tags: categoryId}, cancelToken})
        .then((res: { results: Array<ProjectType>, count: number }) => {
            const action: GetProjectsActionType = {type: "GET_PROJECTS", payload: {res, offset: offset + limit, storeKey}}
            projectDispatch(action)
        })
}

function getItem({data: {id}, projectDispatch, cancelToken}: { data: { id: string }, projectDispatch: Dispatch<GetProjectItemActionType>, cancelToken?: RefObject<AbortController | null> }) {
    return request.get({url: API_URLS.project(id), cancelToken})
        .then((res: ProjectType) => {
            projectDispatch({
                type: "GET_PROJECT_ITEM",
                payload: {res},
            })
        })
}

const projectActions = {
    getList,
    getItem,
}

export default projectActions
