import React, {SyntheticEvent, useEffect, useState} from "react";
import {Button, Fab, InputAdornment, Paper, TextField} from "@material-ui/core";
import HouseIcon from "@material-ui/icons/House";
import HouseNameIcon from "@material-ui/icons/DateRange";
import RoomIcon from "@material-ui/icons/BorderAll";
import CapacityIcon from "@material-ui/icons/CropFree";
import StyleIcon from "@material-ui/icons/LocalOffer";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {House} from "../../shared/model/House";
import "./Addhouse.scss"
import {useDispatch, useSelector} from "react-redux";
import {addNewHouse, updateHouse} from "../../actions/house.action";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {ReduxState} from "../../shared/constants/appConstants";
import UploadPhoto from "../../uploadPhoto/UploadPhoto";

const AddHouse = (props: AddHouseProps) => {
    const user = useSelector(({user}: ReduxState) => user);
    const housePhotos = useSelector(({housePhotos}: ReduxState) => housePhotos);
    const editHouse = useSelector(({editHouse}: ReduxState) => editHouse);
    const [openAddPhoto, setOpenAddPhoto] = useState(false);
    const [house, setHouse] = useState(editHouse ? editHouse :
        {
            name: '',
            room: null,
            capacity: null,
            style: '',
            address: '',
            image: '',
            description: '',
            owner: user
        } as House
    );
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(editHouse);
    }, [editHouse])

    const handlerAddPhoto = (event: SyntheticEvent) => {
        event.preventDefault();
        setOpenAddPhoto(true);
    }

    const handlerSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        setHouse({
            ...house,
            owner: user
        });
        console.log(house, editHouse);
        editHouse === {} as House ? dispatch(updateHouse(house)) : dispatch(addNewHouse(house));
        props.history.push("/user");
    }

    const handleFormControl = (event: SyntheticEvent) => {
        const inputElement = event.target as HTMLInputElement;
        setHouse({
            ...house,
            [inputElement.name]: inputElement.value
        });
    }

    return (
        <Paper className="add-house" elevation={10}>
            <form className="form" onSubmit={handlerSubmit}>
                <HouseIcon fontSize="large"/>
                <TextField
                    name="name"
                    className="input"
                    label="House Name"
                    onChange={handleFormControl}
                    defaultValue={house.name}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <HouseNameIcon/>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    name="room"
                    className="input"
                    label="Number of Bedroom"
                    onChange={handleFormControl}
                    defaultValue={house.room}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <RoomIcon/>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    name="capacity"
                    className="input"
                    label="Capacity of the house"
                    onChange={handleFormControl}
                    defaultValue={house.capacity}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <CapacityIcon/>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    name="style"
                    label="Style"
                    className="input"
                    onChange={handleFormControl}
                    defaultValue={house.style}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <StyleIcon/>
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    name="address"
                    label="Address"
                    className="input"
                    onChange={handleFormControl}
                    defaultValue={house.address}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LocationOnIcon/>
                            </InputAdornment>
                        )
                    }}
                />
                <Button
                    className="m-3"
                    variant="contained"
                    color="primary"
                    onClick={handlerAddPhoto}
                >
                    Add house photo
                </Button>
                <TextField
                    name="description"
                    variant="outlined"
                    autoFocus
                    multiline
                    rows={6}
                    defaultValue={house.description}
                    onChange={handleFormControl}
                    placeholder="Description"
                    margin="dense"
                    fullWidth
                    type="input"
                />
                <Fab
                    className="mt-4 button"
                    variant="extended"
                    size="medium"
                    color="primary"
                    aria-label="Login"
                    type="submit"
                >
                    Submit
                    <ArrowForwardIcon/>
                </Fab>
            </form>
            <UploadPhoto open={openAddPhoto} close={() => setOpenAddPhoto(false)} photoType="house"/>
        </Paper>
    )
}

export default withRouter(AddHouse);

interface AddHouseProps extends RouteComponentProps{
}