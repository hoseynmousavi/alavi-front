import REGEX from "constant/general/REGEX"
import {RequestServerErrorType} from "types/RequestTypes"

function getErrorMessage({data, status: resStatus}: RequestServerErrorType) {
    const {message, error, status, detail} = data || {}
    const showMessage = message?.toString?.() ?? ""
    const showError = error?.toString?.() ?? ""
    const showStatus = status?.toString?.() ?? ""
    const showDetail = detail?.toString?.() ?? ""

    let msg
    if (showMessage && REGEX.PERSIAN_CHARACTER_REGEX.test(showMessage)) msg = showMessage
    else if (showError && REGEX.PERSIAN_CHARACTER_REGEX.test(showError)) msg = showError
    else if (showStatus && REGEX.PERSIAN_CHARACTER_REGEX.test(showStatus)) msg = showStatus
    else if (showDetail && REGEX.PERSIAN_CHARACTER_REGEX.test(showDetail)) msg = showDetail
    else if (showMessage) msg = showMessage
    else if (showError) msg = showError
    else if (showStatus && REGEX.PERSIAN_CHARACTER_REGEX.test(showStatus)) msg = showStatus
    else if (showDetail) msg = showDetail

    return (
        msg
        ||
        {
            500: "مشکلی در زیرساختمون داریم (500)، لطفا مجدداً تلاش کنید.",
            501: "مشکلی در زیرساختمون داریم (501)، لطفا مجدداً تلاش کنید.",
            502: "مشکلی در زیرساختمون داریم (502)، لطفا مجدداً تلاش کنید.",
            503: "مشکلی در زیرساختمون داریم (503)، لطفا مجدداً تلاش کنید.",
            504: "مشکلی در زیرساختمون داریم (504)، لطفا مجدداً تلاش کنید.",
            400: "مشکلی در درخواست شما وجود دارد (400)، لطفا مجدداً تلاش کنید.",
        }[resStatus || 0]
        ||
        "خطایی رخ داد؛ مجدداً تلاش کنید."
    )
}

export default getErrorMessage