import React from "react";
import { images } from "../../constants/urls";
import Profile from "../ProfileComponent";

class AdminHome extends React.Component {

    render() {

        const user = this.props.user;

        const fields = {
            'Name': user.username,
            'Email': user.email,
            'Mall': user.mall ? user.mall.name + ', ' + user.mall.branch : 'Not Added'
        }

        return (
            <>
                <Profile fields={fields} title="Admin Profile" img={images.profile} />
            </>
        );
    }
}

export default AdminHome;