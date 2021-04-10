import React from "react";
import { Container } from "react-bootstrap";
import BookingCalendar from "./CalendarComponent";

class StaffBooking extends React.Component {

    render() {

        return (
            <Container fluid>
                <h1 className="pt-5">Bookings</h1>
                <hr />
                <BookingCalendar />
            </Container>
        );
    }
}

export default StaffBooking;