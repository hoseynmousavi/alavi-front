import authActions from "context/auth/authActions"
import {authContext} from "context/auth/authProvider"
import getErrorMessage from "helpers/error/getErrorMessage"
import getTextConstant from "helpers/general/getTextConstant"
import toastManager from "helpers/theme/toastManager"
import {use, useEffect, useRef, useState} from "react"
import {InputChangeOutputType, InputImperativeRef} from "types/InputType"
import {PageRouterType} from "types/RouterType"
import Button from "views/components/button/Button"
import Input from "views/components/input/Input"

function LoginOtp({route: {params: {phone_number}}}: PageRouterType) {
    const {textConstant, toastConstant} = getTextConstant()
    const [remaining, setRemaining] = useState<number | null>(null)
    const [getLoading, setGetLoading] = useState<boolean>(true)
    const [submitLoading, setSubmitLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const intervalRef = useRef<ReturnType<typeof setInterval>>(null)
    const {authDispatch} = use(authContext)
    const inputRef = useRef<InputImperativeRef>({})

    useEffect(() => {
        getCode()
        // eslint-disable-next-line
    }, [])

    function getCode() {
        setRemaining(null)
        authActions.getOtpCode({data: {phone_number}})
            .then(({remaining, detail}) => {
                setRemaining(remaining)
                toastManager.addToast({message: detail, type: "INFO"})
                if (intervalRef.current) clearInterval(intervalRef.current)
                const start = new Date()
                intervalRef.current = setInterval(() => {
                    const remainSeconds = Math.floor(remaining + (+start - +new Date()) / 1000)
                    if (remainSeconds >= 0) {
                        setRemaining(remainSeconds)
                    }
                    else if (remainSeconds < 0) {
                        setRemaining(0)
                        if (intervalRef.current) clearInterval(intervalRef.current)
                    }
                }, 900)
            })
            .finally(() => {
                setGetLoading(false)
            })
    }

    function fixFormat(seconds: number) {
        return `${Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`
    }

    function onChange({value}: InputChangeOutputType) {
        setError("")

        if (value) {
            setSubmitLoading(true)
            authActions.login({data: {phone_number, code: value}, authDispatch})
                .catch((err) => {
                    setSubmitLoading(false)
                    if (err?.data && err?.status) {
                        setError(getErrorMessage(err))
                    }
                    else {
                        setError(toastConstant.networkError)
                    }
                })
        }
    }

    return (
        <>
            <>
                <div className="login-box-title">{textConstant.enterCode}</div>
                <div className="login-box-desc">{textConstant.codeSent(phone_number)}</div>
                <Input onChange={onChange}
                       className="login-box-code"
                       type="tel"
                       maxLength={6}
                       minLength={6}
                       showClear
                       autoComplete="off"
                       name="phone"
                       ltr
                       ref={inputRef}
                       focusOnMount
                       parentError={error}
                />
                <div className="login-box-timer" onClick={remaining === 0 ? getCode : undefined}>
                    {
                        remaining !== null ?
                            remaining === 0 ?
                                textConstant.codeAgain
                                :
                                <>
                                    <div>{fixFormat(remaining)}</div>
                                    <div>{textConstant.remainedToCode}</div>
                                </>
                            :
                            null
                    }
                </div>
                <Button isLoading={getLoading || submitLoading} className="login-box-btn" desktopIsFullWidth isDisable>{textConstant.login}</Button>
            </>
        </>
    )
}

export default LoginOtp
