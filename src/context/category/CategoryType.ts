export interface CategoryType {
    category_icon: string,
    index: number,
    slug: string,
    title_en: string,
    title_fa: string,
}

export interface CategoryState {
    list: Array<string>,
    results: { [slug: string]: CategoryType | undefined },
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
