import homeActions from "context/home/homeActions"
import {homeContext} from "context/home/homeProvider"
import useGetData from "hooks/useGetData"
import {use} from "react"

function useGetSlider({isRendering}: { isRendering: boolean }) {
    const {homeState: {slider: {items, getDone}}, homeDispatch} = use(homeContext)
    const data = items
    const isLoading = !getDone

    const {cancelToken} = useGetData({
        getData,
        isLoading,
        isRendering,
    })

    function getData() {
        return homeActions.getSlider({homeDispatch, cancelToken})
    }

    return {data, isLoading}
}

export default useGetSlider
