import getTextConstant from "helpers/general/getTextConstant"
import MaterialLink from "views/components/material/MaterialLink"

function Footer() {
    const {textConstant} = getTextConstant()
    return (
        <footer className="footer">
            <div className="footer-header">
                <div className="footer-header-border"/>
                <div className="footer-header-title">{process.env.REACT_APP_APP_TITLE}</div>
            </div>
            <div className="footer-col">
                <div className="footer-col-title">{textConstant.contactUsFooter}</div>
                <MaterialLink className="footer-col-item">{textConstant.contactUs}</MaterialLink>
                <MaterialLink className="footer-col-item">{textConstant.aboutUs}</MaterialLink>
            </div>
            <div className="footer-txt">{textConstant.footerTxt}</div>
        </footer>
    )
}

export default Footer