import URLS from "constant/routing/URLS"
import {PageRouterType} from "types/RouterType"
import ProfileSide from "views/components/profile/ProfileSide"
import Route from "views/components/router/Route"
import Switch from "views/components/router/Switch"
import ProfileAccountPage from "views/pages/ProfileAccountPage"

function ProfilePageContainer({route: {isRendering}}: PageRouterType) {
    return (
        <div className="profile">
            <div className="profile-content">
                <div className="profile-content-panel">
                    <ProfileSide/>
                </div>
                <Switch level={2} isParentRendering={isRendering} className="profile-content-main" isTab>
                    <Route path={URLS.mainContainer.routes.profile.routes.profileAccount} element={route => <ProfileAccountPage route={route}/>}/>
                </Switch>
            </div>
        </div>
    )
}

export default ProfilePageContainer
