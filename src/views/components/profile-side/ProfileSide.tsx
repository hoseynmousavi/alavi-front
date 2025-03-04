import URLS from "constant/routing/URLS"
import alertManager from "helpers/alert/alertManager"
import getTextConstant from "helpers/general/getTextConstant"
import goBackToBeforeFlow from "helpers/general/goBackToBeforeFlow"
import resetDataManager from "helpers/storage/resetDataManager"
import CircleInfoColoredSvg from "media/svg/CircleInfoColoredSvg"
import LogoutColoredSvg from "media/svg/LogoutColoredSvg"
import ProfileSvg from "media/svg/ProfileSvg"
import TransactionColoredSvg from "media/svg/TransactionColoredSvg"
import ProfileSideItem from "views/components/profile-side/ProfileSideItem"

function ProfileSide({isMobile}: { isMobile?: boolean }) {
    const {textConstant} = getTextConstant()

    function logout() {
        goBackToBeforeFlow({entry: URLS.mainContainer.routes.profileMobile})
        setTimeout(() => {
            resetDataManager.resetData({isAfterLogin: false})
        }, 400)
    }

    function onLogout() {
        alertManager.openAlertModal({
            Icon: LogoutColoredSvg,
            submitType: "primary-light",
            title: textConstant.logout,
            desc: textConstant.logoutDesc,
            submitText: textConstant.exit,
            cancelText: textConstant.cancel,
            onSubmit: logout,
        })
    }

    return (
        <div className="profile-side">
            <ProfileSideItem Icon={ProfileSvg} title={textConstant.account} link={{to: URLS.mainContainer.routes.profile.routes.profileAccount}}/>
            <ProfileSideItem Icon={TransactionColoredSvg} title={textConstant.helpHistory} link={{to: URLS.mainContainer.routes.profile.routes.profileHistory}}/>
            <ProfileSideItem Icon={CircleInfoColoredSvg} title={textConstant.aboutUs}/>
            <ProfileSideItem Icon={LogoutColoredSvg} title={textConstant.logout} onClick={onLogout}/>
        </div>
    )
}

export default ProfileSide
