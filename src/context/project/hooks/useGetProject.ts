import {projectContext} from "context/project/projectProvider"
import {use} from "react"

function useGetProject({id}: { id: string }) {
    const {projectState: {results, getDone}} = use(projectContext)
    const data = results[id]
    const isLoading = !getDone
    const notFound = !isLoading && !data
    return {data, isLoading, notFound}
}

export default useGetProject
