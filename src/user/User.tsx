import React, {useEffect} from "react";
import "./User.scss"
import {AppBar, Box, Paper, Tab, Tabs} from "@material-ui/core";
import UserProfile from "./userProfile/UserProfile";
import {useDispatch, useSelector} from "react-redux";
import {ReduxState} from "../shared/constants/appConstants";
import RentHistories from "./rentHistories/RentHistories";
import {getRentInfoByTenantId} from "../actions/rent.action";
import Reviews from "./reviews/Reviews";
import {getReviewsByUserIdOfPage} from "../actions/review.action";
import UserHouses from "./userHouses/UserHouses";
import {getHousesByOwnerIdOfPage} from "../actions/house.action";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {checkLogin} from "../actions/user.action";

const User = (props: UserProps) => {
    const [value, setValue] = React.useState(0);
    const user = useSelector(({user}: ReduxState) => user);
    const rentInfos = useSelector(({rentInfos}: ReduxState) => rentInfos);
    const dispatch = useDispatch();

    useEffect(() => {
        user === null && dispatch(checkLogin());
    }, [dispatch, user])

    useEffect(() => {
        if (user?.id === 0) {
            props.history.push('/login')
        }
    }, [user, props])

    useEffect(() => {
        if (user && user.type === 'tenant') {
            dispatch(getRentInfoByTenantId(user.id!));
            dispatch(getReviewsByUserIdOfPage(0));
        }
    }, [dispatch, user])

    useEffect(() => {
        if (user && user.type === 'owner') {
            dispatch(getHousesByOwnerIdOfPage(user.id!, 0));
            dispatch(getReviewsByUserIdOfPage(0));
        }
    }, [dispatch, user])

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        user &&
        <Paper className="user-page" elevation={5}>
            <UserProfile user={user}/>
            <div className="infos">
                <AppBar position="static" className="bar" color="default" elevation={6}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        {
                            user.type === "owner" ?
                                <Tab label="Your house(s)"/> :
                                <Tab label="Rent History"/>
                        }
                        <Tab label="Reviews"/>
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    {
                        user.type === 'owner' ?
                            <UserHouses className="info" user_id={user.id!}/> :
                            <RentHistories className="info" rentInfos={rentInfos}/>
                    }
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Reviews className="info" user={user}/>
                </TabPanel>

            </div>
        </Paper>
    )
}

export default withRouter(User);

interface UserProps extends RouteComponentProps {

}

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            hidden={value !== index}
            id={`tab_panel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}