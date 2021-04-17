import React from "react";
import { Container, Table, Row, Col } from "react-bootstrap";
import { colors } from "../../constants/theme";
import MyDate from "../../utils/DateUtils";
import { Button } from "../CustomComponents";
import MallLayout from "./MallLayoutComponent";

class StaffBooking extends React.Component {

    render() {

        const TableHeader = () => {
            return ['# booking ID', 'Seller', 'Space ID', 'Start date', 'End date', 'Revenue']
                .map((col, index) => <th key={index}>{col}</th>);
        }

        const TableBody = () => {
            let bookings = this.props.user.bookings;
            if (!bookings) return <tr><td colSpan="6">No Data Available</td></tr>;
            return bookings.map((booking, index) => {
                return (
                    <tr key={index}>
                        <td>{booking.bookingId}</td>
                        <td>{booking.sellerName}</td>
                        <td>{booking.spaceId}</td>
                        <td>{MyDate.format(booking.startDate)}</td>
                        <td>{MyDate.format(booking.endDate)}</td>
                        <td>{booking.revenue}</td>
                    </tr>
                );
            })
        }

        return (
            <div className="w-100 d-flex flex-column">
                <MallLayout mall={this.props.mall} user={this.props.user} refresh={this.props.refresh} />
                <Container fluid>
                    <h1 className="pt-5">Your Bookings <Button variant='dark'
                    onClick={this.props.refresh}><span className="fa fa-refresh"></span></Button></h1>
                    <hr />
                    <Row className="justify-content-center">
                        <Col xs={12} md={10} lg={8}>
                            <Table responsive variant="dark" style={{ background: colors.dark }}>
                                <thead><tr><TableHeader /></tr></thead>
                                <tbody><TableBody /></tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default StaffBooking;