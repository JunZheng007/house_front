import React, {useState} from "react";
import './RentHistory.scss'
import {Button, Grid, Paper, Typography} from "@material-ui/core";
import {RentInfo} from "../../../shared/model/RentInfo";
import {useDispatch} from "react-redux";
import CancelDialog from "./CancelDialog";
import {deleteRentInfo} from "../../../actions/rent.action";
import FeedbackDialog from "./FeedbackDialog";
import {RouteComponentProps, withRouter} from "react-router-dom";

const RentHistory = (props: RentHistoryProps) => {
    const [feedback, setFeedback] = useState(false);
    const [cancel, setCancel] = useState(false);
    const dispatch = useDispatch();

    const handleFeedback = () => {
        setFeedback(true);
    }

    const handleCancel = () => {
        setCancel(true);
    }

    const handleClose = () => {
        setFeedback(false);
        setCancel(false);
    };

    const cancelReservation = () => {
        dispatch(deleteRentInfo(props.info));
        setCancel(false);
    }

    const openHouseInfo = () => {
        props.history.push(`/house-detail/${props.info.house.id}`)
    }

    return (
        <Paper className="rent-history" elevation={4}>
            <Grid
                container
                spacing={3}
                justifyContent="space-around"
                className="rent-history"
            >
                <Grid item md={4}
                      onClick={openHouseInfo}
                      className="house-image d-flex flex-column align-items-center justify-content-center">
                    <img src={props.info.house.image} className="image" alt="house"/>
                </Grid>
                <Grid item md={4}
                      onClick={openHouseInfo}
                      className="house-name d-flex flex-column align-items-center justify-content-center">
                    <Typography variant="h6" className="text-center">{props.info.house.name} </Typography>
                    <Typography className="text-center">Enter
                        Date: {new Date(props.info.enterDate).toDateString()}</Typography>
                    <Typography className="text-center">Leave
                        Date: {new Date(props.info.leaveDate).toDateString()}</Typography>
                </Grid>
                <Grid item className="d-flex flex-column align-items-center justify-content-center" md={2}>
                    <Button
                        variant="outlined"
                        color="primary"
                        className="w-75"
                        onClick={handleFeedback}
                        disabled={props.info.hasReview}
                    >
                        Feedback
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        className="w-75"
                        onClick={handleCancel}
                        disabled={new Date(props.info.enterDate).getTime() <= new Date().getTime()}
                    >
                        Cancel
                    </Button>
                    <FeedbackDialog open={feedback} close={handleClose} house={props.info.house} rentInfo={props.info}/>
                    <CancelDialog open={cancel} close={handleClose} cancel={cancelReservation}/>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default withRouter(RentHistory);

interface RentHistoryProps extends RouteComponentProps {
    info: RentInfo
}