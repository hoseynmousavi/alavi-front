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
    required_amount: string,
    funded_amount: string,
    financial_completion_percentage: string,
    description: string,
}

export interface ProjectState {
    list: {
        [storeKey: string]: {
            results: {
                [id: string]: ProjectType,
            },
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

export type ProjectActionType =
    GetProjectsActionType
