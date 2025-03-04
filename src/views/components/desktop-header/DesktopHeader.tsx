import URLS from "constant/routing/URLS"
import useUser from "context/auth/hooks/useUser"
import getFullName from "helpers/general/getFullName"
import getTextConstant from "helpers/general/getTextConstant"
import ProfileSvg from "media/svg/ProfileSvg"
import Button from "views/components/button/Button"
import MaterialLink from "views/components/material/MaterialLink"

function DesktopHeader() {
    const {textConstant} = getTextConstant()
    const {isLoggedIn, user} = useUser()
    const {first_name, last_name} = user || {}
    const fullName = getFullName({firstName: first_name, lastName: last_name})
    return (
        <header className="desktop-header">
            <div className="desktop-header-content">
                <div className="desktop-header-first">
                    <MaterialLink className="desktop-header-first-logo" link={{to: URLS.mainContainer.routes.home}}>{process.env.REACT_APP_APP_TITLE}</MaterialLink>
                    <MaterialLink className="desktop-header-first-btn" link={{to: URLS.mainContainer.routes.projects}}>{textConstant.projectChances}</MaterialLink>
                    <MaterialLink className="desktop-header-first-btn">{textConstant.aboutUs}</MaterialLink>
                    <MaterialLink className="desktop-header-first-btn">{textConstant.contactUs}</MaterialLink>
                </div>
                {
                    isLoggedIn ?
                        <Button desktopType="border-n6-color-on-background" desktopSize="medium" link={{to: URLS.mainContainer.routes.profile.routes.profileAccount}}>
                            <ProfileSvg/>
                            {fullName}
                        </Button>
                        :
                        <Button desktopType="primary-light" desktopSize="medium" link={{to: URLS.loginContainer.routes.loginPhone}}>
                            {textConstant.loginSignup}
                        </Button>
                }
            </div>
        </header>
    )
}

export default DesktopHeader
