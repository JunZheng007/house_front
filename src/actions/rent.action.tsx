import axios from "axios";
import {appConstants} from "../shared/constants/appConstants";
import {RentInfo} from "../shared/model/RentInfo";

export const getRentInfos = () => {
    const getRentInfosPromise = axios.get(`${process.env.REACT_APP_HOUSE_API}/rent-infos`);
    console.log(getRentInfosPromise);
    return {
        type: appConstants.GET_RENT_INFOS,
        payload: getRentInfosPromise
    };
}

export const getRentInfoByHouseId = (houseId: number) => {
    const getRentInfoByHouseIdPromise = axios.get(`${process.env.REACT_APP_HOUSE_API}/rent-infos/house/${houseId}`);
    console.log(getRentInfoByHouseIdPromise);
    return {
        type: appConstants.GET_RENT_INFO_BY_HOUSE_ID,
        payload: getRentInfoByHouseIdPromise
    }
}

export const getRentInfoByTenantIdOfPage = (tenantId: number, page: number) => {
    const getRentInfoByTenantIdPromise = axios.get(`${process.env.REACT_APP_HOUSE_API}/rent-infos/tenant/${tenantId}/${page}`);
    console.log(getRentInfoByTenantIdPromise);
    return {
        type: appConstants.GET_RENT_INFO_BY_TENANT_ID,
        payload: getRentInfoByTenantIdPromise
    }
}

export const addRentInfo = (rentInfo: RentInfo) => {
    const addRentInfoPromise = axios.post(`${process.env.REACT_APP_HOUSE_API}/rent-infos`, rentInfo)
    console.log(addRentInfoPromise)
    return {
        type: appConstants.ADD_RENT_INFO,
        payload: addRentInfoPromise,
        rentInfo: rentInfo
    };
}

export const deleteRentInfo = (rentInfo: RentInfo) => {
    const deleteRentInfoPromise = axios.delete(`${process.env.REACT_APP_HOUSE_API}/rent-infos/${rentInfo.id}`,)
    console.log(deleteRentInfoPromise)
    return {
        type: appConstants.DELETE_RENT_INFO,
        payload: deleteRentInfoPromise,
        rentInfo: rentInfo
    };
}

export const hasReview = (rentInfo: RentInfo) => {
    console.log(rentInfo);
    return {
        type: appConstants.RENT_INFO_HAS_REVIEW,
        rentInfo: {
            ...rentInfo,
            hasReview: true
        }
    };
}