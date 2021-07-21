import React, {ChangeEvent, SyntheticEvent, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    FormControl,
    TextField,
    Typography,
    withStyles
} from "@material-ui/core";
import {Review} from "../../../shared/model/Review";
import {useDispatch, useSelector} from "react-redux";
import {addNewReview} from "../../../actions/review.action";
import {House} from "../../../shared/model/House";
import FavoriteIcon from '@material-ui/icons/Favorite';
import Rating from "@material-ui/lab/Rating";
import {ReduxState} from "../../../shared/constants/appConstants";
import {RentInfo} from "../../../shared/model/RentInfo";
import {hasReview} from "../../../actions/rent.action";

const StyledRating = withStyles({
    iconFilled: {
        color: '#ff6d75',
    },
    iconHover: {
        color: '#ff3d47',
    },
})(Rating);

const FeedbackDialog = (props: FeedbackDialogProps) => {
    const user = useSelector(({user}: ReduxState) => user);
    const [review, setReview] = useState({
        user: user,
        house: props.house,
        postTime: new Date(),
        rentInfo: props.rentInfo,
        score: 0,
        detail: ''
    } as Review);
    const dispatch = useDispatch();

    const handleScoreChange = (event:ChangeEvent<{}>) => {
        const inputElement = event.target as HTMLInputElement;
        setReview({
            ...review,
            score: parseFloat(inputElement.value) * 2
        });
        console.log(review);
    }

    const handleDetailChange = (event: SyntheticEvent) => {
        const inputElement = event.target as HTMLInputElement;
        setReview({
            ...review,
            [inputElement.name]: inputElement.value
        });
    }

    const handleSubmit = (event: SyntheticEvent) => {
        dispatch(addNewReview(review));
        dispatch(hasReview(props.rentInfo));
        props.close();
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.close}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle id="alert-dialog-title">{"Leave Feedback"}</DialogTitle>
            <form noValidate className="d-flex flex-column align-items-center">
                <FormControl>
                    <Typography component="legend">Rate House</Typography>
                    <StyledRating
                        size="large"
                        name="score"
                        value={review.score / 2}
                        getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={0.5}
                        icon={<FavoriteIcon fontSize="inherit" />}
                        onChange={handleScoreChange}
                    />
                </FormControl>
                    <TextField
                        name="detail"
                        className="p-4"
                        variant="outlined"
                        autoFocus
                        multiline
                        rows={5}
                        placeholder="Comments"
                        // helperText="Please enter comments here about your experience with this house."
                        onChange={handleDetailChange}
                        margin="dense"
                        fullWidth
                        type="input"
                    />
            </form>
            <DialogActions>
                <Button onClick={props.close} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default FeedbackDialog;

interface FeedbackDialogProps {
    open: boolean,
    close: () => void,
    house: House,
    rentInfo: RentInfo
}