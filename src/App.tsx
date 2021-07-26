import React, {useEffect} from 'react';
import Header from './header/Header';
import './App.scss'
import {useDispatch, useSelector} from "react-redux";
import {ReduxState} from "./shared/constants/appConstants";
import {checkLogin} from "./actions/user.action";
import {Snackbar} from "@material-ui/core";
import {setIsLogin, setIsLogout} from "./actions/flag.action";

function App(props: any) {
    const user = useSelector(({user}: ReduxState) => user);
    const flags = useSelector(({flags}: ReduxState) => flags);
    const dispatch = useDispatch();

    useEffect(() => {
        user === null && dispatch(checkLogin());
    }, [dispatch, user])

    return (
        <div className="App">
            <Header user={user}/>
            {props.children}

            <Snackbar
                message="Login Successfully"
                open={flags.isLogin}
                autoHideDuration={2000}
                onClose={() => dispatch(setIsLogin(false))}
            />
            <Snackbar
                message="Logout Successfully"
                open={flags.isLogout}
                autoHideDuration={2000}
                onClose={() => dispatch(setIsLogout(false))}
            />
        </div>
    );
}

export default App;
