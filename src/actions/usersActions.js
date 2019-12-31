import {
    USER_LOGIN,
    USER_LOGOUT
} from "./types";

export const userLogin = (response) => {
    return (dispatch) => {
        dispatch({
            type: USER_LOGIN,
            payload: {
                token: response.data.token,
                user: response.data.user
            }
        })
    }
}

export const userLogout = (response) => {
    return (dispatch) => {
        dispatch({
            type: USER_LOGOUT,
        })
    }
}