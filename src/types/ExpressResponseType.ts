import {Response} from "express"

export interface ExpressResponseType extends Response {
    sent?: boolean
}