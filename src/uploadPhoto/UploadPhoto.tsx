import React from "react";
import {DropzoneDialog} from "material-ui-dropzone";
import {useDispatch, useSelector} from "react-redux";
import {uploadUserPhoto} from "../actions/user.action";
import {addHousePhotos, deletePhoto} from "../actions/houseFile.action";
import {ReduxState} from "../shared/constants/appConstants";

const UploadPhoto = (props: ProfilePhotoProps) => {
    const photos = useSelector(({housePhotos}: ReduxState) => housePhotos);
    const dispatch = useDispatch();

    const handleSave = (files: File[]) => {
        props.close();
        props.photoType === "user" ? dispatch(uploadUserPhoto(files[0])) : dispatch(addHousePhotos(files));
    }

    const handleDelete = (file: File) => {
        dispatch(deletePhoto(file));
    }

    return (
        <DropzoneDialog
            open={props.open}
            onSave={handleSave}
            onClose={props.close}
            onDelete={handleDelete}
            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
            dropzoneText="Drag and drop a photo here or click"
            submitButtonText="Save"
            initialFiles={photos}
            showPreviews={true}
            maxFileSize={5000000}
            clearOnUnmount={false}
            filesLimit={props.photoType === "user" ? 1 : 5}
        />
    )
}

export default UploadPhoto;

interface ProfilePhotoProps {
    open: boolean,
    close: () => void,
    photoType: string
}