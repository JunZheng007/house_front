import React from "react";
import {NavLink} from "react-router-dom";
import {appConstants} from "../shared/constants/appConstants";
import './Header.scss'
import UserHeader from "../user/userHeader/UserHeader";
import {User} from "../shared/model/User";

const Header = (props: HeaderProps) => {
    console.log(props);
    return (
        <header className="Header">
            <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
                <ul className="nav navbar-nav">
                    <li className='nav-item'>
                        <NavLink className="navbar-brand" to={appConstants.housesRoute}>Rent Houses</NavLink>
                    </li>

                </ul>
                <ul className="nav navbar-nav right">
                    <li className='nav-item login'>
                        {
                            !props.user ?
                                <NavLink className="nav-link" to={appConstants.loginRoute}>Login</NavLink> :
                                <UserHeader user={props.user}/>
                        }
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;

interface HeaderProps {
    user: User
}