import URLS from "constant/routing/URLS"
import {createClient} from "redis"
import addRoutes from "./helpers/addRoutes"
import createMockRedis from "./helpers/createMockRedis"
import sendCsrHtml from "./helpers/sendCsrHtml"
import {setupExpressErrorHandler} from "./helpers/serverEntrySentry"
import serverExpressExposer from "./helpers/serverExpressExposer"
import redirectTrailingSlash from "./middlewares/redirectTrailingSlash"
import fileRouter from "./routers/fileRouter"
import liveNessRouter from "./routers/liveNessRouter"

const app = serverExpressExposer()()

liveNessRouter(app)

// file routers
fileRouter(app) // maybe file, maybe ignore

// check trailing slash
app.use(redirectTrailingSlash())

const SSR_ROUTES = {}

addRoutes({app, SSR_ROUTES, routeContainer: URLS})

app.route("*")
    .get((req, res) => sendCsrHtml({req, res, status: 404}))

if (process.env.IS_UAT) {
    // @ts-ignore
    global.redisClient = createMockRedis()
    console.log("mock redis created")
}
else if (process.env.REDIS_URL && process.env.REDIS_DB) {
    global.redisClient = createClient({
        url: process.env.REDIS_URL,
        password: process.env.REDIS_PASSWORD,
        database: +process.env.REDIS_DB,
    })
    global.redisClient.on("error", err => console.error("redis client Error", err))
    global.redisClient.connect()
        .then(() => console.log("connected to redis successfully!"))
        .catch((err: any) => console.error("connect to redis failed: ", err))
}

setupExpressErrorHandler(app)

app.listen(
    process.env.REACT_APP_SSR_PORT,
    () => console.log(`server is running on port ${process.env.REACT_APP_SSR_PORT}`),
)
