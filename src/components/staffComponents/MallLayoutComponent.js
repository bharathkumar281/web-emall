import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaStore } from 'react-icons/fa';
import { colors } from '../../constants/theme';
import { Button } from '../CustomComponents';
import BookingCalendar from './CalendarComponent';

class MallLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(spaceId) {
        if (this.state.selectedSpace === null || this.state.selectedSpace !== spaceId)
            this.setState({ selectedSpace: spaceId });
        else this.setState({ selectedSpace: null });
    }

    render() {
        if (!this.props.mall) return <h2>Nothing to Display !</h2>;
        const renderSpaces = (spaces) => {
            return spaces.map((space, index) => {

                return (
                    <Button key={index} className="mr-2 mb-2"
                        variant={space.spaceId === this.state.selectedSpace ? 'dark' : 'outline-dark'}
                        onClick={() => this.handleClick(space.spaceId)}>
                        <FaStore />
                    </Button>
                );
            })
        }

        const floors = this.props.mall.floors.map((floor, index) => {
            return (
                <Card key={index} className="mb-3 add-shadow-small border-0">
                    <Card.Header style={{ background: colors.dark, color: colors.light }} >
                        {`${index === 0 ? "Ground Floor" : "Floor" + index} (Total Spaces: ${floor.spaces.length})`}
                    </Card.Header>
                    <Card.Body>
                        <Container fluid>
                            {renderSpaces(floor.spaces)}
                        </Container>
                    </Card.Body>
                </Card >
            );
        });

        return (
            <>
                <Container fluid>
                    <h1 className="pt-5">Book Spaces</h1>
                    <hr />
                    <Row className="justify-content-center">
                        <Col xs={12} md={10} lg={8}>
                            <div className="d-flex flex-column-reverse">
                                {floors}
                            </div>
                        </Col>
                        <Col xs={12} md={10} lg={8}>
                            <BookingCalendar mall={this.props.mall} space={this.state.selectedSpace}
                                user={this.props.user} refresh={this.props.refresh} />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default MallLayout;