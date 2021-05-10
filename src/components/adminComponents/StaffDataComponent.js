import React from 'react';
import { Col, Container, Row, Table, Card } from "react-bootstrap";
import { colors } from '../../constants/theme';
import { Button } from '../CustomComponents';

class StaffData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {staff: props.staff};
        console.log(props.staff);
    }

    componentDidUpdate(nextProps) {
        if(JSON.stringify(this.props) !== JSON.stringify(nextProps.staff)) {
            this.setState({staff: this.props.staff});
        }
    }

    render() {
        let cols = ['#', 'Name', 'Email', 'Revenue', 'No of Bookings'];
        const renderHeader = cols.map((col, index) => {
            return (
                <td key={index}>{col}</td>
            );
        });

        const Rows = () => {
            if (!this.state.staff) {
                return (
                    <tr>
                        <td colSpan={cols.length} className="text-center">No data available</td>
                    </tr>
                );
            }
            else {
                const rows = this.state.staff.map((staff, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{staff.username}</td>
                            <td>{staff.email}</td>
                            <td>{staff.revenue}</td>
                            <td>{staff.bookings.length}</td>
                        </tr>
                    );
                });
                return rows;
            }
        }

        return (
            <Container fluid>
                <h1 className="pt-5">
                    <span>Top Staff Members </span>
                    <Button variant="dark" onClick={this.props.refresh}>
                        <span className="fa fa-refresh"></span>
                    </Button>
                </h1>
                <hr />
                <Row className="justify-content-center">
                    <Col xs={12} md={10} lg={8}>
                        <Card className="add-shadow-small">
                            <Card.Body className="p-0">
                                <Table responsive className="m-0">
                                    <thead style={{ background: colors.dark, color: colors.light }}>
                                        <tr>{renderHeader}</tr>
                                    </thead>
                                    <tbody>
                                        <Rows />
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default StaffData;