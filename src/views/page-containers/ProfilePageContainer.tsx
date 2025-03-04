import URLS from "constant/routing/URLS"
import {lazy} from "react"
import {PageRouterType} from "types/RouterType"
import ProfileSide from "views/components/profile-side/ProfileSide"
import Route from "views/components/router/Route"
import Switch from "views/components/router/Switch"

const ProfileHistoryPage = lazy(() => import("views/pages/ProfileHistoryPage"))
const ProfileAccountPage = lazy(() => import("views/pages/ProfileAccountPage"))

function ProfilePageContainer({route: {isRendering}}: PageRouterType) {
    return (
        <div className="profile">
            <div className="profile-content">
                <div className="profile-content-panel">
                    <ProfileSide/>
                </div>
                <Switch level={2} isParentRendering={isRendering} className="profile-content-main" isTab>
                    <Route path={URLS.mainContainer.routes.profile.routes.profileHistory} element={route => <ProfileHistoryPage route={route}/>}/>
                    <Route path={URLS.mainContainer.routes.profile.routes.profileAccount} element={route => <ProfileAccountPage route={route}/>}/>
                </Switch>
            </div>
        </div>
    )
}

export default ProfilePageContainer
