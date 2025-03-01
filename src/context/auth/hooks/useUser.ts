import authActions from "context/auth/authActions"
import {authContext} from "context/auth/authProvider"
import {AuthActionType} from "context/auth/AuthType"
import toastManager from "helpers/theme/toastManager"
import {Dispatch, RefObject, use} from "react"
import {ToastModeType} from "types/ToastType"
import {UserType} from "context/auth/AuthType"

interface UpdateUserType {
    data: Partial<UserType> | FormData,
    toastMessage?: string,
    dontToast?: boolean,
    toastType?: ToastModeType,
    progress?: (percent: number) => void,
    cancelToken?: RefObject<AbortController | null>
}

type UserOrNull<T extends UserType | undefined> = T extends UserType ? T : UserType | null

function useUser<T extends UserType | undefined>(): { user: UserOrNull<T>, isLoggedIn: boolean, updateUser: (props: UpdateUserType) => Promise<void>, authDispatch: Dispatch<AuthActionType> } {
    const {authState, authDispatch} = use(authContext) || {}
    const {user} = authState || {}
    const isLoggedIn = !!user

    function updateUser({data, toastMessage, toastType, progress, cancelToken}: UpdateUserType) {
        return authActions.updateUser({data, progress, cancelToken, authDispatch})
            .then(() => {
                if (toastMessage && toastType) {
                    toastManager.addToast({message: toastMessage, type: toastType})
                }
            })
    }

    return {user: user as UserOrNull<T>, isLoggedIn, updateUser, authDispatch}
}

export default useUser
