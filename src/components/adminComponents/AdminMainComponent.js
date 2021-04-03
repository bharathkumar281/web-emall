import React from 'react';
import TopNav from "../TopNavComponent";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import SideNav from '../SideNavComponent';
import AdminHome from "./AdminHomeComponent";
import AdminStaff from "./AdminStaffComponent";

class AdminMain extends React.Component {

    constructor(props) {
        super(props);
        const userData = sessionStorage.getItem('admin');
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
                path: '/admin/home',
                icon: 'fa fa-home'
            },
            {
                text: 'Staff',
                path: '/admin/staff',
                icon: 'fa fa-users'
            }
        ];
        return (
            <div>
                <TopNav toggleNav={this.toggleNav} />
                <div className="wrapper d-flex">
                    <SideNav on={this.state.on} links={links} />
                    <Switch>
                        <Route path="/admin/home" component={() => <AdminHome user={this.state.user} />} />
                        <Route path="/admin/staff" component={() => <AdminStaff />} />
                        <Redirect to="/admin/home" />
                    </Switch>
                </div>
            </div>
        );
    }

}

export default withRouter(AdminMain);