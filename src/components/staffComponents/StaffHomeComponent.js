import React from "react";
import { images } from "../../constants/urls";
import Profile from "../ProfileComponent";

class StaffHome extends React.Component {

    render() {

        const fields = [
            {
                key: 'Name',
                val: this.props.user.username
            },
            {
                key: 'Email',
                val: this.props.user.email
            },
            {
                key: 'Revenue',
                val: this.props.user.revenue
            },
            {
                key: 'No of bookings',
                val: this.props.user.bookings.length
            }
        ];

        return (
            <>
                <Profile fields={fields} title="Staff Profile" img={images.profile} />
            </>
        );
    }
}

export default StaffHome;