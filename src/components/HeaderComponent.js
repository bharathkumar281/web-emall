import React from 'react';
import { images } from '../constants/urls';
import { Link } from 'react-router-dom';

const Header = (props) => {

    let LinkButton = (params) => {
        return (
            <div className="col-auto">
                <Link to={params.link}>
                    <div className="btn btn-lg btn-outline-light btn-rounded" >{params.text}</div>
                </Link>
            </div>
        );
    }

    var buttons = [];
    if (props.home) buttons.push(<LinkButton key="1" link="/home" text="Home" />)
    if (props.login) buttons.push(<LinkButton key="2" link="/login" text="Sign in" />)
    if (props.register) buttons.push(<LinkButton key="3" link="/register" text="Sign up" />)

    return (
        <div className="jumbotron jumbotron-fluid header pb-3 pt-3" style={
            {
                background: `url(${images.mall}) no-repeat`,
                backgroundSize: 'cover',
                backgroundAttachment: "fixed"
            }}>
            <div className="container text-white">
                <h3 className="display-2">{props.title}</h3>
                <p className="lead">{props.subtitle}</p>
                <div className="row d-flex justify-content-left">
                    {buttons}
                </div>
            </div>
        </div>
    );
}

export default Header;