export interface RefreshTokenProps {
    status: "OK" | "NOK"
}

function configRefreshToken() {
    window.refreshToken = function (props: RefreshTokenProps) {
        const event = new CustomEvent("refreshToken", {detail: props})
        window.dispatchEvent(event)
    }
}

function refreshToken(props: RefreshTokenProps) {
    if (!window.refreshToken) {
        configRefreshToken()
    }

    window.refreshToken(props)
}

function subscribeRefreshToken({callback}: { callback: ({detail}: { detail: RefreshTokenProps }) => void }) {
    // @ts-ignore
    window.addEventListener("refreshToken", callback, {passive: true})
    // @ts-ignore
    return () => window.removeEventListener("refreshToken", callback)
}

const refreshTokenManager = {
    refreshToken,
    subscribeRefreshToken,
}

export default refreshTokenManager
