import {UserType} from "context/auth/AuthType"
import useUser from "context/auth/hooks/useUser"
import useScreen from "context/screen/hooks/useScreen"
import getFullName from "helpers/general/getFullName"
import getTextConstant from "helpers/general/getTextConstant"
import AvatarColoredSvg from "media/svg/AvatarColoredSvg"
import {useState} from "react"
import {InputChangeOutputType} from "types/InputType"
import {PageRouterType} from "types/RouterType"
import Button from "views/components/button/Button"
import Input from "views/components/input/Input"

function ProfileAccountPage(props: PageRouterType) {
    const {user, updateUser} = useUser<UserType>()
    const {first_name, last_name, phone_number} = user || {}
    const fullName = getFullName({firstName: first_name, lastName: last_name})
    const {textConstant, toastConstant} = getTextConstant()
    const [submitLoading, setSubmitLoading] = useState(false)
    const [values, setValues] = useState({first_name, last_name})
    const {isMobile} = useScreen()

    function onChange({name, value}: InputChangeOutputType) {
        setValues(values => ({...values, [name as keyof typeof values]: value}))
    }

    function onSubmit() {
        setSubmitLoading(true)
        updateUser({data: values, toastType: "SUCCESS", toastMessage: toastConstant.profileUpdated})
            .finally(() => setSubmitLoading(false))
    }

    return (
        <div className="profile-tab">
            <div className="profile-account">
                <AvatarColoredSvg className="profile-account-avatar"/>
                <div className="profile-account-name">{fullName}</div>
                <div className="profile-account-phone">{phone_number}</div>
                <div className="profile-account-form">
                    <Input className="profile-account-form-item"
                           defaultValue={first_name}
                           onChange={onChange}
                           name="first_name"
                           showClear
                           maxLength={50}
                           label={textConstant.name}
                           isDisable={submitLoading}
                           onSubmit={onSubmit}
                    />
                    <Input className="profile-account-form-item"
                           defaultValue={last_name}
                           onChange={onChange}
                           name="last_name"
                           showClear
                           maxLength={50}
                           label={textConstant.lastName}
                           isDisable={submitLoading}
                           onSubmit={onSubmit}
                    />
                    {
                        isMobile &&
                        <Button mobileIsFullWidth isLoading={submitLoading} onClick={onSubmit}>{textConstant.submit}</Button>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfileAccountPage
