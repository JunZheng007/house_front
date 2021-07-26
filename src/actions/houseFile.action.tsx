import {appConstants} from "../shared/constants/appConstants";

export const addHousePhotos = (files: File[]) => {
    return {
        type: appConstants.ADD_HOUSE_PHOTOS,
        payload: files,
    }
}