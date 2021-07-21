import {appConstants} from "../shared/constants/appConstants";
import {Flags} from "../shared/model/Flags";

const flags = {
    isLogin: false,
    isLogout: false
}

export const flagReducer = (state: Flags = flags, action: FlagAction) => {
    switch (action.type) {
        case appConstants.SET_IS_LOGIN:
            return {...state, isLogin: action.payload};
        case appConstants.SET_IS_LOGOUT:
            return {...state, isLogout: action.payload};
        default:
            return state;
    }
}

interface FlagAction {
    type: string,
    payload: boolean
}