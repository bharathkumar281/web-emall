import React from 'react';
import TopNav from "../TopNavComponent";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import SideNav from '../SideNavComponent';
import StaffBooking from "./StaffBookingComponent";
import StaffHome from "./StaffHomeComponent";
import MallService from '../../services/managementServices/MallService';
import StaffService from '../../services/clientServices/StaffService';

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
        this.fetchMall = this.fetchMall.bind(this);
        this.refresh = this.refresh.bind(this);
        this.fetchMall();
    }

    toggleNav() {
        this.setState({ on: !this.state.on });
    }

    fetchMall() {
        MallService.get(this.state.user.mallId)
            .then(response => response.data)
            .then(mall => {
                if (mall !== '') this.setState({ mall: mall });
            })
            .catch(error => console.log(error));
    }

    refresh() {
        StaffService.getStaff(this.state.user.staffId)
            .then(response => response.data)
            .then(staff => {
                if (staff !== '') {
                    this.setState({ user: staff });
                    sessionStorage.setItem('user', JSON.stringify(staff));
                }
            })
            .catch(error => console.log(error));
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
                        <Route path="/staff/home"
                            component={() => <StaffHome user={this.state.user} refresh={this.refresh} />} />
                        <Route path="/staff/bookings"
                            component={() => <StaffBooking user={this.state.user} mall={this.state.mall} refresh={this.refresh} />} />
                        <Redirect to="/staff/home" />
                    </Switch>
                </div>
            </div>
        );
    }

}

export default withRouter(StaffMain);