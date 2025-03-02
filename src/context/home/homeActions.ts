import API_URLS from "constant/routing/API_URLS"
import {GetHomeSliderActionType, SliderItemType} from "context/home/HomeType"
import {Dispatch, RefObject} from "react"
import request from "request/request"

function getSlider({homeDispatch, cancelToken}: { homeDispatch: Dispatch<GetHomeSliderActionType>, cancelToken: RefObject<AbortController | null> }) {
    return request.get({url: API_URLS.slider, cancelToken})
        .then((res: Array<SliderItemType>) => {
            homeDispatch({
                type: "GET_HOME_SLIDER",
                payload: {res},
            })
        })
}

const homeActions = {
    getSlider,
}

export default homeActions