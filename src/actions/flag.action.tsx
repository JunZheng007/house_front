import {appConstants} from "../shared/constants/appConstants";

export const setIsLogin = (isLogin: boolean) => {
    return {
        type: appConstants.SET_IS_LOGIN,
        payload: isLogin
    }
}

export const setIsLogout = (isLogout: boolean) => {
    return {
        type: appConstants.SET_IS_LOGOUT,
        payload: isLogout
    }
}