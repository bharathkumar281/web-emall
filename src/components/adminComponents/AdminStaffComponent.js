import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddStaff from "./AddStaffComponent";

class AdminStaff extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isLoading: false, errorMsg: null };
        this.addStaff = this.addStaff.bind(this);
    }

    addStaff = (event) => {

    }

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
        else return (
            <AddStaff mall={mall} />
        );
    }
}

export default AdminStaff;