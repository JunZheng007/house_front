import axios, {AxiosResponse} from "axios";
import qs from "qs";
import {appConstants} from "../shared/constants/appConstants";
import {User} from "../shared/model/User";

axios.defaults.withCredentials = true

export const login = (user: User, succeed: (res: User) => void, fail: () => void) => {
    const userFormData = qs.stringify(user);
    const loginPromise = axios.post(`${process.env.REACT_APP_HOUSE_API}/login`, userFormData, {headers: {"Control-Allow-Credentials": true}});
    loginPromise
        .then((res: AxiosResponse<{ type: string }>) => {
            console.log(res);
            res.data.type === null ? fail() : succeed(res.data as User);
        })
        .catch();

    console.log(loginPromise);
    return {
        type: appConstants.LOGIN,
        payload: loginPromise
    };

}

export const register = (user: User, succeed: (res: User) => void, fail: () => void) => {
    const registerPromise = axios.post(`${process.env.REACT_APP_HOUSE_API}/user`, user);
    registerPromise
        .then((res: AxiosResponse<User>) => {
            console.log(res.data.type);
            res.data.type === "registered" ? fail() : succeed(res.data as User);
        })
        .catch();
    console.log(registerPromise);
    return {
        type: appConstants.REGISTER,
        payload: registerPromise
    }
}

export const checkLogin = () => {
    const checkLoginPromise = axios.get(`${process.env.REACT_APP_HOUSE_API}/check-login`);
    console.log(checkLoginPromise);
    return {
        type: appConstants.CHECK_LOGIN,
        payload: checkLoginPromise
    }
}

export const logout = () => {
    const checkLogoutPromise = axios.get(`${process.env.REACT_APP_HOUSE_API}/logout`);
    console.log(checkLogoutPromise);
    return {
        type: appConstants.LOGOUT,
        payload: checkLogoutPromise
    }
}

export const uploadPhoto = (file: File) => {
    const fileFormData = new FormData();
    fileFormData.append('file', file);
    const uploadPhotoPromise = axios.post(
        `${process.env.REACT_APP_HOUSE_API}/user/photo`,
        fileFormData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    console.log(uploadPhotoPromise);
    return {
        type: appConstants.UPDATE_USER,
        payload: uploadPhotoPromise
    }
}