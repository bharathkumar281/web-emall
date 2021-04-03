import React from "react";
import { withRouter } from "react-router";
import Header from "./HeaderComponent";

const Home = (props) => {

    if (sessionStorage.getItem('user')) props.history.push('/staff');

    return (
        <div className="Home" >
            <Header login register title="eMall" />
        </div>
    );
}

export default withRouter(Home);