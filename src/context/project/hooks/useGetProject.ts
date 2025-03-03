import projectActions from "context/project/projectActions"
import {projectContext} from "context/project/projectProvider"
import useGetData from "hooks/request/useGetData"
import {use} from "react"

function useGetProject({isRendering, id}: { isRendering: boolean, id: string }) {
    const {projectState: {items}, projectDispatch} = use(projectContext)
    const data = items[id]
    const isLoading = !data

    const {notFound, cancelToken} = useGetData({
        getData,
        isLoading,
        isRendering,
    })

    function getData() {
        return projectActions.getItem({data: {id}, projectDispatch, cancelToken})
    }

    return {data, isLoading, notFound}
}

export default useGetProject
