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
    list: Array<string>,
    results: { [id: string]: ProjectType | undefined },
    count: number,
    getDone: boolean,
}

export interface GetProjectsActionType {
    type: "GET_PROJECTS",
    payload: {
        res: { results: Array<ProjectType>, count: number }
    }
}

export type ProjectActionType =
    GetProjectsActionType
