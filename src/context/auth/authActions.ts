import API_URLS from "constant/routing/API_URLS"
import URLS from "constant/routing/URLS"
import COOKIE_VALUES from "constant/storage/COOKIE_VALUES"
import LOCAL_STORAGE_VALUES from "constant/storage/LOCAL_STORAGE_VALUES"
import {SetUserActionType, UserType} from "context/auth/AuthType"
import getTextConstant from "helpers/general/getTextConstant"
import goBackToBeforeFlow from "helpers/general/goBackToBeforeFlow"
import cookieHelper from "helpers/storage/cookieHelper"
import toastManager from "helpers/theme/toastManager"
import {Dispatch, RefObject} from "react"
import getToken from "request/getToken"
import request from "request/request"

function getProfile({authDispatch, cancelToken}: { authDispatch: Dispatch<SetUserActionType>, cancelToken?: RefObject<AbortController | null> }) {
    return request.get({url: API_URLS.profile, cancelToken})
        .then((user: UserType) => {
            setUser({data: {user}, authDispatch})
        })
}

function updateUser({data, cancelToken, authDispatch}: { data: Partial<UserType>, cancelToken?: RefObject<AbortController | null>, authDispatch: Dispatch<SetUserActionType> }) {
    return request.patch({url: API_URLS.profile, data, cancelToken})
        .then((user: UserType) => {
            setUser({data: {user}, authDispatch})
        })
}

function setUser({data: {user}, authDispatch}: { data: { user: UserType }, authDispatch: Dispatch<SetUserActionType> }) {
    localStorage.setItem(LOCAL_STORAGE_VALUES.user, JSON.stringify(user))
    authDispatch({
        type: "SET_USER",
        payload: {user},
    })
}

function _setCookies({access_token, refresh_token}: { access_token: string, refresh_token: string }) {
    cookieHelper.setItem(COOKIE_VALUES.token, access_token)
    cookieHelper.setItem(COOKIE_VALUES.refresh_token, refresh_token)
}

function refreshToken() {
    const refresh_token = getToken({useRefreshToken: true})
    return new Promise((resolve, reject) => {
        request.post({url: API_URLS.refresh, headers: {"Refresh-Token": refresh_token}, dontToast: true})
            .then((res: { access_token: string, refresh_token: string }) => {
                const {access_token, refresh_token} = res
                _setCookies({access_token, refresh_token})
                resolve(null)
            })
            .catch(err => {
                const refreshError = err?.status === 400
                if (refreshError) {
                    const {toastConstant} = getTextConstant()
                    toastManager.addToast({message: toastConstant.refreshError, type: "INFO"})
                    reject(err)
                }
                else {
                    resolve(null)
                }
            })
    })
}

function getOtpCode({data: {phone_number}}: { data: { phone_number: string } }): Promise<{ remaining: number, detail: string }> {
    const data = new URLSearchParams()
    data.append("phone_number", phone_number)
    return request.post({url: API_URLS.otp, data})
}

function login({data: {phone_number, code}, authDispatch}: { data: { phone_number: string, code: string }, authDispatch: Dispatch<SetUserActionType> }) {
    const data = new URLSearchParams()
    data.append("phone_number", phone_number)
    data.append("code", code)
    return request.post({url: API_URLS.otp, data, dontToast: true})
        .then((res: { access_token: string, refresh_token: string, created: boolean, user: UserType }) => {
            const {access_token, refresh_token, user} = res
            _setCookies({access_token, refresh_token})
            setUser({data: {user}, authDispatch})
            goBackToBeforeFlow({entry: URLS.loginContainer.entry})
        })
}

const authActions = {
    getProfile,
    updateUser,
    setUser,
    refreshToken,
    getOtpCode,
    login,
}

export default authActions
