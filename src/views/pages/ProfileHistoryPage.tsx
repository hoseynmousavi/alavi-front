import getTextConstant from "helpers/general/getTextConstant"
import router from "helpers/router/router"
import LineArrowSvg from "media/svg/LineArrowSvg"
import {PageRouterType} from "types/RouterType"
import MaterialLink from "views/components/material/MaterialLink"
import ProfileHistoryItem from "views/components/profile-history/ProfileHistoryItem"

function ProfileHistoryPage(p: PageRouterType) {
    const {textConstant} = getTextConstant()
    return (
        <div className="profile-tab">
            <div className="profile-history">
                <div className="profile-history-title">
                    <MaterialLink className="profile-history-title-back" onClick={router.back}>
                        <LineArrowSvg className="profile-history-title-back-icon"/>
                    </MaterialLink>
                    {textConstant.helpHistory}
                </div>
                <ProfileHistoryItem title="تجهیز مدارس روستایی" date="1403/05/02" price="200,000 تومان"/>
                <ProfileHistoryItem title="کمک به تحصیل کودکان کار" date="1403/04/06" price="400,000 تومان"/>
                <ProfileHistoryItem title="کمک به تحصیل کودکان کار" date="1403/03/29" price="1,200,000 تومان"/>
            </div>
        </div>
    )
}

export default ProfileHistoryPage
