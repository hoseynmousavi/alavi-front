import URLS from "constant/routing/URLS"
import {lazy} from "react"
import {PageRouterType} from "types/RouterType"
import DesktopHeader from "views/components/desktop-header/DesktopHeader"
import Route from "views/components/router/Route"
import Switch from "views/components/router/Switch"

const PdpPage = lazy(() => import("views/pages/PdpPage"))
const HomePage = lazy(() => import("views/pages/HomePage"))

function MainPageContainer({route: {isRendering}}: PageRouterType) {
    return (
        <>
            <DesktopHeader/>
            <Switch level={1} isParentRendering={isRendering}>
                <Route path={URLS.mainContainer.routes.pdp} element={route => <PdpPage route={route}/>}/>
                <Route path={URLS.mainContainer.routes.home} element={route => <HomePage route={route}/>}/>
            </Switch>
        </>
    )
}

export default MainPageContainer
