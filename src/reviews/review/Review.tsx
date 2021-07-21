import React from "react";
import "./Review.scss"
import {Review as ReviewModel} from "../../shared/model/Review";
import {Avatar, Card, CardContent, Grid, Typography} from "@material-ui/core";

const Review = (props: ReviewPros) => {

    return (
        <Grid item className="review">
            <Card elevation={5} className="p-3 h-100">
                <div className="d-flex flex-row align-items-center">
                    <Avatar/>
                    <Typography className="m-3">
                        {props.review.user.username}
                    </Typography>
                </div>
                <CardContent>
                    {props.review.detail}
                </CardContent>
            </Card>
        </Grid>
    )
}

export default Review;

interface ReviewPros {
    review: ReviewModel
}