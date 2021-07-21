import React, {SyntheticEvent, useState} from "react";
import "./Review.scss"
import {Button, Grid, Paper, Typography} from "@material-ui/core";
import {Review as ReviewModel} from "../../../shared/model/Review";
import DeleteDialog from "./DeleteDialog";
import EditDialog from "./EditDialog";
import {deleteReview} from "../../../actions/review.action";
import {useDispatch, useSelector} from "react-redux";
import {ReduxState} from "../../../shared/constants/appConstants";

const Review = (props: ReviewProps) => {
    const [editDialog, setEditDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const user = useSelector(({user}: ReduxState) => user);
    const dispatch = useDispatch();

    const handleEdit = (event: SyntheticEvent) => {
        setEditDialog(true);
    }

    const handleDelete = (event: SyntheticEvent) => {
        setDeleteDialog(true);
    }

    const handleClose = () => {
        setEditDialog(false);
        setDeleteDialog(false);
    };

    const deleteThisReview = () => {
        dispatch(deleteReview(props.review));
    }

    return (
        <Paper className="user-review" elevation={4}>
            <Grid
                container
                spacing={3}
                justifyContent="space-around"
                className="user-review"
            >
                <Grid item md={2} className="house-image d-flex flex-column align-items-center justify-content-center">
                    <img src={props.review.house.image} className="image" alt="house"/>
                </Grid>
                <Grid item md={8} className="align-items-center justify-content-center">
                    <Grid
                        container
                        spacing={2}
                        direction="column"
                        justifyContent="space-around"
                        alignContent="space-around"
                        alignItems="center"
                    >
                        <Grid item className="post-date" >
                            <Typography className="text-right">
                                {new Date(props.review.postTime).toLocaleDateString()}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography className="text-center">{props.review.detail}</Typography>
                        </Grid>
                        {
                            user.type === 'tenant' &&
                            <Grid item className="w-100">
                                <Button color="primary" onClick={handleEdit}>Edit</Button>
                                <Button color="primary" onClick={handleDelete}>Delete</Button>
                                <EditDialog review={props.review} open={editDialog} close={handleClose}/>
                                <DeleteDialog open={deleteDialog} close={handleClose} delete={deleteThisReview}/>
                            </Grid>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Review;

interface ReviewProps {
    review: ReviewModel
}