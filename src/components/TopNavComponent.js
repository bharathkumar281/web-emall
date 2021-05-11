import React from 'react';
import { Navbar } from "react-bootstrap";
import { colors } from '../constants/theme';
import { Link, withRouter } from "react-router-dom";
import { FaShoppingCart } from 'react-icons/fa';
import { Button, Modal } from './CustomComponents';

class TopNav extends React.Component {

    constructor(props) {
        super(props);
        this.state = { show: false }
        this.logout = this.logout.bind(this);
    }

    logout() {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('admin');
        this.props.history.push('/login');
    }

    render() {
        return (
            <Navbar variant="dark" style={{ background: colors.dark }} className='Navbar shadow-lg text-white' sticky="top">
                <Modal title="Confirm" show={this.state.show} msg="Are you sure you want to logout ?"
                    close={() => { this.setState({ show: false }) }} action={this.logout}
                    ok="yes" cancel="no" />
                <Button variant="dark" onClick={this.props.toggleNav} className={(window.screen.width < 1100) ? '' : 'd-none'}>
                    <span className="fa fa-bars"></span>
                </Button>
                <Link to="/admin/home" className="m-auto navbar-brand">
                    <span>eMall</span>
                    <FaShoppingCart className="ml-2" />
                </Link>
                <Button variant="dark" onClick={() => {this.setState({show: true})}}>
                    <span className="fa fa-sign-out fa-lg"></span>
                </Button>
            </Navbar >
        );
    }
}

export default withRouter(TopNav);