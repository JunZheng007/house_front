import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

const DeleteDialog = (props: DeleteDialogProps) => {
    return (
        <Dialog
            open={props.open}
            onClose={props.close}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="xs"
            fullWidth
        >
            <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    You will delete all data about this house!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close} color="default">
                    Cancel
                </Button>
                <Button onClick={props.delete} color="secondary">
                    Yes, delete it!
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteDialog;

interface DeleteDialogProps {
    open: boolean,
    close: () => void,
    delete: () => void
}