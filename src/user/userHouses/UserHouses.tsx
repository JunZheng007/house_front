import React, {ChangeEvent} from "react";
import {Card, Typography} from "@material-ui/core";
import UserHouse from "./userHouse/UserHouse";
import {Link} from "react-router-dom";
import {appConstants, ReduxState} from "../../shared/constants/appConstants";
import Pagination from "@material-ui/lab/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {getHousesByOwnerIdOfPage} from "../../actions/house.action";

const UserHouses = (props: UserHousesProps) => {
    const houses = useSelector(({houses}: ReduxState) => houses);
    const dispatch = useDispatch();

    const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
        dispatch(getHousesByOwnerIdOfPage(props.user_id, page - 1));
    }

    return (
        <Card className="d-flex flex-column align-items-center" elevation={6}>
            {
                houses?.numberOfElements > 0 ?
                    houses.content.map(house => <UserHouse house={house} key={house.id}/>) :
                    <Typography className="text-center">
                        Please add your house.
                    </Typography>
            }
            <Typography className="text-center">
                <Link to={appConstants.addHousesRoute}>Add New House</Link>
            </Typography>
            <Pagination
                className="m-3"
                count={houses?.totalPages}
                color="primary"
                showFirstButton
                showLastButton
                onChange={handleChangePage}
            />
        </Card>
    );
}

export default UserHouses;

interface UserHousesProps {
    className: string,
    user_id: number
}