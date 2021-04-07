import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddStaff from "./AddStaffComponent";
import StaffData from "./StaffDataComponent";

class AdminStaff extends React.Component {

    render() {
        const mall = this.props.user.mall;
        if (!mall) {
            return (
                <Container fluid>
                    <h2 className="pt-5">No staff data available</h2>
                    <h4>Please add a <Link to="/admin/mall">Mall</Link> first</h4>
                </Container>
            );
        }
        else {
            return (
                <div className="w-100 d-flex flex-column">
                    <AddStaff mall={mall} />
                    <StaffData mallId={mall.mallId} />
                </div>
            );
        }
    }
}

export default AdminStaff;