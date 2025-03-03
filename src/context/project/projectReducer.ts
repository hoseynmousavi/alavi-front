import {ProjectActionType, ProjectState} from "context/project/ProjectType"
import retrieveInitialState from "helpers/context/retrieveInitialState"
import arrayToKeyObject from "helpers/data-manipulation/arrayToKeyObject"
import mapToKey from "helpers/data-manipulation/mapToKey"

const projectsInitialState: ProjectState = {
    items: {},
    search: {},
}

export function projectInit(props: { [key: string]: ProjectState }) {
    return retrieveInitialState<ProjectState>({key: "project", initialState: projectsInitialState, props})
}

function projectReducer(state: ProjectState = projectsInitialState, action: ProjectActionType) {
    switch (action.type) {
        case "GET_PROJECTS": {
            const {res, offset, storeKey} = action.payload
            const {count, results: data} = res || {}
            return {
                items: {
                    ...state.items,
                    ...arrayToKeyObject(data, "id"),
                },
                search: {
                    ...state.search,
                    [storeKey]: {
                        list: [
                            ...new Set([
                                ...state.search[storeKey]?.list ?? [],
                                ...mapToKey(data, "id"),
                            ]),
                        ],
                        offset,
                        count,
                    },
                },
            }
        }
        case "GET_PROJECT_ITEM": {
            const {res} = action.payload
            return {
                ...state,
                items: {
                    ...state.items,
                    [res.id]: res,
                },
            }
        }
        default: {
            throw new Error()
        }
    }
}

export default projectReducer
