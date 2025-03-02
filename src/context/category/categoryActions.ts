import API_URLS from "constant/routing/API_URLS"
import {CategoryType, GetCategoriesActionType} from "context/category/CategoryType"
import {Dispatch, startTransition} from "react"
import request from "request/request"

function getList({categoryDispatch}: { categoryDispatch?: Dispatch<GetCategoriesActionType> }) {
    return request.get({url: API_URLS.categories})
        .then((res: { results: Array<CategoryType>, count: number }) => {
            const action: GetCategoriesActionType = {type: "GET_CATEGORIES", payload: {res}}
            if (categoryDispatch) {
                startTransition(() => {
                    categoryDispatch(action)
                })
            }
            return action
        })
}

const categoryActions = {
    getList,
}

export default categoryActions
