import React, {ChangeEvent} from "react";
import "./Reviews.scss";
import {connect} from "react-redux";
import {Review as ReviewModel} from "../shared/model/Review";
import {getReviewsByHouseIdOfPage} from "../actions/review.action";
import Review from "./review/Review";
import {Grid} from "@material-ui/core";
import Pageable from "../shared/model/Pageable";
import Pagination from "@material-ui/lab/Pagination";

class Reviews extends React.Component<ReviewsProps, any> {

    handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
        this.props.getReviewsByHouseIdOfPage(this.props.house_id, page - 1);
    }

    render() {
        console.log(this.props);
        return (
            this.props.reviews &&
            <div className="reviews d-flex flex-column align-items-center">
                <Grid container spacing={2} justifyContent="space-around">
                    {
                        this.props.reviews.content
                            .map(review => <Review review={review} key={review.id}/>)
                    }
                </Grid>
                <Pagination
                    className="m-3"
                    count={this.props.reviews.totalPages}
                    color="primary"
                    showFirstButton
                    showLastButton
                    onChange={this.handleChangePage}
                />
            </div>
        );
    };
}

export default connect(null, {getReviewsByHouseIdOfPage})(Reviews);

interface ReviewsProps {
    house_id: number,
    reviews: Pageable<ReviewModel> | null,
    getReviewsByHouseIdOfPage: (house_id: number, page: number) => object
}