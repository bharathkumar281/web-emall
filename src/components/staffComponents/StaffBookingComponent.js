import React from "react";
import MallLayout from "./MallLayoutComponent";

class StaffBooking extends React.Component {

    render() {
        return (
            <div className="w-100 d-flex flex-column">
                <MallLayout mall={this.props.mall} user={this.props.user} />
            </div>
        );
    }
}

export default StaffBooking;