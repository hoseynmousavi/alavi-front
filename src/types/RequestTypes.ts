import {RefObject} from "react"

interface RequestType {
    url: string,
    params?: Record<string, string | number | null | Array<string>>,
    cancelToken?: RefObject<AbortController | null>,
    dontToast?: boolean,
}

export interface RequestGetType extends RequestType {
    ignoreRedis?: boolean
}

export interface RequestDelType extends RequestType {

}

export interface RequestPostType extends RequestType {
    data?: object,
    headers?: Record<string, string>,
}

export interface RequestPatchType extends RequestType {
    data: object,
}

export interface RequestServerErrorType {
    status: number,
    data: { message?: string, error?: string, status?: string, detail?: string }
}

export interface RequestErrorType extends RequestServerErrorType {
    callback: (value: any) => any
}

export interface getByNetworkProps {
    reqUrl: string,
    dontToast?: boolean,
    cancelToken?: RefObject<AbortController | null>,
    expiredAt?: number
}
