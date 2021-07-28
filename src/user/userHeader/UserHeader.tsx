import React from "react";
import "./UserHeader.scss";
import {Avatar, Fab, Menu, MenuItem} from "@material-ui/core";
import {User} from "../../shared/model/User";
import {useDispatch} from "react-redux";
import {logout} from "../../actions/user.action";
import {setIsLogout} from "../../actions/flag.action";
import {appConstants} from "../../shared/constants/appConstants";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";

const UserHeader = (props: UserHeaderProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const dispatch = useDispatch();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout(() => {
                props.history?.push(appConstants.housesRoute);
        }));
        dispatch(setIsLogout(true));


    }

    return (
        <div className="user-header">
            <Fab size='small' onClick={handleClick}>
                <Avatar src={props.user?.photo.path}/>
            </Fab>
            <Menu
                id="menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                onClick={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{horizontal: "center", vertical: "top"}}
            >
                <MenuItem className="menu-item">
                    <Link className="link" to={appConstants.userRoute}>My Account</Link>
                </MenuItem>
                <MenuItem className="menu-item" onClick={handleLogout}>
                    <h6 className="link-primary">Logout</h6>
                </MenuItem>
            </Menu>
        </div>
    )
}

export default withRouter(UserHeader);

interface UserHeaderProps extends RouteComponentProps {
    user: User
}