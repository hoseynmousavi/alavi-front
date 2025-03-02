export interface SliderItemType {
    id: string,
    desktop_image: string,
    mobile_image: string,
}

export interface HomeState {
    slider: {
        items: Array<SliderItemType>,
        getDone: boolean
    },
}

export interface GetHomeSliderActionType {
    type: "GET_HOME_SLIDER",
    payload: { res: Array<SliderItemType> }
}

export type HomeActionType =
    GetHomeSliderActionType