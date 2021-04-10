import React from "react";
import { images } from "../../constants/urls";
import Profile from "../ProfileComponent";

class StaffHome extends React.Component {

    render() {

        const user = this.props.user;

        const fields = {
            'Name': user.username,
            'Email': user.email,
            'Revenue': user.revenue,
            'No of bookings': user.bookings.length
        };

        return (
            <>
                <Profile fields={fields} title="Staff Profile" img={images.profile} />
            </>
        );
    }
}

export default StaffHome;