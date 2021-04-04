import React from "react";
import { images } from "../../constants/urls";
import Profile from "../ProfileComponent";

class AdminHome extends React.Component {

    render() {

        const fields = [
            {
                key: 'Name',
                val: this.props.user.username
            },
            {
                key: 'Email',
                val: this.props.user.email
            }
        ];

        return (
            <>
                <Profile fields={fields} title="Admin Profile" img={images.profile} />
            </>
        );
    }
}

export default AdminHome;