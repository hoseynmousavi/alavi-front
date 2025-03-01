import COOKIE_VALUES from "constant/storage/COOKIE_VALUES"
import LOCAL_STORAGE_VALUES from "constant/storage/LOCAL_STORAGE_VALUES"
import {AuthActionType, AuthState} from "context/auth/AuthType"
import clearLocalStorage from "helpers/storage/clearLocalStorage"
import cookieHelper from "helpers/storage/cookieHelper"

const authInitialState: AuthState = {
    isLoading: false,
    user: null,
}

export function authInit({isReset}: { isReset: boolean }) {
    if (isReset) {
        return authInitialState
    }
    else {
        if (typeof window !== "undefined") {
            const token = cookieHelper.getItem(COOKIE_VALUES.token)
            const refresh_token = cookieHelper.getItem(COOKIE_VALUES.refresh_token)
            const user = localStorage.getItem(LOCAL_STORAGE_VALUES.user)
            if (token && refresh_token && user) {
                try {
                    return {...authInitialState, user: JSON.parse(user)}
                }
                catch (e) {
                    return authInitialState
                }
            }
            else {
                return authInitialState
            }
        }
        else {
            return authInitialState
        }
    }
}

function authReducer(state: AuthState = authInitialState, action: AuthActionType): AuthState {
    switch (action.type) {
        case "SET_USER": {
            const {user} = action.payload
            return {
                ...state,
                user,
                isLoading: false,
            }
        }
        case "RESET_DATA": {
            const {isAfterLogin} = action.payload
            clearLocalStorage({
                exceptKeys: [
                    ...Object.values(COOKIE_VALUES),  // COOKIE_VALUES cause of maybe not using cookie in local
                    ...isAfterLogin ? [LOCAL_STORAGE_VALUES.user] : [],
                ],
            })
            if (!isAfterLogin) {
                cookieHelper.removeItem(COOKIE_VALUES.token)
                cookieHelper.removeItem(COOKIE_VALUES.refresh_token)
            }
            return isAfterLogin ? state : authInit({isReset: true})
        }
        default: {
            throw new Error()
        }
    }
}

export default authReducer
