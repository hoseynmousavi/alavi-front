import {categoryContext} from "context/category/categoryProvider"
import {use} from "react"

function useGetCategory({slug}: { slug: string }) {
    const {categoryState: {results, getDone}} = use(categoryContext)
    const data = results[slug]
    const isLoading = !getDone
    const notFound = !isLoading && !data
    return {data, isLoading, notFound}
}

export default useGetCategory
