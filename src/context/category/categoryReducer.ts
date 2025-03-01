import {CategoryActionType, CategoryState} from "context/category/CategoryType"
import retrieveInitialState from "helpers/context/retrieveInitialState"
import arrayToKeyObject from "helpers/data-manipulation/arrayToKeyObject"
import mapToKey from "helpers/data-manipulation/mapToKey"

const categoryInitialState: CategoryState = {
    list: [],
    results: {},
    count: 0,
    getDone: false,
}

export function categoryInit(props: { [key: string]: CategoryState }) {
    return retrieveInitialState<CategoryState>({key: "category", initialState: categoryInitialState, props})
}

function categoryReducer(state: CategoryState = categoryInitialState, action: CategoryActionType) {
    switch (action.type) {
        case "GET_CATEGORIES": {
            const {res} = action.payload
            const {count, results} = res
            return {
                ...state,
                list: mapToKey(results, "slug"),
                results: arrayToKeyObject(results, "slug"),
                count,
                getDone: true,
            }
        }
        default: {
            throw new Error()
        }
    }
}

export default categoryReducer
