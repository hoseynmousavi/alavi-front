import {FocusEventHandler, KeyboardEventHandler, MouseEventHandler, RefObject} from "react"
import {ComponentAsPropsType} from "types/ComponentAsPropsType"

export interface InputImperativeRef {
    onChange?: ({value}: { value: string }) => void
    blur?: () => void
    focus?: () => void
}

export interface InputChangeInputType {
    target: { value: string },
    isDefaultValue?: boolean,
    isCalledByParent?: boolean
}

export interface InputChangeOutputType {
    value: string,
    hasError: boolean,
    name?: string,
    isDefaultValue: boolean,
    isCalledByParent: boolean
}

export interface InputType {
    className?: string,
    name?: string,
    label?: string,
    Icon?: ComponentAsPropsType,
    EndIcon?: ComponentAsPropsType,
    EndIconClassName?: string,
    onEndIconClick?: () => void,
    showClear?: boolean,
    validation?: "phone" | "email" | "url",
    ltr?: boolean,
    ltrFont?: boolean,
    ref?: RefObject<InputImperativeRef>,
    noSpaceForError?: boolean,
    defaultValue?: string | null,
    parentError?: string,
    parentSuccess?: string,
    onClick?: MouseEventHandler<HTMLInputElement>,
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>,
    onChange: (props: InputChangeOutputType) => void,
    focusOnMount?: boolean,
    onSubmit?: () => void,
    onSubmitDisable?: () => void,
    disableSubmit?: boolean,
    type?: "text" | "tel",
    isDisable?: boolean,
    disableChange?: boolean,
    minLength?: number,
    maxLength?: number,
    placeholder?: string,
    isSmall?: boolean,
    autoComplete?: "on" | "off",
    autoCapitalize?: "on" | "off" | "characters" | "words",
    onBlur?: () => void,
    onFocus?: FocusEventHandler<HTMLInputElement>,
    dataTestId?: string
}
