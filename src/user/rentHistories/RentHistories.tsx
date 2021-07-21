import React, {ChangeEvent, useEffect, useState} from "react";
import "./RentHistories.scss"
import {Typography} from "@material-ui/core";
import {RentInfo} from "../../shared/model/RentInfo";
import RentHistory from "./rentHistory/RentHistory";
import Pagination from "@material-ui/lab/Pagination";
import Pageable from "../../shared/model/Pageable";

const RentHistories = (props: RentHistoriesProps) => {
    const [rentInfoPage, setRentInfoPage] = useState({
        content: props.rentInfos ? props.rentInfos.slice(0, 2) : undefined,
        empty: props.rentInfos ? props.rentInfos.length === 0 : true,
        totalElements: props.rentInfos ? props.rentInfos.length : 0,
        totalPages: props.rentInfos ? Math.ceil(props.rentInfos.length / 2) : 0
    } as Pageable<RentInfo>)

    useEffect(() => {
        if (props.rentInfos) {
            props.rentInfos
                .sort((info1, info2) => {
                    const date1 = Date.parse(info1.enterDate.toString());
                    const date2 = Date.parse(info2.enterDate.toString());
                    return date2 - date1;
                });
        }
    }, [props.rentInfos])

    const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
        setRentInfoPage({
            ...rentInfoPage,
            content: props.rentInfos.slice((page - 1) * 2, page * 2)
        });
    }

    return (
        <div className="rent-info d-flex flex-column align-items-center">
            {
                props.rentInfos && !rentInfoPage.empty ?
                    rentInfoPage.content
                        .map(info => <RentHistory info={info} key={info.id}/>) :
                    <Typography className="text-center">
                        You did not rent any house yet.
                    </Typography>
            }
            <Pagination
                className="m-3"
                count={rentInfoPage.totalPages}
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
    rentInfos: RentInfo[]
}