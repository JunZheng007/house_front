import {User} from "../shared/model/User";
import {appConstants} from "../shared/constants/appConstants";
import {AxiosResponse} from "axios";

export const userReducer = (state: User | null = null, action: UserAction) => {
    switch (action.type) {
        case appConstants.LOGIN:
            if (action.payload.data?.id !== 0) {
                console.log(action.payload.data);
                return action.payload.data;
            }
            return null;
        case appConstants.REGISTER:
            if (action.payload.data?.id !== 0) {
                console.log(action.payload.data);
                return action.payload.data;
            }
            return null;
        case appConstants.CHECK_LOGIN:
            if (action.payload.data?.id !== 0) {
                console.log(action.payload.data);
                return action.payload.data;
            }
            return null;
        case appConstants.LOGOUT:
            return null;
        case appConstants.UPDATE_USER:
            return action.payload.data;
        default:
            return state;
    }
}

interface UserAction {
    type: string,
    payload: AxiosResponse<User>
}