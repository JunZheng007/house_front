import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

const CancelDialog = (props: CancelDialogProps) => {
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
                    You will cancel this reservation!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close} color="primary">
                    No, keep it!
                </Button>
                <Button onClick={props.cancel} color="secondary">
                    Yes, cancel it!
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CancelDialog;

interface CancelDialogProps {
    open: boolean,
    close: () => void,
    cancel: () => void
}