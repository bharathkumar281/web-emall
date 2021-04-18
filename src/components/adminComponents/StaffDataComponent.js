import React from 'react';
import { Col, Container, Row, Table, Card } from "react-bootstrap";
import { colors } from '../../constants/theme';
import StaffService from '../../services/clientServices/StaffService';
import { Button } from '../CustomComponents';

class StaffData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {staff: null};
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        if (this.props.mallId) {
            StaffService.getStaffFromMallId(this.props.mallId)
                .then(response => response.data)
                .then(staff => {
                    if(staff.length > 0) this.setState({staff: staff});
                })
                .catch(error => console.log(error));
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
                    <Button variant="dark" onClick={this.fetchData}>
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
                                        {renderHeader}
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