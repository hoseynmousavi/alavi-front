import createQueryString from "helpers/query-param/createQueryString"

export interface UrlType {
    entry: string,
    routes: {
        [key: string]: string | Function | UrlType
    }
}

export interface UrlsType {
    [key: string]: UrlType
}

const URLS = {
    mainContainer: { // order is important, please keep sync with mainPageContainer.js
        entry: "*",
        routes: {
            profile: {
                entry: "/profile/:section",
                routes: {
                    profileAccount: "/profile/account",
                    profileHistory: "/profile/history",
                },
            },

            profileMobile: "/profile",

            projects: "/projects",
            projectsLink: (categoryId: number | null) => `/projects${createQueryString({params: {categoryId}})}`,

            pdpLink: (id: string) => `/pdp/${id}`,
            pdp: "/pdp/:id",

            home: "/",
        },
    },
    loginContainer: {
        entry: "/login",
        routes: {
            loginOtpLink: (phone_number: string) => `/login/${phone_number}`,
            loginOtp: "/login/:phone_number",
            loginPhone: "/login",
        },
    },
}

export default URLS
