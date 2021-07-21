import {Review} from "../shared/model/Review";
import {appConstants} from "../shared/constants/appConstants";
import {AxiosResponse} from "axios";
import Pageable from "../shared/model/Pageable";

export const reviewReducer = (state: Pageable<Review> | null = null, action: ReviewAction) => {
    switch (action.type) {
        case appConstants.GET_REVIEWS:
            return action.payload.data;
        case appConstants.ADD_REVIEW:
            state?.content.push(action.review!);
            return state;
        case appConstants.EDIT_REVIEW:
            const review = state?.content.find(review => review.id === action.review?.id);
            if (review) {
                review.detail = action.review!.detail;
            }
            console.log(review);
            return state;
        default:
            return state;
    }
}

interface ReviewAction {
    type: string,
    payload: AxiosResponse<Pageable<Review>>
    review?: Review
}