import {HomeActionType, HomeState} from "context/home/HomeType"
import retrieveInitialState from "helpers/context/retrieveInitialState"

const homeInitialState: HomeState = {
    slider: {
        items: [],
        getDone: false,
    },
}

export function homeInit(props: { [key: string]: HomeState }) {
    return retrieveInitialState<HomeState>({key: "home", initialState: homeInitialState, props})
}

function homeReducer(state: HomeState = homeInitialState, action: HomeActionType) {
    switch (action.type) {
        case "GET_HOME_SLIDER": {
            const {res} = action.payload
            return {
                ...state,
                slider: {
                    items: res,
                    getDone: true,
                },
            }
        }
        default: {
            throw new Error()
        }
    }
}

export default homeReducer