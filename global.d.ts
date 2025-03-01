import {CategoryState} from "context/category/CategoryType"
import {ScreenStateType} from "context/screen/ScreenType"
import {Dispatch, SetStateAction} from "react"
import {RedisClientType} from "redis"
import {DataShareProps} from "request/dataShareManager"
import {RefreshTokenProps} from "request/refreshTokenManager"
import {AlertModalType} from "types/AlertModalType"

declare global {
    interface Window {
        categoryState?: CategoryState,
        screenState?: ScreenStateType,
        screenSetState?: Dispatch<SetStateAction<ScreenStateType>>,
        memoryHistoryStack: Array<{ id: null | string, location: string }>
        sessionHistoryStack: Array<{ id: null | string, location: string }>
        openAlertModal: (props: Omit<AlertModalType, "close">) => void,
        refreshToken: (props: RefreshTokenProps) => void,
        dataShare: (props: DataShareProps) => void,
        tokenRefreshed: () => void,
        routerPushState: ({id: string, data: string}, arg: string, url: string) => void,
        routerReplaceState: ({id: string, data: string}, arg: string, url: string) => void,
        serverData?: { [key: string]: any },
        pushBarColor?: ({barColor: string}) => void
        popBarColor?: () => void
        resetData?: (props: { isAfterLogin: boolean }) => void,
        refreshTokenTimer?: ReturnType<typeof setTimeout>,
        authChannel?: BroadcastChannel,
        svgs?: Record<string, number>,
    }

    namespace globalThis {
        var redisClient: RedisClientType
    }
}
