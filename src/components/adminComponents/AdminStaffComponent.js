import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { images } from "../../constants/urls";
import AddStaff from "./AddStaffComponent";
import StaffData from "./StaffDataComponent";

class AdminStaff extends React.Component {

    render() {
        const mall = this.props.user.mall;
        if (!mall) {
            return (
                <Container fluid className="text-center">
                    <h2 className="pt-5">No staff data available</h2>
                    <h4>Please add a <Link to="/admin/mall">Mall</Link> first</h4>
                    <Row className="justify-content-center pt-5">
                        <Col xs={12} md={5}>
                            <Image src={images.blank} fluid />
                        </Col>
                    </Row>
                </Container>
            );
        }
        else {
            return (
                <div className="w-100 d-flex flex-column">
                    <AddStaff mall={mall} />
                    <StaffData staff={this.props.staff} refresh={this.props.refresh} />
                </div>
            );
        }
    }
}

export default AdminStaff;