import URLS from "constant/routing/URLS"
import useUser from "context/auth/hooks/useUser"
import getTextConstant from "helpers/general/getTextConstant"
import Button from "views/components/button/Button"
import MaterialLink from "views/components/material/MaterialLink"

function DesktopHeader() {
    const {textConstant} = getTextConstant()
    const {isLoggedIn} = useUser()
    return (
        <header className="desktop-header">
            <div className="desktop-header-content">
                <div className="desktop-header-first">
                    <MaterialLink className="desktop-header-first-logo" link={{to: URLS.mainContainer.routes.home}}>{process.env.REACT_APP_APP_TITLE}</MaterialLink>
                    <MaterialLink className="desktop-header-first-btn">{textConstant.projectChances}</MaterialLink>
                    <MaterialLink className="desktop-header-first-btn">{textConstant.aboutUs}</MaterialLink>
                    <MaterialLink className="desktop-header-first-btn">{textConstant.contactUs}</MaterialLink>
                </div>
                {
                    !isLoggedIn &&
                    <Button mobileSize="small" desktopSize="medium" desktopType="primary-light" link={{to: URLS.loginContainer.routes.loginPhone}}>{textConstant.loginSignup}</Button>
                }
            </div>
        </header>
    )
}

export default DesktopHeader
