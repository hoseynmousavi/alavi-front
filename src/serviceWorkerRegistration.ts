function registerSW() {
    if (process.env.NODE_ENV === "production" && window.location.hostname !== "localhost" && "serviceWorker" in navigator) {
        const publicUrl = new URL(process.env.PUBLIC_URL as string, window.location.href)
        if (publicUrl.origin !== window.location.origin) return
        window.addEventListener("load", function () {
            const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`
            navigator.serviceWorker.register(swUrl, {updateViaCache: "all"})
                .then(registration => {
                    registration.update()
                    registration.onupdatefound = () => {
                        const waitingServiceWorker = registration.waiting
                        if (waitingServiceWorker) {
                            waitingServiceWorker.postMessage({type: "SKIP_WAITING"})
                        }
                    }
                })
                .catch(error => console.log("Error during service worker registration:", error))
        }, {passive: true, once: true})
    }
}

export default registerSW