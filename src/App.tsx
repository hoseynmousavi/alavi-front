import URLS from "constant/routing/URLS"
import {lazy} from "react"
import AlertContainer from "views/components/alert/AlertContainer"
import PrivateRoute from "views/components/router/PrivateRoute"
import Route from "views/components/router/Route"
import Switch from "views/components/router/Switch"
import ToastContainer from "views/components/toast/ToastContainer"
import MainPageContainer from "views/page-containers/MainPageContainer"

const LoginPageContainer = lazy(() => import("views/page-containers/LoginPageContainer"))

function App() {
    return (
        <>
            <Switch level={0}>
                <PrivateRoute path={URLS.loginContainer.entry} element={route => <LoginPageContainer route={route}/>} isContainer ifNotLogin dontChange/>
                <Route path={URLS.mainContainer.entry} element={route => <MainPageContainer route={route}/>} isContainer/>
            </Switch>

            <ToastContainer/>
            <AlertContainer/>
        </>
    )
}

export default App
