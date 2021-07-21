import {House} from "../model/House";
import {RentInfo} from "../model/RentInfo";
import {Review} from "../model/Review";
import {User} from "../model/User";
import {Flags} from "../model/Flags";
import Pageable from "../model/Pageable";

export const appConstants = {
    // routes
    userRoute: '/user',
    loginRoute: '/login',
    registrationRoute: '/registration',
    housesRoute: '',
    houseInfoRoute: '/house-detail',
    addHousesRoute: '/add-house',
    editHousesRoute: '/edit-house',

    // actions
    GET_HOUSES: 'GET_HOUSES',
    GET_HOUSE: 'GET_HOUSE',
    ADD_HOUSE: 'ADD_HOUSE',
    UPDATE_HOUSE: 'UPDATE_HOUSE',
    DELETE_HOUSE: 'DELETE_HOUSE',
    GET_RENT_INFOS: 'GET_RENT_INFOS',
    GET_RENT_INFO_BY_HOUSE_ID: 'GET_RENT_INFO_BY_HOUSE_ID',
    GET_RENT_INFO_BY_TENANT_ID: 'GET_RENT_INFO_BY_TENANT_ID',
    ADD_RENT_INFO: 'ADD_RENT_INFO',
    DELETE_RENT_INFO: 'DELETE_RENT_INFO',
    RENT_INFO_HAS_REVIEW: 'RENT_INFO_HAS_REVIEW',
    GET_REVIEWS: 'GET_REVIEWS',
    ADD_REVIEW: 'ADD_REVIEW',
    EDIT_REVIEW: 'EDIT_REVIEW',
    DELETE_REVIEW: 'DELETE_REVIEW',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    REGISTER: 'REGISTER',
    CHECK_LOGIN: 'CHECK_LOGIN',
    UPDATE_USER: 'UPDATE_USER',
    SET_IS_LOGIN: 'SET_IS_LOGIN',
    SET_IS_LOGOUT: 'SET_IS_LOGOUT',
    EDIT_HOUSE: 'EDIT_HOUSE',
    CLEAN_EDIT_HOUSE: 'CLEAN_EDIT_HOUSE'

}

export interface ReduxState {
    user: User,
    house: House,
    houses: Pageable<House>,
    rentInfos: RentInfo[],
    reviews: Pageable<Review>,
    flags: Flags,
    editHouse: House
}