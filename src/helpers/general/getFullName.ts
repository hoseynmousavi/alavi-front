import getTextConstant from "helpers/general/getTextConstant"

interface GetFullNameProps {
    firstName?: string,
    lastName?: string
}

function getFullName(props: GetFullNameProps): string {
    const {firstName, lastName} = props
    const {textConstant} = getTextConstant()

    if (!firstName && !lastName) {
        return textConstant.user
    }
    else {
        return (
            (firstName ? firstName : "")
            +
            (firstName && lastName ? " " : "")
            +
            (lastName ? lastName : "")
        )
    }
}

export default getFullName
