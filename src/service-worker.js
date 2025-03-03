/* eslint-disable no-restricted-globals */
// See https://developers.google.com/web/tools/workbox/modules

import {clientsClaim} from "workbox-core"
import {ExpirationPlugin} from "workbox-expiration"
import {createHandlerBoundToURL, precacheAndRoute} from "workbox-precaching"
import {registerRoute, Route} from "workbox-routing"
import {CacheFirst, NetworkFirst} from "workbox-strategies"

clientsClaim()

const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$")

registerRoute(
    new Route(
        ({request, sameOrigin}) => sameOrigin && request.destination === "document",
        new NetworkFirst({
            cacheName: "documents",
            plugins: [new ExpirationPlugin({maxEntries: 200})],
        }),
    ),
)

precacheAndRoute(self.__WB_MANIFEST)

registerRoute(
    ({request, url}) => {
        if (request.mode !== "navigate") return false
        else if (url.pathname.startsWith("/_")) return false
        else return !url.pathname.match(fileExtensionRegexp)
    },
    createHandlerBoundToURL(process.env.PUBLIC_URL + "/index.html"),
)

registerRoute(
    new Route(
        ({request, url}) => request.destination === "image" && url.pathname.endsWith("tooltip.png"),
        new CacheFirst({
            cacheName: "tooltips",
            plugins: [new ExpirationPlugin({maxEntries: 4})],
        }),
    ),
)

registerRoute(
    new Route(
        ({request}) => request.destination === "image",
        new CacheFirst({
            cacheName: "images",
            plugins: [new ExpirationPlugin({maxEntries: 400})],
        }),
    ),
)

registerRoute(
    new Route(
        ({request}) => request.destination === "font",
        new CacheFirst({
            cacheName: "fonts",
            plugins: [new ExpirationPlugin({maxEntries: 5})],
        }),
    ),
)

self.addEventListener("message", event => event.data && event.data.type === "SKIP_WAITING" && self.skipWaiting())

self.addEventListener("install", event => {
    event.waitUntil(
        caches.keys()
            .then(cacheNames => Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)))),
    )
    self.skipWaiting()
})
