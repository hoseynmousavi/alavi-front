import projectActions from "context/project/projectActions"
import {projectContext} from "context/project/projectProvider"
import checkIsDone from "helpers/pagination/checkIsDone"
import getSendOffset from "helpers/pagination/getSendOffset"
import createQueryString from "helpers/query-param/createQueryString"
import useGetPaginatedData from "hooks/request/useGetPaginatedData"
import {use} from "react"

const PROJECT_LIMIT = 18

function useGetProjectsList({isRendering, categoryId}: { isRendering: boolean, categoryId: number | null }) {
    const {projectState: {search, items}, projectDispatch} = use(projectContext)
    const storeKey = createQueryString({params: {categoryId}})
    const {list, offset, count} = search[storeKey] || {}
    const data = (list ?? []).map(item => items?.[item]).filter(item => !!item)
    const {getDone} = checkIsDone({offset, count})

    const {isLoading, cancelToken, getMore} = useGetPaginatedData({
        offset,
        getData,
        getDone,
        isRendering,
        dependencies: [categoryId],
    })

    function getData() {
        return projectActions.getList({
            data: {categoryId, storeKey},
            projectDispatch,
            offset: getSendOffset({offset}),
            limit: PROJECT_LIMIT,
            cancelToken,
        })
    }

    return {isLoading, data, count, getMore, limit: PROJECT_LIMIT}
}

export default useGetProjectsList
