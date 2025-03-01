const FA_TEXT = {
    input: {
        phoneIsNotValid: "شماره موبایل وارد شده معتبر نمی‌باشد",
        emailIsNotValid: "ایمیل وارد شده معتبر نمی‌باشد",
        urlIsNotValid: "لینک وارد شده معتبر نمی‌باشد",
        nationalIsNotValid: "کدملی وارد شده معتبر نمی‌باشد",
        minLengthErr: (name: string, min: number) => `${name} باید حداقل شامل ${min} کاراکتر باشد.`,
    },
    login: "ورود",
    remainedToCode: "مانده تا دریافت مجدد کد",
    codeAgain: "دریافت مجدد کد",
    loginDesc: "ورود شما به معنای پذیرش شرایط بنیاد علوی و قوانین حریم خصوصی است",
    loginSignup: "ورود | ثبت‌نام",
    enterPhone: "سلام!\nلطفا شماره موبایل خود را وارد کنید",
    enterCode: "کد تایید را وارد کنید",
    codeSent: (phone: string) => `کد تایید برای شماره ${phone} پیامک شد`,
    projectChances: "فرصت‌های مهربانی",
    aboutUs: "درباره ما",
    contactUs: "ارتباط با ما",
}

export default FA_TEXT
