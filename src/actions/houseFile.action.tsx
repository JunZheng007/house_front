import {appConstants} from "../shared/constants/appConstants";
import {HouseFile} from "../shared/model/HouseFile";

export const addHousePhotos = (files: File[]) => {
    console.log(files);
    return {
        type: appConstants.ADD_HOUSE_PHOTOS,
        payload: files,
    }
}

export const editHousePhotos = (houseFiles: HouseFile[] | null) => {
    return {
        type: appConstants.EDIT_HOUSE_PHOTOS,
        payload: houseFiles?.map(file => file.path)
    }
}

export const deletePhoto = (file: File) => {
    return {
        type: appConstants.DELETE_PHOTO,
        payload: [file]
    }
}