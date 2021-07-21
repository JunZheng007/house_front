import React, {SyntheticEvent, useState} from "react";
import {Button, Dialog, DialogActions, DialogTitle, TextField} from "@material-ui/core";
import {Review} from "../../../shared/model/Review";
import {useDispatch} from "react-redux";
import {editReview} from "../../../actions/review.action";

const EditDialog = (props: EditDialogProps) => {
    const [review, setReview] = useState(props.review);
    const dispatch = useDispatch();

    const handleChange = (event: SyntheticEvent) => {
        const inputElement = event.target as HTMLInputElement;
        setReview({
            ...review,
            detail: inputElement.value
        });
        console.log(review);
    }

    const handleSubmit = (event: SyntheticEvent) => {
        dispatch(editReview(review));
        props.close();
    }

    return (
        <Dialog
                open={props.open}
                onClose={props.close}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="md"
                fullWidth
        >
            <DialogTitle id="alert-dialog-title">{"Edit Review"}</DialogTitle>
            <TextField
                className="p-4"
                variant="outlined"
                autoFocus
                multiline
                rows={6}
                defaultValue={review.detail}
                onChange={handleChange}
                margin="dense"
                fullWidth
                type="input"
            />
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

export default EditDialog;

interface EditDialogProps {
    review: Review,
    open: boolean,
    close: () => void,
}