import authActions from "context/auth/authActions"
import resetDataManager from "helpers/storage/resetDataManager"
import {RefObject} from "react"
import refreshTokenManager, {RefreshTokenProps} from "request/refreshTokenManager"

let isRefreshing = false

function checkIsRefreshing() {
    return isRefreshing
}

function goForRefresh() {
    if (!isRefreshing) {
        isRefreshing = true
        return new Promise((resolve, reject) => {
            authActions.refreshToken()
                .then(() => {
                    setTimeout(() => {
                        resolve(null)
                        refreshTokenManager.refreshToken({status: "OK"})
                        isRefreshing = false
                    }, 100)
                })
                .catch(err => {
                    resetDataManager.resetData({isAfterLogin: false})
                    setTimeout(() => {
                        reject(err)
                        refreshTokenManager.refreshToken({status: "NOK"})
                        isRefreshing = false
                    }, 100)
                })
        })
    }
    else {
        return handleWaitRefresh()
    }
}

function handleWaitRefresh({cancelToken}: { cancelToken?: RefObject<AbortController | null> } = {}) {
    return new Promise((resolve, reject): void => {

        if (cancelToken) {
            // @ts-ignore
            cancelToken.current = {
                abort: () => {
                    reject({isCancel: true})
                    removeEventListener?.()
                },
            }
        }

        function callback({detail: {status}}: { detail: RefreshTokenProps }) {
            if (status === "OK") resolve(null)
            else reject({isCancel: false})
            removeEventListener?.()
        }

        let removeEventListener = refreshTokenManager.subscribeRefreshToken({callback})
    })
}

const handleRefreshingRequests = {
    checkIsRefreshing,
    goForRefresh,
    handleWaitRefresh,
}

export default handleRefreshingRequests
