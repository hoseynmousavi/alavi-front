import URLS from "constant/routing/URLS"
import {PageRouterType} from "types/RouterType"
import LoginOtp from "views/components/login/LoginOtp"
import LoginPhone from "views/components/login/LoginPhone"
import Route from "views/components/router/Route"
import Switch from "views/components/router/Switch"

function LoginPageContainer({route: {isRendering}}: PageRouterType) {
    return (
        <div className="login">
            <div className="login-box">
                <div className="login-box-logo">{process.env.REACT_APP_APP_TITLE}</div>
                <Switch level={1} isParentRendering={isRendering} className="login-router" isTab>
                    <Route path={URLS.loginContainer.routes.loginOtp} element={route => <LoginOtp route={route}/>}/>
                    <Route path={URLS.loginContainer.routes.loginPhone} element={route => <LoginPhone route={route}/>}/>
                </Switch>
            </div>
        </div>
    )
}

export default LoginPageContainer
