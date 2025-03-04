import ArrowDownSvg from "media/svg/ArrowDownSvg"
import {ComponentAsPropsType} from "types/ComponentAsPropsType"
import LinkType from "types/LinkType"
import MaterialLink from "views/components/material/MaterialLink"

function ProfileSideItem({Icon, title, isActive, link, onClick}: { Icon: ComponentAsPropsType, title: string, isActive?: boolean, link?: LinkType, onClick?: () => void }) {
    return (
        <MaterialLink className={`profile-side-item ${isActive ? "active" : ""}`} link={link} onClick={onClick}>
            <Icon className="profile-side-item-icon"/>
            <div className="profile-side-item-title">{title}</div>
            <ArrowDownSvg className="profile-side-item-arrow"/>
        </MaterialLink>
    )
}

export default ProfileSideItem
