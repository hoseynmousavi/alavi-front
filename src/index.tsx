import App from "App"
import ContextWrapper from "ContextWrapper"
import withRouter from "helpers/router/withRouter"
import {createRoot, hydrateRoot} from "react-dom/client"
import registerSW from "serviceWorkerRegistration"
import "styles/index.scss"

if (typeof window !== "undefined") {
    const WrappedApp = withRouter(App)
    if (document.body.style.display !== "none" && document.getElementById("server-ssr")) {
        hydrateRoot(
            document.getElementById("root") as HTMLElement,
            <ContextWrapper>
                <WrappedApp/>
            </ContextWrapper>,
        )
    }
    else {
        const root = createRoot(document.getElementById("root") as HTMLElement)
        root.render(
            <ContextWrapper>
                <WrappedApp/>
            </ContextWrapper>,
        )
        document.body.style.removeProperty("display")
    }

    registerSW()
}
