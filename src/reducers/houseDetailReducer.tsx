import {House} from "../shared/model/House";
import {AxiosResponse} from "axios";
import {appConstants} from "../shared/constants/appConstants";

export const houseDetailReducer  = (state: House | null = null, action: HouseDetailAction) => {
    switch (action.type) {
        case appConstants.GET_HOUSE:
            console.log(action.payload);
            return action.payload.data;
        default:
            return state;
    }
}

interface HouseDetailAction {
    type: string,
    payload: AxiosResponse<House>
}