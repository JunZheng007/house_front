import {appConstants} from "../shared/constants/appConstants";
import {AxiosResponse} from "axios";
import {RentInfo} from "../shared/model/RentInfo";
import Pageable from "../shared/model/Pageable";

export const rentInfoReducer = (state: Pageable<RentInfo> | null = null, action: RentInfoAction) => {
    switch (action.type) {
        case appConstants.GET_RENT_INFOS:
            return action.payload?.data;
        case appConstants.GET_RENT_INFO_BY_HOUSE_ID:
            return action.payload?.data;
        case appConstants.GET_RENT_INFO_BY_TENANT_ID:
            return action.payload?.data;
        case appConstants.DELETE_RENT_INFO:
            return state?.content.filter(info => info !== action.rentInfo);
        case appConstants.RENT_INFO_HAS_REVIEW:
            const rentInfo = state?.content.find(info => info.id === action.rentInfo?.id);
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
    payload?: AxiosResponse<Pageable<RentInfo>>,
    rentInfo?: RentInfo
}