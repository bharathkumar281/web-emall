import React from 'react';
import { Navbar } from "react-bootstrap";
import { colors } from '../constants/theme';
import { Link, withRouter } from "react-router-dom";
import { FaShoppingCart } from 'react-icons/fa';
import { Button } from './CustomComponents';

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
            <Navbar variant="dark" style={{ background: colors.dark }} className='Navbar add-shadow text-white' sticky="top">
                <Button variant="dark" onClick={this.props.toggleNav}>
                    <span className="fa fa-bars"></span>
                </Button>
                <Link to="/admin/home" className="m-auto navbar-brand">
                    <span>eMall</span>
                    <FaShoppingCart className="ml-2" />
                </Link>
                <Button variant="dark" onClick={this.logout}>
                    <span className="fa fa-sign-out fa-lg"></span>
                </Button>
            </Navbar >
        );
    }
}

export default withRouter(TopNav);