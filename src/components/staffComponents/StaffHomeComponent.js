import React from "react";
import Profile from "../ProfileComponent";

class StaffHome extends React.Component {

    render() {

        const fields = [
            {
                key: 'Email',
                val: this.props.user.email
            }
        ];

        return (
            <>
                <Profile fields={fields} />
            </>
        );
    }
}

export default StaffHome;