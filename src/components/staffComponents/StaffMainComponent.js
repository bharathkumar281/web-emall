import React from 'react';
import TopNav from "../TopNavComponent";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import SideNav from '../SideNavComponent';
import StaffBooking from "./StaffBookingComponent";
import StaffHome from "./StaffHomeComponent";

class StaffMain extends React.Component {

    constructor(props) {
        super(props);
        const userData = sessionStorage.getItem('user');
        console.log(userData);
        if (!userData) {
            this.state = { user: null };
            alert('please login 1st');
            props.history.push('/login');
        }
        else this.state = { user: JSON.parse(userData), on: false };
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav() {
        this.setState({ on: !this.state.on });
    }

    render() {
        if (!this.state.user) return (<></>);
        const links = [
            {
                text: 'Home',
                path: '/staff/home',
                icon: 'fa fa-home'
            },
            {
                text: 'Bookings',
                path: '/staff/bookings',
                icon: 'fa fa-book'
            }
        ];
        return (
            <div>
                <TopNav toggleNav={this.toggleNav} />
                <div className="wrapper d-flex">
                    <SideNav on={this.state.on} links={links} />
                    <Switch>
                        <Route path="/staff/home" component={() => <StaffHome user={this.state.user} />} />
                        <Route path="/staff/bookings" component={StaffBooking} />
                        <Redirect to="/staff/home" />
                    </Switch>
                </div>
            </div>
        );
    }

}

export default withRouter(StaffMain);