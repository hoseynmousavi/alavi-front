import {ComponentAsPropsType} from "types/ComponentAsPropsType"

interface ShowValidationProps {
    text?: string,
    isError?: boolean,
    noSpace?: boolean,
    Icon?: ComponentAsPropsType
}

function ShowValidation(props: ShowValidationProps) {
    const {text, isError, noSpace, Icon} = props
    return (
        <div className={`validation-err ${noSpace ? "no-space" : ""} ${isError ? "error" : "success"} ${text ? "show" : ""}`}>
            {Icon && text && <Icon className="validation-err-icon"/>}
            {text}
        </div>
    )
}

export default ShowValidation