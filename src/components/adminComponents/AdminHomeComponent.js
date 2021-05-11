import React from "react";
import { images } from "../../constants/urls";
import Profile from "../ProfileComponent";
import Stats from "../StatsComponent";

class AdminHome extends React.Component {

    render() {

        const user = this.props.user;

        const fields = {
            'Name': user.username,
            'Email': user.email,
            'Mall': user.mall ? user.mall.name + ', ' + user.mall.branch : 'Not Added'
        }

        var bookings = [];

        if (this.props.staff) {
            this.props.staff.forEach(s => {
                bookings = bookings.concat(s.bookings);
            });
        }

        return (
            <div className="d-flex flex-column w-100 mb-5">
                <Profile fields={fields} title="Dashboard" img={images.profile} refresh={this.props.refresh} />
                <Stats bookings={bookings} />
            </div>
        );
    }
}

export default AdminHome;