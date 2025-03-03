import useGetProject from "context/project/hooks/useGetProject"
import {PageRouterType} from "types/RouterType"
import LoadingWrapper from "views/components/loading/LoadingWrapper"
import PdpPageContent from "views/components/pdp/PdpPageContent"

function PdpPage({route: {params: {id}, isRendering}}: PageRouterType) {
    const {data} = useGetProject({id, isRendering})
    if (data) {
        return <PdpPageContent data={data} isRendering={isRendering}/>
    }
    else {
        return <LoadingWrapper/>
    }
}

export default PdpPage
