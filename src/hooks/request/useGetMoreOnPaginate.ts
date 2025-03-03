import getWindowScrollAndHeight from "helpers/general/getWindowScrollAndHeight"
import useScroll from "hooks/general/useScroll"

function useGetMoreOnPaginate({getMore, isRendering}: { getMore: () => void, isRendering: boolean }) {
    useScroll({scrollCallback, isRendering, dependencies: [getMore]})

    function scrollCallback() {
        const {scrollHeight, clientHeight, scrollTop} = getWindowScrollAndHeight()
        if (clientHeight + scrollTop >= scrollHeight - 1500) {
            getMore()
        }
    }
}

export default useGetMoreOnPaginate
