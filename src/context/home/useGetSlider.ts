import useGetData from "hooks/useGetData"
import {useState} from "react"
import request from "request/request"

function useGetSlider({isRendering}: { isRendering: boolean }) {
    const [data, setData] = useState<any>(null)
    const isLoading = !data

    useGetData({
        getData,
        isLoading,
        isRendering,
    })

    function getData() {
        return request.get({url: "api/v1/common/homepage-sliders"})
            .then(res => {
                setData(res)
            })
    }

    return {data, isLoading}
}

export default useGetSlider
