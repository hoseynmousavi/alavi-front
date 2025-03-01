export interface UserType {
    id: string,
    first_name: string,
    last_name: string,
    phone_number: string
}

export interface AuthState {
    isLoading: boolean,
    user: null | UserType,
}

export interface SetUserActionType {
    type: "SET_USER",
    payload: {
        user: UserType
    }
}

export interface ResetDataActionType {
    type: "RESET_DATA",
    payload: {
        isAfterLogin: boolean
    }
}

export type AuthActionType =
    SetUserActionType |
    ResetDataActionType
