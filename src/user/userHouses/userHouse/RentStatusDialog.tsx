import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

const RentStatusDialog = (props: DeleteDialogProps) => {
    return (
        <Dialog
            open={props.status.dialog}
            onClose={props.close}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="xs"
            fullWidth
        >
            <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {
                        props.status.text === 'Off Rent' ?
                            'This house will stop rent!' :
                            'This house will open for rent!'
                    }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close} color="default">
                    Cancel
                </Button>
                <Button onClick={props.changeStatus} color="secondary">
                    {
                        props.status.text === 'Off Rent' ?
                            'Yes, stop it!' :
                            'Yes, open it!'
                    }
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default RentStatusDialog;

interface DeleteDialogProps {
    status: { text: string, dialog: boolean },
    close: () => void,
    changeStatus: () => void
}