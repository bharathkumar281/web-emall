import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { images } from "../../constants/urls";
import { LineChart } from "../ChartComponent";
import Profile from "../ProfileComponent";
import MyDate from '../../utils/DateUtils';

class AdminHome extends React.Component {

    render() {

        const user = this.props.user;

        const fields = {
            'Name': user.username,
            'Email': user.email,
            'Mall': user.mall ? user.mall.name + ', ' + user.mall.branch : 'Not Added'
        }

        const Stats = () => {
            if (!this.props.staff) return <></>;
            let bookings = [];

            this.props.staff.forEach(s => {
                bookings = bookings.concat(s.bookings);
            })

            let monthlyStats = MyDate.groupBookingsbyMonth(bookings);
            var labels = monthlyStats.map(month => month.label);
            var revenues = monthlyStats.map(month => month.revenue);
            var bookingCount = monthlyStats.map(month => month.count);
            
            return (
                <Container fluid>
                    <Row className="mt-3">
                        <Col xs={12} md={5} lg={4} className="offset-0 offset-md-1 offset-lg-2" >
                            <Card className="add-shadow-small">
                                <Card.Body>
                                    <h2>50,000</h2>
                                    <h4>Total revenue generated</h4>
                                </Card.Body>
                            </Card>
                            <Card className="add-shadow-small mt-3">
                                <Card.Body>
                                    <LineChart labels={labels} data={revenues}
                                        description="Revenue (in Rs)" text="Revenue Generated Per Month" />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} md={5} lg={4}>
                            <Card className="add-shadow-small">
                                <Card.Body>
                                    <h2>50,000</h2>
                                    <h4>Total revenue generated</h4>
                                </Card.Body>
                            </Card>
                            <Card className="add-shadow-small mt-3">
                                <Card.Body>
                                    <LineChart labels={labels} data={bookingCount}
                                        description="No of Bookings" text="Bookings Made per month" />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                </Container>
            );
        }

        return (
            <div className="d-flex flex-column w-100 mb-5">
                <Profile fields={fields} title="Admin Profile" img={images.profile} refresh={this.props.refresh} />
                <Stats />
            </div>
        );
    }
}

export default AdminHome;