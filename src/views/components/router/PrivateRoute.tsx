import URLS from "constant/routing/URLS"
import useUser from "context/auth/hooks/useUser"
import {ReactElement, useRef} from "react"
import {RouterType} from "types/RouterType"
import Redirect from "views/components/router/Redirect"
import Route from "views/components/router/Route"

interface PrivateRouteProps {
    ifNotLogin?: boolean,
    dontChange?: boolean,
    location?: string,
    isRendering?: boolean,
    path: string,
    element: (route: RouterType) => ReactElement,
    isContainer?: boolean
}

function PrivateRoute(props: PrivateRouteProps) {
    const {ifNotLogin, dontChange, location, isRendering = false, path, element} = props
    const {user} = useUser()
    const isLoginRef = useRef(!!user).current
    const isLogin = dontChange ? isLoginRef : !!user

    if (ifNotLogin) {
        if (!isLogin) return <Route location={location} isRendering={isRendering} path={path} element={element}/>
        else return <Redirect isRendering={isRendering} to={URLS.mainContainer.routes.home}/>
    }
    else {
        if (isLogin) return <Route location={location} isRendering={isRendering} path={path} element={element}/>
        else return <Redirect isRendering={isRendering} to={URLS.loginContainer.routes.loginPhone}/>
    }
}

export default PrivateRoute
