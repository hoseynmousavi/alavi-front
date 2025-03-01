const REGEX = {
    // eslint-disable-next-line no-control-regex
    EMAIL_REGEX: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/,
    PASSWORD_REGEX: /^[A-Za-z-\d\s(_@$!%*#?&)]{8,32}$/,
    PHONE_REGEX: /^09\d{9}$/,
    PERSIAN_REGEX: /^[\u0600-\u06FF\s]+$/,
    PERSIAN_CHARACTER_REGEX: /[\u0600-\u06FF]/,
    ENGLISH_REGEX: /^[a-zA-Z\s]+$/,
    ENGLISH_AND_NUMBERS_REGEX: /^[a-zA-Z0-9\s]+$/,
    URL_REGEX: new RegExp("(^|\\s)(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[A-Za-z0-9@]+([\\-.][A-Za-z0-9@]+)*\\.[A-Za-z]{2,10}(:[0-9]{1,5})?(\\/[^\\s]*)?"),
    EMOJI_REGEX: /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/,
}

export default REGEX