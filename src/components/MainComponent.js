import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Home from './HomeComponent';
import Login from './LoginComponent';
import Register from './RegisterComponent';
import StaffMain from "./staffComponents/StaffMainComponent";
import '../index.css';
import AdminMain from './adminComponents/AdminMainComponent';
import { colors } from "../constants/theme";

class Main extends React.Component {

    render() {
        return (
            <div className="Main" style={{ background: colors.light }} >
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/home" component={Home} />
                    <Route path="/staff" component={StaffMain} />
                    <Route path="/admin" component={AdminMain} />
                    <Redirect to="/home" component={Home} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(Main);

