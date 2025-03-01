export interface CategoryType {
    id: string,
    name: string,
    image: string,
}

export interface CategoryState {
    list: Array<string>,
    results: { [id: string]: CategoryType | undefined },
    count: number,
    getDone: boolean,
}

export interface GetCategoriesActionType {
    type: "GET_CATEGORIES",
    payload: {
        res: { results: Array<CategoryType>, count: number }
    }
}

export type CategoryActionType =
    GetCategoriesActionType
