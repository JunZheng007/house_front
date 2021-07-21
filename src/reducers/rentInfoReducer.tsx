import {appConstants} from "../shared/constants/appConstants";
import {AxiosResponse} from "axios";
import {RentInfo} from "../shared/model/RentInfo";

export const rentInfoReducer = (state: RentInfo[] | null = null, action: RentInfoAction) => {
    switch (action.type) {
        case appConstants.GET_RENT_INFOS:
            return action.payload?.data;
        case appConstants.GET_RENT_INFO_BY_HOUSE_ID:
            return action.payload?.data;
        case appConstants.GET_RENT_INFO_BY_TENANT_ID:
            return action.payload?.data;
        case appConstants.ADD_RENT_INFO:
            state?.push(action.rentInfo!);
            return state;
        case appConstants.DELETE_RENT_INFO:
            return state?.filter(info => info !== action.rentInfo);
        case appConstants.RENT_INFO_HAS_REVIEW:
            const rentInfo = state?.find(review => review.id === action.rentInfo?.id);
            if (rentInfo) {
                rentInfo.hasReview = true;
            }
            return state;
        default:
            return state;
    }
}

interface RentInfoAction {
    type: string,
    payload?: AxiosResponse<RentInfo[]>,
    rentInfo?: RentInfo
}