import React, {SyntheticEvent, useState} from "react";
import './UserProfile.scss'
import {Avatar, Card, Link, Typography} from "@material-ui/core";
import {User} from "../../shared/model/User";
import UploadPhoto from "../../uploadPhoto/UploadPhoto";

const UserProfile = (props: UserProfileProps) => {
    const [openUpdatePhoto, setOpenUpdatePhoto] = useState(false);

    const updatePhoto = (event: SyntheticEvent) => {
        event.preventDefault();
        setOpenUpdatePhoto(true);
    }

    return (
        <Card className="user-profile" elevation={6}>
            <Avatar className="avatar" sizes="48x48" src={props.user.photo.path}/>
            <UploadPhoto open={openUpdatePhoto} close={() => setOpenUpdatePhoto(false)} photoType="user"/>
            <Typography>
                <Link href='' onClick={updatePhoto}>Update Photo</Link>
            </Typography>
            <Typography gutterBottom variant="h2" component="h2">
                {props.user.username.toUpperCase()}
            </Typography>
            <Typography gutterBottom variant="h6" component="h5">
                email: {props.user.email}
            </Typography>
            <Typography gutterBottom variant="h6" component="h5">
                phone: {props.user.phone}
            </Typography>
            <Typography gutterBottom variant="h6" component="h5">
                Role: house {props.user.type}
            </Typography>
        </Card>
    )
}

export default UserProfile;

interface UserProfileProps {
    user: User
}
