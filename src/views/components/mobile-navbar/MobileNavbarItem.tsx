import router from "helpers/router/router"
import {ComponentAsPropsType} from "types/ComponentAsPropsType"
import MaterialLink from "views/components/material/MaterialLink"

interface MobileNavbarItemProps {
    data: { Icon: ComponentAsPropsType, ActiveIcon: ComponentAsPropsType, title: string, link: string },
    isActive: boolean
}

function MobileNavbarItem({data, isActive}: MobileNavbarItemProps) {
    const {Icon, ActiveIcon, title, link} = data

    function onClick() {
        router.replaceState({url: link})
    }

    return (
        <MaterialLink className="navbar-item" onClick={onClick}>
            <Icon className={`navbar-item-icon de-active ${isActive ? "hide" : ""}`}/>
            <ActiveIcon className={`navbar-item-icon active ${isActive ? "" : "hide"}`}/>
            <div className={`navbar-item-title ${isActive ? "active" : ""}`}>{title}</div>
        </MaterialLink>
    )
}

export default MobileNavbarItem
