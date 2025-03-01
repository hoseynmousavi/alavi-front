import authActions from "context/auth/authActions"
import authReducer, {authInit} from "context/auth/authReducer"
import {AuthActionType, AuthState} from "context/auth/AuthType"
import nothing from "helpers/general/nothing"
import resetDataManager from "helpers/storage/resetDataManager"
import {createContext, Dispatch, ReactElement, useEffect, useReducer, useRef} from "react"

// @ts-ignore
export const authContext = createContext<{ authState: AuthState, authDispatch: Dispatch<AuthActionType> }>(null)

function AuthProvider({children}: { children: ReactElement }) {
    const [authState, authDispatch] = useReducer(authReducer, authInit({isReset: false}))
    const cancelToken = useRef<AbortController>(null)

    useEffect(() => {
        if (authState?.user) {
            authActions.getProfile({
                authDispatch,
                cancelToken,
            })
                .catch(nothing)
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        function onResetData({detail: {isAfterLogin}}: { detail: { isAfterLogin: boolean } }) {
            cancelToken?.current?.abort?.("CANCEL")
            authDispatch({type: "RESET_DATA", payload: {isAfterLogin}})
        }

        resetDataManager.setResetDataListener({callBack: onResetData})
    }, [])

    return (
        <authContext.Provider value={{authState, authDispatch}}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider
