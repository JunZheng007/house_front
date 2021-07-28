import {appConstants} from "../shared/constants/appConstants";

export const houseFileReducer = (state: (File | string)[] | null = null, action: HouseFileAction) => {
    switch (action.type) {
        case appConstants.ADD_HOUSE_PHOTOS:
            return action.payload;
        case appConstants.EDIT_HOUSE_PHOTOS:
            return action.payload;
        case appConstants.CLEAN_HOUSE_PHOTOS:
            return [];
        case appConstants.DELETE_PHOTO:
            return state ? state.filter(file => file !== action.payload[0]) : [];
        default:
            return state;
    }
}

interface HouseFileAction {
    type: string,
    payload: File[]
}