import React from 'react';
import { Navbar } from "react-bootstrap";
import { colors } from '../constants/theme';
import { withRouter } from "react-router-dom";

class TopNav extends React.Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('admin');
        alert('logged out successfully !');
        this.props.history.push('/login');
    }

    render() {
        return (
            <Navbar variant="dark" style={{ background: colors.dark }} className='Navbar add-shadow text-white'>
                <span className="fa fa-lg fa-bars" onClick={this.props.toggleNav}></span>
                <span className='mr-auto'></span>
                <span className='fa fa-lg fa-sign-out' onClick={this.logout}></span>
            </Navbar >
        );
    }
}

export default withRouter(TopNav);