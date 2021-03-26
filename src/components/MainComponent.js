import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './HomeComponent';
import {Login} from './LoginComponent';
import Register from './RegisterComponent';

const Main = () => {
    return (
        <div>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/" component={Home} />
                <Redirect to="/home" component={Home} />
            </Switch>
        </div>
    );
}

export default Main;

