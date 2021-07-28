import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'fontsource-roboto';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import {applyMiddleware, createStore} from "redux";
import reduxPromise from 'redux-promise';
import {Provider} from "react-redux";
import {rootReducer} from "./reducers/rootReducer";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {appConstants} from "./shared/constants/appConstants";
import Houses from "./houses/Houses";
import HouseInfo from "./houses/houseInfo/HouseInfo";
import Login from './login/Login';
import Registration from "./registration/Registration";
import AddHouse from "./houses/addHouse/AddHouse";
import User from './user/User';
import {CookiesProvider} from "react-cookie";

const createStoreWithMiddleware = applyMiddleware(reduxPromise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(rootReducer)}>
        <CookiesProvider>
            <BrowserRouter>
                <App>
                    <Switch>
                        <Route path={appConstants.userRoute} component={User}/>
                        <Route path={appConstants.loginRoute} component={Login}/>
                        <Route path={appConstants.registrationRoute} component={Registration}/>
                        <Route path={`${appConstants.houseInfoRoute}/:id`} component={HouseInfo}/>
                        <Route path={appConstants.addHousesRoute} component={AddHouse}/>
                        <Route path={appConstants.editHousesRoute} component={AddHouse}/>
                        <Route path={appConstants.housesRoute} component={Houses}/>
                    </Switch>
                </App>
            </BrowserRouter>
        </CookiesProvider>
    </Provider>,
    document.getElementById('root')
);

reportWebVitals();
