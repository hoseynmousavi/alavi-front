import ENVS from "constant/general/ENVS"
import {ENV_CONSTANT} from "helpers/general/ENV_CONSTANT"

const domain = {
    [ENVS.PRODUCTION]: "",
}

const api_server = {
    [ENVS.PRODUCTION]: "http://185.222.163.102:8080",
}

export const DOMAIN_URL = domain[ENV_CONSTANT]
export const SERVER_URL = api_server[ENV_CONSTANT]
