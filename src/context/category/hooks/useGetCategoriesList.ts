import {categoryContext} from "context/category/categoryProvider"
import {use} from "react"

function useGetCategoriesList() {
    const {categoryState: {list, results, getDone}} = use(categoryContext)
    const isLoading = !getDone
    const data = list.map(item => results[item]).filter(item => !!item)
    return {data, isLoading}
}

export default useGetCategoriesList
