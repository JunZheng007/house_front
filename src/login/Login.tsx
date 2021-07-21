import './Login.scss'
import React, {SyntheticEvent} from "react";
import LoginIcon from '@material-ui/icons/AccountCircle';
import UsernameIcon from "@material-ui/icons/Person";
import PasswordIcon from "@material-ui/icons/VpnKey"
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {Fab, InputAdornment, Paper, Snackbar, TextField, Typography} from "@material-ui/core";
import {connect} from "react-redux";
import {login} from "../actions/user.action";
import {User} from '../shared/model/User';
import {NavLink, RouteComponentProps} from "react-router-dom";
import {appConstants, ReduxState} from "../shared/constants/appConstants";
import {Flags} from "../shared/model/Flags";
import {setIsLogin} from "../actions/flag.action";

class Login extends React.Component<LoginProps, LoginState> {

    constructor(props: any) {
        super(props);
        this.state = {
            user: {
                username: '',
                password: ''
            } as User,
            success: false,
            open: false
        }
    }

    handlerSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        this.props.login(
            this.state.user as User,
            (res: User) => {
                this.setState({
                    ...this.state,
                    success: true,
                    open: true
                });
                console.log(res);
                this.props.history.length > 2 ?
                    this.props.history.goBack() :
                    this.props.history.push(`/user/${this.state.user.username}`);
                this.props.setIsLogin(true);
            },
            () => {
                this.setState({
                    user: {
                        ...this.state.user,
                        username: '',
                        password: ''
                    },
                    success: false,
                    open: true
                });
            });
    }

    handleFormControl = (event: SyntheticEvent) => {
        const inputElement = event.target as HTMLInputElement;
        const newUser = {...this.state.user, [inputElement.name]: inputElement.value};
        this.setState({
            ...this.state,
            user: newUser
        });
    }

    handlerGoogleLogin = async (googleData: any) => {
        const res = await fetch("/api/v1/auth/google", {
            method: "POST",
            body: JSON.stringify({
                token: googleData.tokenId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        // store returned user somehow
        console.log(data);
    }

    render() {
        return (
            <Paper className="Login container unauthenticated" elevation={10}>
                <form className="login-form" onSubmit={this.handlerSubmit}>
                    <LoginIcon fontSize="large"/>
                    <TextField
                        name="username"
                        // className={classes.root}
                        label="Username"
                        value={this.state.user.username}
                        onChange={this.handleFormControl}
                        InputProps={{
                            className: "input",
                            startAdornment: (
                                <InputAdornment position="start">
                                    <UsernameIcon/>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        name="password"
                        // className={classes.root}
                        label="Password"
                        type="password"
                        value={this.state.user.password}
                        onChange={this.handleFormControl}
                        InputProps={{
                            // className: classes.input,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PasswordIcon/>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Fab
                        variant="extended"
                        size="medium"
                        color="primary"
                        aria-label="Login"
                        className="button"
                        type="submit"
                        disabled={!this.state.user.username || !this.state.user.password}
                    >
                        Sign In
                        <ArrowForwardIcon/>
                    </Fab>
                </form>
                {/*<GoogleLogin*/}
                {/*    className="google-login"*/}
                {/*    theme="dark"*/}
                {/*    clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}*/}
                {/*    buttonText="Sign in with Google"*/}
                {/*    onSuccess={this.handlerGoogleLogin}*/}
                {/*    onFailure={this.handlerGoogleLogin}*/}
                {/*    cookiePolicy={'single_host_origin'}*/}
                {/*/>*/}
                <Typography>
                    <NavLink to={appConstants.registrationRoute}>
                        not a member yet? Register now.
                    </NavLink>
                </Typography>
                <Snackbar
                    message={this.state.success ? 'Login success' : 'Login failure'}
                    open={this.state.open}
                    autoHideDuration={2000}
                    onClose={() => this.setState({...this.state, open: false})}
                />
            </Paper>
    )
        ;
    }
}

function mapStateTpProps({user, flags}: ReduxState, ownProps: LoginProps) {
    console.log(user);
    return{
        user: user,
        flags: flags
    }
}

export default connect(mapStateTpProps, {login, setIsLogin})(Login);

interface LoginProps extends RouteComponentProps{
    user: User,
    flags: Flags,
    login: (user: User, succeed: (res: User) => void, fail: () => void) => object,
    setIsLogin: (isLogin: boolean) => object
}

interface LoginState {
    user: User,
    success: boolean,
    open: boolean
}