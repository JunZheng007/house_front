import {appConstants} from "../shared/constants/appConstants";
import {HouseFile} from "../shared/model/HouseFile";

export const addHousePhotos = (files: File[]) => {
    return {
        type: appConstants.ADD_HOUSE_PHOTOS,
        payload: files,
    }
}

export const editHousePhotos = (houseFiles: HouseFile[] | null) => {
    return {
        type: appConstants.EDIT_HOUSE_PHOTOS,
        payload: houseFiles
    }
}