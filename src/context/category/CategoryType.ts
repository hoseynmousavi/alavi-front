export interface CategoryType {
    id: number,
    name: string,
    image: string,
}

export interface CategoryState {
    list: Array<number>,
    results: { [id: number]: CategoryType | undefined },
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
