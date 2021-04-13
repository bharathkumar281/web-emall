import React from "react";
import { Link } from "react-router-dom";
import '../css/SideNav.css';

const SideNav = (props) => {
    const links = props.links.map(link => {
        return (
            <li className="nav-item pl-4 pl-md-0" key={link.text}>
                <Link to={link.path} className="nav-link">
                    <span className={`mr-2 ${link.icon}`}></span>
                    <span>{link.text}</span>
                </Link>
            </li>
        );
    });
    return (
        <nav className={`SideNav navbar-dark sidebar ${props.on ? "on" : ""} bg-blue text-white`}>
            <div className="container-fluid pt-5">
                <ul className="navbar-nav">
                    {links}
                </ul>
            </div>
        </nav>
    );
}

export default SideNav;