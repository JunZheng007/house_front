import {appConstants} from "../shared/constants/appConstants";
import {House} from "../shared/model/House";

export const editHouseReducer = (state: House | null = null, action: editHouseAction) => {
    switch (action.type) {
        case appConstants.EDIT_HOUSE:
            return action.payload;
        case appConstants.CLEAN_EDIT_HOUSE:
            return null;
        default:
            return state;
    }
}

interface editHouseAction {
    type: string,
    payload: House
}