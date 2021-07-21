import './Registration.scss'
import React, {ChangeEvent, SyntheticEvent, useState} from "react";
import {Fab, FormControl, InputAdornment, MenuItem, Paper, Select, Snackbar, TextField} from "@material-ui/core";
import LoginIcon from "@material-ui/icons/AccountCircle";
import UsernameIcon from "@material-ui/icons/Person";
import PasswordIcon from "@material-ui/icons/VpnKey";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import {useDispatch} from "react-redux";
import {register} from "../actions/user.action";
import {User} from "../shared/model/User";
import {RouteComponentProps, withRouter} from "react-router-dom";

const Registration = (props: RouteComponentProps) => {
    const [user, setUser] = useState({
        username: '',
        password: '',
        email: '',
        phone: '',
        type: ''
    })
    const [registered, setRegistered] = useState(false);
    const dispatch = useDispatch();

    const handlerSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        dispatch(register(
            user as User,
            (res) => {
                res && props.history.push('/user');
            },
            () => {
                setRegistered(true);
                setUser({
                    ...user,
                    username: ''
                })
            }
            ));
    }

    const handleFormControl = (event: SyntheticEvent) => {
        const inputElement = event.target as HTMLInputElement;
        const newUser = {...user, [inputElement.name]: inputElement.value};
        setUser(newUser);
    }

    const handleUserType = (event: ChangeEvent<{ value: string | unknown }>) => {
        setUser({
            ...user,
            type: event.target.value as string
        });
        console.log(event.target.value);
    }

    return (
        <Paper className="Registration container unauthenticated" elevation={10}>
            <form className="register-form" onSubmit={handlerSubmit}>
                <div className="login-icon"><LoginIcon/></div>
                <TextField
                    name="username"
                    // className={classes.root}
                    label="Username"
                    value={user.username}
                    onChange={handleFormControl}
                    error={registered}
                    InputProps={{
                        // className: classes.input,
                        startAdornment: (
                            <InputAdornment position="start">
                                <UsernameIcon/>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    name="email"
                    // className={classes.root}
                    label="Email"
                    value={user.email}
                    onChange={handleFormControl}
                    InputProps={{
                        // className: classes.input,
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon/>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    name="phone"
                    // className={classes.root}
                    label="Phone number"
                    value={user.phone}
                    onChange={handleFormControl}
                    InputProps={{
                        // className: classes.input,
                        startAdornment: (
                            <InputAdornment position="start">
                                <PhoneIcon/>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    name="password"
                    // className={classes.root}
                    label="Password"
                    type="password"
                    value={user.password}
                    onChange={handleFormControl}
                    InputProps={{
                        className: "input",
                        startAdornment: (
                            <InputAdornment position="start">
                                <PasswordIcon/>
                            </InputAdornment>
                        )
                    }}
                />
                <FormControl>
                    <Select
                        disableUnderline
                        // classes={{/* root: minimalSelectClasses.select */}}
                        // MenuProps={menuProps}
                        // IconComponent={iconComponent}
                        value={user.type}
                        onChange={handleUserType}
                    >
                        <MenuItem value={'tenant'}>House Tenant</MenuItem>
                        <MenuItem value={'owner'}>House Owner</MenuItem>
                    </Select>
                </FormControl>
                <Fab
                    variant="extended"
                    size="medium"
                    color="primary"
                    aria-label="Login"
                    className="button"
                    type="submit"
                    disabled={!user.username || !user.password || !user.email || !user.phone || !user.type}
                >
                    Register
                    <ArrowForwardIcon/>
                </Fab>
            </form>
            <Snackbar
                message="This username already registered. Please ues another username!"
                open={registered}
                autoHideDuration={2000}
                onClose={() => setRegistered(false)}
            />
        </Paper>
    );
}

export default withRouter(Registration);