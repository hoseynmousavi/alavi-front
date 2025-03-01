import getTextConstant from "helpers/general/getTextConstant"
import Button from "views/components/button/Button"
import MaterialLink from "views/components/material/MaterialLink"

function DesktopHeader() {
    const {textConstant} = getTextConstant()
    return (
        <header className="desktop-header">
            <div className="desktop-header-first">
                <div className="desktop-header-first-logo">{process.env.REACT_APP_APP_TITLE}</div>
                <MaterialLink className="desktop-header-first-btn">{textConstant.projectChances}</MaterialLink>
                <MaterialLink className="desktop-header-first-btn">{textConstant.aboutUs}</MaterialLink>
                <MaterialLink className="desktop-header-first-btn">{textConstant.contactUs}</MaterialLink>
            </div>
            <Button desktopSize="medium" desktopType="primary-light">{textConstant.loginSignup}</Button>
        </header>
    )
}

export default DesktopHeader
