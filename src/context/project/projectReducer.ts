import {ProjectActionType, ProjectState} from "context/project/ProjectType"
import retrieveInitialState from "helpers/context/retrieveInitialState"
import arrayToKeyObject from "helpers/data-manipulation/arrayToKeyObject"
import mapToKey from "helpers/data-manipulation/mapToKey"

const projectsInitialState: ProjectState = {
    list: [],
    results: {},
    count: 0,
    getDone: false,
}

export function projectInit(props: { [key: string]: ProjectState }) {
    return retrieveInitialState<ProjectState>({key: "project", initialState: projectsInitialState, props})
}

function projectReducer(state: ProjectState = projectsInitialState, action: ProjectActionType) {
    switch (action.type) {
        case "GET_PROJECTS": {
            const {res} = action.payload
            const {count, results} = res
            return {
                ...state,
                list: mapToKey(results, "id"),
                results: arrayToKeyObject(results, "id"),
                count,
                getDone: true,
            }
        }
        default: {
            throw new Error()
        }
    }
}

export default projectReducer
