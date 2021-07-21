import React, {useState} from "react";
import {Button, Grid, Paper, Typography} from "@material-ui/core";
import {House as HouseModel} from "../../../shared/model/House";
import {useDispatch} from "react-redux";
import {deleteHouse, updateHouse} from "../../../actions/house.action";
import DeleteDialog from "./DeleteDialog";
import RentStatusDialog from "./RentStatusDialog";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import {appConstants} from "../../../shared/constants/appConstants";

const UserHouse = (props: UserHouseProps) => {
    const [rentStatus, setRentStatus] = useState({
        text: 'Off Rent',
        dialog: false
    });
    const [del, setDel] = useState(false);
    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch({
            type: appConstants.EDIT_HOUSE,
            payload: props.house
        })
    }

    const handleStatus = () => {
        setRentStatus({
            ...rentStatus,
            dialog: true
        })
    }

    const handleDelete = () => {
        setDel(true);
    }

    const handleClose = () => {
        setRentStatus({
            ...rentStatus,
            dialog: false
        });
        setDel(false);
    };

    const changeStatus = () => {
        setRentStatus({
            text: rentStatus.text === 'Off Rent' ? 'On Rent' : 'Off Rent',
            dialog: false
        })
        dispatch(updateHouse({
            ...props.house,
            rentStatus: rentStatus.text === 'Off Rent' ? 1 : 0
        }))
        console.log(props.house)
    }

    const deleteThisHouse = () => {
        dispatch(deleteHouse(props.house));
    }

    return (
        <Paper className="rent-history" elevation={4}>
            <Grid
                container
                spacing={3}
                justifyContent="space-around"
                className="rent-history"
            >
                <Grid item md={4} className="house-image d-flex flex-column align-items-center justify-content-center">
                    <img src={props.house.image} className="image" alt="house"/>
                </Grid>
                <Grid item md={4} className="house-name d-flex flex-column align-items-center justify-content-center">
                    <Typography variant="h6" className="text-center">{props.house.name} </Typography>
                    <Typography className="text-center">Rooms: {props.house.room}</Typography>
                    <Typography className="text-center">Capacity: {props.house.capacity}</Typography>
                    <Typography className="text-center">Styles: {props.house.style}</Typography>
                    <Typography className="text-center">Rank: {props.house.rank}</Typography>
                </Grid>
                <Grid item className="d-flex flex-column align-items-center justify-content-center" md={2}>
                    <Button
                        variant="outlined"
                        color="primary"
                        className="w-75"
                        onClick={handleEdit}
                    >
                        <Link className="text-decoration-none" to={appConstants.editHousesRoute}>Edit</Link>
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        className="w-75"
                        onClick={handleStatus}
                    >
                        {rentStatus.text}
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        className="w-75"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                    <RentStatusDialog status={rentStatus} close={handleClose} changeStatus={changeStatus}/>
                    <DeleteDialog open={del} close={handleClose} delete={deleteThisHouse}/>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default withRouter(UserHouse);

interface UserHouseProps extends RouteComponentProps {
    house: HouseModel
}