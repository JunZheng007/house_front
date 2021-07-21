import axios from "axios";
import {appConstants} from "../shared/constants/appConstants";
import {Review} from "../shared/model/Review";

export const getReviewsByHouseIdOfPage = (house_id: number, page: number) => {
    const getReviewsByHouseIdOfPagePromise = axios.get(`${process.env.REACT_APP_HOUSE_API}/reviews/${house_id}/${page}`);
    console.log(getReviewsByHouseIdOfPagePromise)
    return {
        type: appConstants.GET_REVIEWS,
        payload: getReviewsByHouseIdOfPagePromise
    };
}

export const getReviewsByUserIdOfPage = (page: number) => {
    const getReviewsByUserIdOfPagePromise = axios.get(`${process.env.REACT_APP_HOUSE_API}/reviews/user/${page}`);
    console.log(getReviewsByUserIdOfPagePromise)
    return {
        type: appConstants.GET_REVIEWS,
        payload: getReviewsByUserIdOfPagePromise
    };
}

export const addNewReview = (review: Review) => {
    const addNewReviewPromise = axios.post(`${process.env.REACT_APP_HOUSE_API}/reviews`, review);
    console.log(addNewReviewPromise)
    return {
        type: appConstants.ADD_REVIEW,
        payload: addNewReviewPromise,
        review: review
    };
}

export const editReview = (review: Review) => {
    const editReviewPromise = axios.put(`${process.env.REACT_APP_HOUSE_API}/reviews/${review.id}`, review);
    console.log(editReviewPromise)
    return {
        type: appConstants.EDIT_REVIEW,
        payload: editReviewPromise,
        review: review
    };
}

export const deleteReview = (review: Review) => {
    const deleteReviewPromise = axios.delete(`${process.env.REACT_APP_HOUSE_API}/reviews/${review.id}`);
    console.log(deleteReviewPromise)
    return {
        type: appConstants.DELETE_REVIEW,
        payload: deleteReviewPromise
    };
}