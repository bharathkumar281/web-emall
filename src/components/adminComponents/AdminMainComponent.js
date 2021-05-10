import React from 'react';
import TopNav from "../TopNavComponent";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import SideNav from '../SideNavComponent';
import AdminHome from "./AdminHomeComponent";
import AdminStaff from "./AdminStaffComponent";
import AdminService from '../../services/managementServices/AdminService';
import AdminMall from './AdminMallComponent';
import StaffService from '../../services/clientServices/StaffService';

class AdminMain extends React.Component {

    constructor(props) {
        super(props);
        const userData = sessionStorage.getItem('admin');
        if (!userData) {
            this.state = { user: null, staff: null };
            alert('please login 1st');
            props.history.push('/login');
        }
        else this.state = { user: JSON.parse(userData), on: false };
        this.toggleNav = this.toggleNav.bind(this);
        this.refresh = this.refresh.bind(this);
        this.fetchStaff = this.fetchStaff.bind(this);
        this.fetchStaff();
    }

    toggleNav() {
        this.setState({ on: !this.state.on });
    }

    refresh() {
        AdminService.getAdmin(this.state.user.adminId)
            .then(response => response.data)
            .then(admin => {
                if (admin !== '') {
                    this.setState({ user: admin }, this.fetchStaff);
                    sessionStorage.setItem('admin', JSON.stringify(admin));
                }
                else this.fetchStaff();
            })
            .catch(error => console.log(error));
    }

    fetchStaff() {
        if(this.state.user.mall) {
            StaffService.getStaffFromMallId(this.state.user.mall.mallId)
            .then(response => response.data)
            .then(staff => {
                if (staff.length > 0) this.setState({ staff: staff });
            })
            .catch(error => console.log(error));
        }
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
                text: 'Mall',
                path: '/admin/mall',
                icon: 'fa fa-shopping-cart'
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
                        <Route path="/admin/home" component={() => <AdminHome user={this.state.user} staff={this.state.staff}
                            refresh={this.refresh} />} />
                        <Route path="/admin/staff" component={() => <AdminStaff user={this.state.user} staff={this.state.staff}
                            refresh={this.refresh} />} />
                        <Route path="/admin/mall" component={() => <AdminMall user={this.state.user} refresh={this.refresh} />} />
                        <Redirect to="/admin/home" />
                    </Switch>
                </div>
            </div>
        );
    }

}

export default withRouter(AdminMain);