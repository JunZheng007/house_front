import React, {SyntheticEvent} from "react";
import {DropzoneDialog} from "material-ui-dropzone";
import {useDispatch} from "react-redux";
import {uploadUserPhoto} from "../actions/user.action";
import {addHousePhotos} from "../actions/houseFile.action";

const UploadPhoto = (props: ProfilePhotoProps) => {
    const dispatch = useDispatch();

    const handleSave = (files: File[], event: SyntheticEvent) => {
        props.close();
        console.log(files);
        props.photoType === "user" ? dispatch(uploadUserPhoto(files[0])) : dispatch(addHousePhotos(files));
    }

    return (
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

export default UploadPhoto;

interface ProfilePhotoProps {
    open: boolean,
    close: () => void,
    photoType: string
}