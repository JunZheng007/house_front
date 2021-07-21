import React, {ChangeEvent, useEffect, useState} from "react";
import "./Reviews.scss"
import {Typography} from "@material-ui/core";
import Review from "./review/Review";
import {User} from "../../shared/model/User";
import {useSelector} from "react-redux";
import {ReduxState} from "../../shared/constants/appConstants";
import Pagination from "@material-ui/lab/Pagination";

const Reviews = (props: ReviewsProps) => {
    const reviews = useSelector(({reviews}: ReduxState) => reviews);
    const [reviewsToShow, setReviewsToShow] = useState(reviews.content.slice(0, 2));

    useEffect(() => {
        reviews.content
            .sort((review1, review2) => {
                const date1 = Date.parse(review1.postTime.toString());
                const date2 = Date.parse(review2.postTime.toString());
                return date2 - date1;
            })
    }, [reviews])

    const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
        setReviewsToShow(reviews.content.slice((page - 1) * 2, page * 2));
    }

    return (
        <div className="user-reviews d-flex flex-column align-items-center">
            {
                reviews?.numberOfElements > 0 ?
                    reviewsToShow
                        .map(review => <Review review={review} key={review.id}/>) :
                    <Typography className="text-center">
                        {
                            props.user.type === 'owner' ?
                                'You did not receive any review yet.' :
                                'You did not rent any house yet.'
                        }
                    </Typography>
            }
            <Pagination
                className="m-3"
                count={reviews?.totalPages}
                color="primary"
                showFirstButton
                showLastButton
                onChange={handleChangePage}
            />
        </div>
    )
}

export default Reviews;

interface ReviewsProps {
    className: string,
    user: User,
}