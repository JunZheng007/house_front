import React, {ChangeEvent, useEffect} from "react";
import "./RentHistories.scss"
import {Typography} from "@material-ui/core";
import RentHistory from "./rentHistory/RentHistory";
import Pagination from "@material-ui/lab/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {ReduxState} from "../../shared/constants/appConstants";
import {getRentInfoByTenantIdOfPage} from "../../actions/rent.action";

const RentHistories = (props: RentHistoriesProps) => {
    const rentInfos = useSelector(({rentInfos}: ReduxState) => rentInfos);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(rentInfos);
        rentInfos === null && dispatch(getRentInfoByTenantIdOfPage(props.userId, 0))
    })

    const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
        dispatch(getRentInfoByTenantIdOfPage(props.userId, page - 1))
    }

    return (
        <div className="rent-info d-flex flex-column align-items-center">
            {
                rentInfos && !rentInfos.empty ?
                    rentInfos.content
                        .map(info => <RentHistory info={info} key={info.id}/>) :
                    <Typography className="text-center">
                        You did not rent any house yet.
                    </Typography>
            }
            <Pagination
                className="m-3"
                count={rentInfos?.totalPages}
                color="primary"
                showFirstButton
                showLastButton
                onChange={handleChangePage}
            />
        </div>
    )
}

export default RentHistories;

interface RentHistoriesProps {
    className: string,
    userId: number
}