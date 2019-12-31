import {
    USER_LOGIN,
    USER_LOGOUT
} from "../actions/types";

const initialState = {
    user: {},
    token: {}
}

const userReducers = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN:
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user_id", action.payload.user._id);
            localStorage.setItem("user_name", action.payload.user.username);
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token
            }
        case USER_LOGOUT:
            localStorage.clear();
            return {
                ...state,
                user: {},
                jwtToken: ""
            }
        default:
            return state;
    }
}

export default userReducers;