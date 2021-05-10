import React from 'react';
import { Card, Row, Col, FormControl, Form, Table, Spinner } from 'react-bootstrap';
import { colors } from '../../constants/theme';
import { Alert, Button } from '../CustomComponents';
import MyDate from "../../utils/DateUtils";
import BookingService from "../../services/clientServices/BookingService";

class BookingCalendar extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            selectedYear: MyDate.currentYear(),
            selectedMonth: MyDate.currentMonth(),
            booked: [],
            isLoading: true
        };

        this.getBookingsFromMonth = this.getBookingsFromMonth.bind(this);
        this.addBooking = this.addBooking.bind(this);
        this.monthChange = this.monthChange.bind(this);
        this.yearChange = this.yearChange.bind(this);
        this.getBookingsFromMonth();
    }

    monthChange(month) {
        this.setState({ selectedMonth: month, isLoading: true, booked: [] }, this.getBookingsFromMonth);
    }

    yearChange(year) {
        this.setState({ selectedYear: year, isLoading: true, booked: [] }, this.getBookingsFromMonth);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.space !== this.props.space) {
            this.setState({ startDate: null, endDate: null, isLoading: true, booked: [] }, this.getBookingsFromMonth);
        }
    }

    addBooking(e) {
        e.preventDefault();
        let ele = e.target.elements;
        const booking = {
            spaceId: ele.spaceId.value,
            sellerName: ele.seller.value,
            revenue: ele.revenue.value,
            startDate: MyDate.iso(this.state.startDate),
            endDate: MyDate.iso(this.state.endDate),
            bookingDate: MyDate.iso(new Date(Date.now()))
        }

        BookingService.addBooking(booking, this.props.user.staffId)
            .then(response => response.data)
            .then(result => {
                let msg = result === '' ? 'Error' : 'Success';
                this.setState({ msg: msg, isLoading: true }, this.getBookingsFromMonth);
            })
            .catch(error => this.setState({ msg: error.message }));
    }

    getBookingsFromMonth() {
        if (this.props.space) {
            let month = `${this.state.selectedYear}-${(this.state.selectedMonth + 1)}`;
            BookingService.getBookingsFromMonthAndId(month, this.props.space)
                .then(response => response.data)
                .then(bookings => {
                    var booked = [];
                    bookings.forEach(booking => {
                        booked = booked.concat(MyDate.range(booking.startDate, booking.endDate, 'iso'));
                    });
                    this.setState({ booked: booked, isLoading: false });
                })
                .catch(error => console.log(error));
        }
    }

    handleClick(dateObj) {
        var s = this.state.startDate, e = this.state.endDate;
        if (s && e) {
            let c1 = MyDate.compare(s, dateObj);
            let c2 = MyDate.compare(e, dateObj);
            if (c1 === 0 && c2 === 0) {
                s = null; e = null;
            }
            else if (c1 === 0) e = dateObj;
            else if (c2 === 0) s = dateObj;
            else if (c1 > 0) s = dateObj;
            else e = dateObj;
        }
        else {
            s = dateObj; e = dateObj;
        }
        if (s && e) {
            let list = MyDate.range(s, e, 'iso');
            for (let i = 0; i < list.length; ++i) {
                if (this.state.booked.includes(list[i])) break;
                e = new Date(list[i]);
            }
        }
        this.setState({ startDate: s, endDate: e });
    }

    render() {

        if (!this.props.space) return <></>;
        else if (this.state.isLoading) return <Spinner animation="border" />;
        else {
            const RenderHeader = () => {

                let curDate = new Date(Date.now())
                let currentYear = curDate.getFullYear();
                let currentMonth = curDate.getMonth();

                const Months = () => {

                    let options = MyDate.months.map((month, index) => {
                        return (<option key={index} value={index}>{month}</option>);
                    });

                    return options.filter((val, index) => {
                        return currentYear !== this.state.selectedYear || currentMonth <= index;
                    });
                }

                const Years = () => {

                    return [currentYear, currentYear + 1].map(year => {
                        return (<option key={year} value={year}>{year}</option>);
                    });
                }

                return (
                    <Card.Header style={{ background: colors.dark, color: colors.light }}>
                        <Form>
                            <Form.Row className="justify-content-center">
                                <Col xs={12} sm={6} lg={4} className="pb-2 pb-sm-0">
                                    <FormControl as="select" defaultValue={this.state.selectedMonth}
                                        onChange={e => this.monthChange(parseInt(e.target.value))} >
                                        <Months />
                                    </FormControl>
                                </Col>
                                <Col xs={12} sm={6} lg={4}>
                                    <FormControl as="select" defaultValue={this.state.selectedYear}
                                        onChange={e => this.yearChange(parseInt(e.target.value))}>
                                        <Years />
                                    </FormControl>
                                </Col>
                            </Form.Row>
                        </Form>
                    </Card.Header>
                );
            };

            const TableRow = ({ row }) => {
                return row.map((dateObj, index) => {
                    if (!dateObj) return <td key={index}></td>;
                    else {
                        let variant = "outline-success", disabled = false;
                        if (new Date(Date.now()) > dateObj) { variant = "secondary"; disabled = true; }
                        else if (this.state.booked.includes(MyDate.iso(dateObj))) { variant = "danger"; disabled = true; }
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

            const TableBody = () => {

                let table = [], rowi = 0;
                let fd = new Date(this.state.selectedYear, this.state.selectedMonth, 1);
                let ld = MyDate.lastDate(this.state.selectedYear, this.state.selectedMonth);

                for (var i = 1; i <= 6; ++i) {
                    let row = [];
                    for (var j = 0; j <= 6; ++j) row.push(null);
                    table.push(row);
                }

                MyDate.range(fd, ld, 'date').forEach(d => {
                    let day = d.getDay();
                    if (day === 0) rowi++;
                    table[rowi][day] = d;
                });

                return table.map((row, index) => {
                    return (
                        <tr key={index}>
                            <TableRow row={row} />
                        </tr>
                    )
                });
            };

            const RenderTable = () => {
                return (
                    <Table responsive>
                        <thead>
                            <tr>
                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (<th key={i}>{day}</th>))}
                            </tr>
                        </thead>
                        <tbody>
                            <TableBody />
                        </tbody>
                    </Table>
                );
            }

            const SlotInfo = () => {

                let info = {
                    'outline-success': 'Available',
                    'success': 'Selected',
                    'danger': 'Booked',
                    'secondary': 'Unavailable'
                }

                return Object.entries(info).map(([variant, status], idx) => {
                    return (
                        <div key={idx} className="mt-2">
                            <Button variant={variant} disabled={variant === 'danger' || variant === 'secondary'}>0</Button>
                            <span className="ml-3">{status}</span>
                        </div>
                    );
                });
            }

            const BookingDetails = () => {

                const totalDays = MyDate.diffDays(this.state.startDate, this.state.endDate);

                let bookingInfo = {
                    'Start Date': MyDate.format(this.state.startDate),
                    'End Date': MyDate.format(this.state.endDate),
                    'No of days': totalDays,
                    'Cost per Day': 'Rs ' + this.props.mall.spaceCost
                }

                const BookingInfo = () => {
                    return Object.entries(bookingInfo).map(([label, value], idx) => {
                        return (
                            <Row key={idx} className="mt-2">
                                <Col>{label}</Col>
                                <Col>{value}</Col>
                            </Row>
                        );
                    })
                }

                const revenue = this.props.mall.spaceCost * totalDays;

                return (
                    <Form onSubmit={this.addBooking}>
                        <Row>
                            <Col>Space ID</Col>
                            <Col>{this.props.space}</Col>
                            <FormControl type="hidden" name="spaceId" value={this.props.space} />
                        </Row>
                        <BookingInfo />
                        <Row className="mt-2">
                            <Col>Revenue</Col>
                            <Col>Rs {revenue}</Col>
                            <FormControl type="hidden" name="revenue" value={revenue} />
                        </Row>
                        <Row className="mt-2">
                            <Col>Seller</Col>
                            <Col><FormControl placeholder="Seller Name" className="add-shadow-small"
                                type="text" name="seller" required /></Col>
                        </Row>

                        <Button type="submit" variant="dark" className="mt-3 mb-3"
                            disabled={revenue === 0}>Book</Button>
                        <Alert msg={this.state.msg} onClose={() => this.setState({ msg: null })} />
                    </Form>
                );
            };

            return (
                <Card className="add-shadow-small border-0">
                    <RenderHeader />
                    <Card.Body>
                        <RenderTable />
                        <Row>
                            <Col xs={12} sm={4}><SlotInfo /></Col>
                            <Col xs={12} sm={8} className="mt-3 mt-sm-0"><BookingDetails /></Col>
                        </Row>
                    </Card.Body>
                </Card>
            );
        }
    }
}

export default BookingCalendar;