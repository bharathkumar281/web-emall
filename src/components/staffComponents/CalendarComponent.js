import React from 'react';
import { Card, Container, Row, Col, FormControl, Form, Table } from 'react-bootstrap';
import { colors } from '../../constants/theme';
import { Button } from '../CustomComponents';

class BookingCalendar extends React.Component {

    constructor(props) {
        super(props);
        let curDate = new Date(Date.now());
        this.state = {
            selectedYear: curDate.getFullYear(),
            selectedMonth: curDate.getMonth(),
            booked: []
        };
    }

    handleClick(dateObj) {
        console.log(dateObj.toDateString());
        if (!this.state.startDate) {
            this.setState({
                startDate: dateObj,
                endDate: dateObj
            });
        }
        else {
            if (this.state.startDate.getTime() === dateObj.getTime() ||
                (this.state.endDate && this.state.endDate.getTime() === dateObj.getTime()))
                this.setState({ startDate: dateObj, endDate: dateObj });
            else if (this.state.startDate < dateObj)
                this.setState({ endDate: dateObj });
            else this.setState({ startDate: dateObj });
        }
    }

    render() {
        let curDate = new Date(Date.now());
        let currentMonth = curDate.getMonth();
        let currentYear = curDate.getFullYear();
        var months = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        const monthSelect = months.map((month, index) => {
            return (<option key={index} value={index}>{month}</option>);
        }).filter((val, index) => {
            return currentYear !== this.state.selectedYear || currentMonth <= index;
        });

        const yearSelect = [currentYear, currentYear + 1].map(year => {
            return (<option key={year} value={year}>{year}</option>);
        });
        let rows = [];
        for (var i = 1; i <= 6; ++i) {
            let row = [];
            for (var j = 0; j <= 6; ++j) row.push(null);
            rows.push(row);
        }
        curDate = new Date(this.state.selectedYear, this.state.selectedMonth, 1);
        console.log([this.state.selectedYear, this.state.selectedMonth]);
        var lastDate = (y, m) => new Date(y, m + 1, 0).getDate();
        var rowi = 0;
        for (var date = 1; date <= lastDate(this.state.selectedYear, this.state.selectedMonth); ++date) {
            curDate.setDate(date);
            let day = curDate.getDay();
            if (day === 0) rowi++;
            rows[rowi][day] = new Date(curDate);
        }

        var renderRow = (row) => {
            return row.map((dateObj, index) => {
                if (!dateObj) return <td></td>;
                else {
                    let variant = "outline-success";
                    let disabled = false;
                    if (new Date(Date.now()) > dateObj) { variant = "secondary"; disabled = true; }
                    else if (this.state.booked.includes(dateObj.getDate())) { variant = "danger"; disabled = true; }
                    else if (this.state.startDate) {
                        if (this.state.startDate.getTime() === dateObj.getTime() ||
                            (this.state.endDate && this.state.startDate <= dateObj && dateObj <= this.state.endDate)) {
                            variant = "success";
                        }
                    }
                    return (
                        <td key={index}>
                            <Button variant={variant} disabled={disabled}
                                onClick={() => this.handleClick(dateObj)}>
                                {dateObj.getDate()}
                            </Button>
                        </td>
                    );
                }
            });
        }

        var renderRows = rows.map((row, index) => {
            return (
                <tr key={index}>
                    {renderRow(row)}
                </tr>
            )
        });

        let diffDays = (d1, d2) => {
            if (!d1 || !d2) return -1;
            let ms = 1000 * 60 * 60 * 24;
            return Math.floor((d2 - d1) / ms) + 1;
        }

        const days = diffDays(this.state.startDate, this.state.endDate);

        return (
            <Container fluid>
                <Row className="justify-content-center">
                    <Col xs={12} md={10} lg={8}>
                        <Card className="add-shadow-small border-0">
                            <Card.Header style={{ background: colors.dark, color: colors.light }}>
                                <Form>
                                    <Form.Row className="justify-content-center">
                                        <Col xs={12} sm={6} lg={4} className="pb-2 pb-sm-0">
                                            <FormControl as="select" defaultValue={this.state.selectedMonth}
                                                onChange={e => this.setState({ selectedMonth: parseInt(e.target.value) })} >
                                                {monthSelect}
                                            </FormControl>
                                        </Col>
                                        <Col xs={12} sm={6} lg={4}>
                                            <FormControl as="select" defaultValue={this.state.selectedYear}
                                                onChange={e => this.setState({ selectedYear: parseInt(e.target.value) })}>
                                                {yearSelect}
                                            </FormControl>
                                        </Col>
                                    </Form.Row>
                                </Form>
                            </Card.Header>
                            <Card.Body>
                                <Table responsive>
                                    <thead>
                                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (<th>{day}</th>))}
                                    </thead>
                                    <tbody>
                                        {renderRows}
                                    </tbody>
                                </Table>
                                <p className={days === -1 ? 'd-none' : ''}>Days: {days}</p>
                                <p>{JSON.stringify(this.state)}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default BookingCalendar;