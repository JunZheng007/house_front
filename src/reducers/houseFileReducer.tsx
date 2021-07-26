import {appConstants} from "../shared/constants/appConstants";

export const houseFileReducer = (state: File[] | null = null, action: HouseFileAction) => {
    switch (action.type) {
        case appConstants.ADD_HOUSE_PHOTOS:
            console.log(action.payload);
            return action.payload;

        default:
            return state;
    }
}

interface HouseFileAction {
    type: string,
    payload: File[]
}