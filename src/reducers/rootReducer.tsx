import { combineReducers } from "redux";
import {houseReducer} from "./houseReducer";
import {rentInfoReducer} from "./rentInfoReducer";
import { reviewReducer } from "./reviewReducer";
import {userReducer} from "./userReducer";
import {flagReducer} from "./flagReducer";
import {editHouseReducer} from "./editHouseReducer";
import {houseDetailReducer} from "./houseDetailReducer";
import {houseFileReducer} from "./houseFileReducer";

export const rootReducer = combineReducers({
    house: houseDetailReducer,
    houses: houseReducer,
    rentInfos: rentInfoReducer,
    reviews: reviewReducer,
    user: userReducer,
    flags: flagReducer,
    editHouse: editHouseReducer,
    housePhotos: houseFileReducer,
})