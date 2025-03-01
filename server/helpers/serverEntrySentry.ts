import * as Sentry from "@sentry/node"
import {Express} from "express"
import {ENV_CONSTANT} from "helpers/general/ENV_CONSTANT"

if (process.env.NODE_ENV === "production") {
    Sentry.init({
        environment: ENV_CONSTANT,
        dsn: "https://1ce8a727eedbc16ccdca2475f0e375f6@sentry.roya-negar.ir/5",
        // integrations: [
        //     nodeProfilingIntegration(),
        // ],
        tracesSampleRate: 1.0,
        profilesSampleRate: 1.0,
    })
}

export function setupExpressErrorHandler(app: Express) {
    if (process.env.NODE_ENV === "production") {
        Sentry.setupExpressErrorHandler(app)
    }
}