import REGEX from "constant/general/REGEX"
import getTextConstant from "helpers/general/getTextConstant"
import focusOnInput from "helpers/input/focusOnInput"
import numberCorrection from "helpers/input/numberCorrection"
import onInputKeyDown from "helpers/input/onInputKeyDown"
import getIsMobile from "helpers/theme/getIsMobile"
import CircleDangerSvg from "media/svg/CircleDangerSvg"
import CloseSvg from "media/svg/CloseSvg"
import {MouseEvent, useEffect, useImperativeHandle, useRef, useState} from "react"
import {InputChangeInputType, InputType} from "types/InputType"
import ShowValidation from "views/components/input/ShowValidation"
import MaterialLink from "views/components/material/MaterialLink"

function Input(props: InputType) {
    const {
        className = "",
        name,
        label,
        Icon,
        EndIcon,
        EndIconClassName = "",
        onEndIconClick,
        showClear,
        validation,
        ltr,
        ltrFont,
        ref,
        noSpaceForError,
        defaultValue,
        parentError,
        parentSuccess,
        onClick,
        onKeyDown,
        onChange,
        focusOnMount,
        onSubmit,
        onSubmitDisable,
        disableSubmit,
        type = "text",
        isDisable,
        disableChange,
        minLength,
        maxLength,
        placeholder = " ",
        isSmall,
        autoComplete = "off",
        autoCapitalize = "off",
        onBlur,
        onFocus,
        dataTestId,
    } = props
    const inputRef = useRef<HTMLInputElement>(null)
    const errorTimer = useRef<ReturnType<typeof setTimeout>>(null)
    const [error, setError] = useState<string | undefined>(undefined)
    const [value, setValue] = useState<string>("")
    const {textConstant} = getTextConstant()
    const showError = parentError || error
    const showSuccess = parentSuccess

    useImperativeHandle(ref, () => ({
        onChange: ({value}: { value: string }) => onInputChange({target: {value}, isDefaultValue: false, isCalledByParent: true}),
        focus: () => inputRef.current?.focus?.(),
        blur: () => inputRef.current?.blur?.(),
        // eslint-disable-next-line
    }), [])

    useEffect(() => {
        if (defaultValue) {
            onInputChange({target: {value: defaultValue}, isDefaultValue: true, isCalledByParent: false})
        }

        const isMobile = getIsMobile()
        if (focusOnMount && !isMobile) {
            setTimeout(() => focusOnInput({ref: inputRef}), 400)
        }

        return () => {
            if (errorTimer.current) {
                clearTimeout(errorTimer.current)
            }
        }
        // eslint-disable-next-line
    }, [])

    function checkError() {
        if (errorTimer.current) clearTimeout(errorTimer.current)
        const value = inputRef.current?.value
        if (value) {
            if (validation) {
                switch (validation) {
                    case "phone": {
                        const phone = value.startsWith("0") ? value : "0" + value
                        if (!REGEX.PHONE_REGEX.test(phone)) setError(textConstant.input.phoneIsNotValid)
                        break
                    }
                    case "url": {
                        if (!REGEX.URL_REGEX.test(value)) setError(textConstant.input.urlIsNotValid)
                        break
                    }
                    case "email": {
                        if (!REGEX.EMAIL_REGEX.test(value)) setError(textConstant.input.emailIsNotValid)
                        break
                    }
                    default: {
                        break
                    }
                }
            }
            else if (minLength) {
                if (value.length < minLength) {
                    if (label) setError(textConstant.input.minLengthErr(label, minLength))
                }
            }
        }
    }

    function onInputChange({target: {value}, isDefaultValue, isCalledByParent}: InputChangeInputType) {
        setError(undefined)
        if (validation) {
            switch (validation) {
                case "phone": {
                    const tempValue = numberCorrection(value.replace(/ /g, "").replace(/\./g, "")).slice(0, 11)
                    if (!isNaN(+tempValue)) {
                        setValue(tempValue)
                        const phone = tempValue.startsWith("0") ? tempValue : "0" + tempValue
                        const checkedValue = REGEX.PHONE_REGEX.test(phone) ? phone : ""
                        onChange({
                            name,
                            value: checkedValue,
                            isDefaultValue: !!isDefaultValue,
                            isCalledByParent: !!isCalledByParent,
                            hasError: !checkedValue && !!checkedValue.length,
                        })
                    }
                    break
                }
                case "url": {
                    const tempValue = numberCorrection(value.replace(/ /g, ""))
                    setValue(tempValue)
                    const checkedValue = REGEX.URL_REGEX.test(tempValue) ? tempValue : ""
                    onChange({
                        name,
                        value: checkedValue,
                        isDefaultValue: !!isDefaultValue,
                        isCalledByParent: !!isCalledByParent,
                        hasError: !checkedValue && !!checkedValue.length,
                    })
                    break
                }
                case "email": {
                    const tempValue = numberCorrection(value.replace(/ /g, "").toLowerCase())
                    setValue(tempValue)
                    const checkedValue = REGEX.EMAIL_REGEX.test(tempValue) ? tempValue : ""
                    onChange({
                        name,
                        value: checkedValue,
                        isDefaultValue: !!isDefaultValue,
                        isCalledByParent: !!isCalledByParent,
                        hasError: !checkedValue && !!checkedValue.length,
                    })
                    break
                }
                default: {
                    break
                }
            }
        }
        else {
            const tempValue = numberCorrection(maxLength ? value.slice(0, maxLength) : value)
            setValue(tempValue)
            const checkedValue = (!minLength || tempValue.trim().length >= minLength) ? tempValue.trim() : ""
            onChange({
                name,
                value: checkedValue,
                isDefaultValue: !!isDefaultValue,
                isCalledByParent: !!isCalledByParent,
                hasError: !checkedValue && !!checkedValue.length,
            })
        }

        if (errorTimer.current) clearTimeout(errorTimer.current)
        errorTimer.current = setTimeout(checkError, 1500)
    }

    function _onBlur() {
        onBlur?.()
        checkError()
    }

    function onEndElClick(e: MouseEvent) {
        e.preventDefault()
        e.stopPropagation()
        if (showClearEl) {
            onInputChange({target: {value: ""}})
            focusOnInput({ref: inputRef})
        }
        else {
            onEndIconClick?.()
        }
    }

    const showClearEl = !!showClear && !!value
    const showEndIcon = !!EndIcon && !showClearEl
    const showEndEl = showClearEl || showEndIcon

    return (
        <>
            <label className={`input-label ${isDisable ? "is-disable" : ""} ${isSmall ? "small" : ""} ${className}`}>
                <MaterialLink isDiv className={`input-label-end ${showEndEl ? "" : "hide"} ${Icon ? "have-icon" : ""} ${ltr ? "ltr" : ""}`} onClick={onEndElClick}>
                    {
                        showEndIcon ?
                            <EndIcon className={`input-label-end-icon ${EndIconClassName}`}/>
                            :
                            <CloseSvg className="input-label-end-icon"/>
                    }
                </MaterialLink>

                <input className={`input-field ${!label ? "empty-label" : ""} ${showSuccess ? "success" : ""} ${showError ? "error" : ""} ${ltr ? "ltr" : ""} ${ltrFont ? "ltr-font" : ""} ${Icon ? "have-icon" : ""} ${showEndEl ? "have-end-el" : ""}`}
                       name={name}
                       placeholder={placeholder}
                       value={value}
                       onChange={onInputChange}
                       onBlur={_onBlur}
                       onFocus={onFocus}
                       ref={inputRef}
                       onKeyDown={onKeyDown ? onKeyDown : onInputKeyDown({onSubmit, onSubmitDisable, checkError, disableSubmit})}
                       type={type}
                       disabled={isDisable || disableChange}
                       onClick={onClick}
                       autoComplete={autoComplete}
                       autoCapitalize={autoCapitalize}
                       data-testid={dataTestId}
                />
                <div className="input-icons">
                    {
                        Icon &&
                        <Icon className={`input-label-icon ${showSuccess ? "success" : ""} ${showError ? "error" : ""}`}/>
                    }
                    {
                        label &&
                        <div className={`input-label-title ${showSuccess ? "success" : ""} ${showError ? "error" : ""} ${Icon ? "have-icon" : ""}`}>
                            <div className="input-label-title-inner">{label}</div>
                        </div>
                    }
                </div>
                <ShowValidation isError={true} text={showError} noSpace={noSpaceForError} Icon={CircleDangerSvg}/>
                <ShowValidation isError={false} text={showSuccess} noSpace={noSpaceForError}/>
            </label>
        </>
    )
}

export default Input
