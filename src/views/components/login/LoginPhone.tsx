import URLS from "constant/routing/URLS"
import getTextConstant from "helpers/general/getTextConstant"
import router from "helpers/router/router"
import {useState} from "react"
import {InputChangeOutputType} from "types/InputType"
import {PageRouterType} from "types/RouterType"
import Button from "views/components/button/Button"
import Input from "views/components/input/Input"

function LoginPhone({route}: PageRouterType) {
    const {textConstant} = getTextConstant()
    const [phone, setPhone] = useState("")
    const isDisable = !phone

    function onChange({value}: InputChangeOutputType) {
        setPhone(value)
    }

    function onSubmit() {
        router.pushState({url: URLS.loginContainer.routes.loginOtpLink(phone)})
    }

    return (
        <>
            <div className="login-box-title">{textConstant.loginSignup}</div>
            <div className="login-box-desc">{textConstant.enterPhone}</div>
            <Input onChange={onChange}
                   type="tel"
                   validation="phone"
                   showClear
                   autoComplete="off"
                   name="phone"
                   ltr
                   onSubmit={onSubmit}
            />
            <Button className="login-box-btn" desktopIsFullWidth isDisable={isDisable} onClick={onSubmit}>{textConstant.login}</Button>
            <div className="login-box-footer">{textConstant.loginDesc}</div>
        </>
    )
}

export default LoginPhone
