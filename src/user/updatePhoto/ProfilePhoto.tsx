import React, {SyntheticEvent} from "react";
import {DropzoneDialog} from "material-ui-dropzone";
import {connect} from "react-redux";
import {uploadPhoto} from "../../actions/user.action";

const ProfilePhoto = (props: ProfilePhotoProps) => {

    const handleSave = (files: File[], event: SyntheticEvent) => {
        props.close();
        console.log(files);
        uploadPhoto(files[0]);
    }

    return (
        // <Dialog open={props.open} onClose={props.close}>
        //     <DialogTitle id="form-dialog-title">Profile Photo</DialogTitle>
        //     <DialogContent>
        //
        //
        //     </DialogContent>
        //     {/*<DialogActions>*/}
        //     {/*    <Button onClick={handleClose} color="primary">*/}
        //     {/*        Cancel*/}
        //     {/*    </Button>*/}
        //     {/*    <Button onClick={handleClose} color="primary">*/}
        //     {/*        Subscribe*/}
        //     {/*    </Button>*/}
        //     {/*</DialogActions>*/}
        // </Dialog>
        <DropzoneDialog
            open={props.open}
            onSave={handleSave}
            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
            showPreviews={true}
            maxFileSize={5000000}
            onClose={props.close}
        />
    )
}

export default connect(null, {uploadPhoto})(ProfilePhoto);

interface ProfilePhotoProps {
    open: boolean,
    close: () => void
}