import React from "react";
import { images } from "../../constants/urls";
import Profile from "../ProfileComponent";
import Stats from "../StatsComponent";

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
            <div className="w-100 d-flex flex-column mb-5 w-100">
                <Profile fields={fields} title="Dashboard" img={images.profile} refresh={this.props.refresh} />
                <Stats bookings={user.bookings} />
            </div>
        );
    }
}

export default StaffHome;