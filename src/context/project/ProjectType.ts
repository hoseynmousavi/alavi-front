export interface ProjectType {
    id: string,
    title: string,
    province: {
        id: number,
        name: string,
    },
    county: {
        id: number,
        name: string,
    },
    cover_image: string,
    required_amount: number,
    funded_amount: number,
    financial_completion_percentage: number,
    description: string,
    tags: Array<{ id: number, name: string }>,
}

export interface ProjectState {
    items: {
        [id: string]: ProjectType | undefined,
    },
    search: {
        [storeKey: string]: {

            list: Array<string>,
            offset: number,
            count: number,
        } | undefined
    }
}

export interface GetProjectsActionType {
    type: "GET_PROJECTS",
    payload: {
        res: { count: number, results: Array<ProjectType> },
        offset: number,
        storeKey: string
    }
}

export interface GetProjectItemActionType {
    type: "GET_PROJECT_ITEM",
    payload: {
        res: ProjectType,
    }
}

export type ProjectActionType =
    GetProjectsActionType |
    GetProjectItemActionType
