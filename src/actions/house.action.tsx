import axios from "axios";
import {appConstants} from "../shared/constants/appConstants";
import {House} from "../shared/model/House";

export const getHousesOfPage = (page: number) => {
    const getHousesPromise = axios.get(`${process.env.REACT_APP_HOUSE_API}/houses/page/${page}`);
    console.log(getHousesPromise);
    return {
        type: appConstants.GET_HOUSES,
        payload: getHousesPromise
    };

}

export const getHousesByOwnerIdOfPage = (ownerId: number, page: number) => {
    const getHousesByOwnerIdPromise = axios.get(`${process.env.REACT_APP_HOUSE_API}/houses/owner/${ownerId}/${page}`);
    console.log(getHousesByOwnerIdPromise);
    return {
        type: appConstants.GET_HOUSES,
        payload: getHousesByOwnerIdPromise
    }
}

export const getHouseById = (id: number) => {
    const getHouseByIdPromise = axios.get(`${process.env.REACT_APP_HOUSE_API}/houses/${id}`);
    console.log(getHouseByIdPromise);
    return {
        type: appConstants.GET_HOUSE,
        payload: getHouseByIdPromise
    }
}

export const addNewHouse = (house: House) => {
    const addNewHousePromise = axios.post(`${process.env.REACT_APP_HOUSE_API}/houses`, house);
    console.log(addNewHousePromise);
    return {
        type: appConstants.ADD_HOUSE,
        payload: addNewHousePromise,
        house: house
    }
}

export const updateHouse = (house: House) => {
    const updateHousePromise = axios.put(`${process.env.REACT_APP_HOUSE_API}/houses`, house);
    console.log(updateHousePromise);
    return {
        type: appConstants.UPDATE_HOUSE,
        payload: updateHousePromise,
        house: house
    }
}

export const deleteHouse = (house: House) => {
    const deleteHousePromise = axios.delete(`${process.env.REACT_APP_HOUSE_API}/houses/${house.id}`);
    console.log(deleteHousePromise);
    return {
        type: appConstants.DELETE_HOUSE,
        payload: deleteHousePromise
    }
}

export const uploadHousePhotos = (house: House, files: File[]) => {
    const fileFormData = new FormData();
    for (let i = 0; i < files.length; i++) {
        fileFormData.append("files", files[i]);
    }
    const uploadPhotoPromise = axios.post(
        `${process.env.REACT_APP_HOUSE_API}/houses/${house.id}/photos`,
        fileFormData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    console.log(uploadPhotoPromise);
    return {
        type: appConstants.UPDATE_USER,
        payload: uploadPhotoPromise
    }
}