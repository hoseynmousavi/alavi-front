import {projectContext} from "context/project/projectProvider"
import {use} from "react"

function useGetProjectsList() {
    const {projectState: {list, results, getDone}} = use(projectContext)
    const isLoading = !getDone
    const data = list.map(item => results[item]).filter(item => !!item)
    return {data, isLoading}
}

export default useGetProjectsList
