import {House} from "../shared/model/House";
import {appConstants} from "../shared/constants/appConstants";
import {AxiosResponse} from "axios";
import Pageable from "../shared/model/Pageable";

export const houseReducer = (state: Pageable<House> | null = null, action: HouseAction) => {
    switch (action.type) {
        case appConstants.GET_HOUSES:
            console.log(action.payload);
            return action.payload.data;
        case appConstants.UPDATE_HOUSE:
            const house = state?.content.find(house => house.id === action.house?.id);
            if (house) {
                house.rentStatus = action.house!.rentStatus
            }
            return state;
        case appConstants.DELETE_HOUSE:
            return state?.content.filter(info => info !== action.house);
        default:
            return state;
    }
}

interface HouseAction {
    type: string,
    payload: AxiosResponse<Pageable<House>>,
    house?: House
}