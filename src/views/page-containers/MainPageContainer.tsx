import URLS from "constant/routing/URLS"
import {lazy} from "react"
import {PageRouterType} from "types/RouterType"
import DesktopHeader from "views/components/desktop-header/DesktopHeader"
import MobileNavbar from "views/components/mobile-navbar/MobileNavbar"
import Route from "views/components/router/Route"
import Switch from "views/components/router/Switch"

const ProfilePage = lazy(() => import("views/pages/ProfilePage"))
const ProjectsPage = lazy(() => import("views/pages/ProjectsPage"))
const PdpPage = lazy(() => import("views/pages/PdpPage"))
const HomePage = lazy(() => import("views/pages/HomePage"))

function MainPageContainer({route: {isRendering}}: PageRouterType) {
    return (
        <>
            <DesktopHeader/>
            <Switch level={1} isParentRendering={isRendering}>
                <Route path={URLS.mainContainer.routes.profile} element={route => <ProfilePage route={route}/>}/>
                <Route path={URLS.mainContainer.routes.projects} element={route => <ProjectsPage route={route}/>}/>
                <Route path={URLS.mainContainer.routes.pdp} element={route => <PdpPage route={route}/>}/>
                <Route path={URLS.mainContainer.routes.home} element={route => <HomePage route={route}/>}/>
            </Switch>
            <MobileNavbar/>
        </>
    )
}

export default MainPageContainer
