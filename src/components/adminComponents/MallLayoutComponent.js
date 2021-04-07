import React from 'react';
import { Accordion, Card, Col, Container, Row } from 'react-bootstrap';
import { colors } from '../../constants/theme';
import FloorService from "../../services/managementServices/FloorService";
import MallService from '../../services/managementServices/MallService';
import SpaceService from "../../services/managementServices/SpaceService";
import { FaStore } from "react-icons/fa";
import { Button } from "../CustomComponents";

class MallLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = { floors: props.mall.floors };
        this.fetchLayout = this.fetchLayout.bind(this);
        this.addFloor = this.addFloor.bind(this);
        this.addSpace = this.addSpace.bind(this);
    }

    fetchLayout() {
        MallService.get(this.props.mall.mallId)
            .then(response => response.data)
            .then(mall => this.setState({ floors: mall.floors }))
            .catch(error => console.log(error));
    }

    addSpace(floorId, floorIndex) {
        SpaceService.addSpace(floorId)
            .then(response => {
                this.props.refresh();
            })
            .catch(error => console.log(error));
    }

    addFloor(mallId) {
        FloorService.addFloor(mallId)
            .then(response => {
                this.props.refresh();
            })
            .catch(error => console.log(error));
    }

    render() {

        var renderSpaces = (length) => {
            var spaces = [];
            for (var i = 1; i <= length; ++i) {
                spaces.push(
                    <Button key={i} className="mr-2 mb-2" disabled
                        variant="dark">
                        <FaStore />
                    </Button>
                )
            }
            return spaces;
        }

        var renderFloors = this.state.floors.map((floor, index) => {
            return (
                <Card key={index} className="mt-2 add-shadow-small border-0">
                    <Accordion.Toggle as={Card.Header} eventKey={`${index}`} style={{ background: colors.dark, color: colors.light }} >
                        {`${index === 0 ? "Ground Floor" : "Floor" + index} (Total Spaces: ${floor.spaces.length})`}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={`${index}`}>
                        <Card.Body>
                            <Container fluid>
                                {renderSpaces(floor.spaces.length)}
                                <Button className={`mr-2 mb-2 ${floor.spaces.length < 10 ? '' : 'd-none'}`}
                                    variant="dark"
                                    onClick={() => { this.addSpace(floor.floorId, index) }}>
                                    <span className="fa fa-plus"></span>
                                </Button>
                            </Container>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card >
            );
        });
        return (
            <Container fluid className="mt-5 mb-5" >
                <h1>Mall Layout</h1>
                <hr />
                <Row className="justify-content-center">
                    <Col xs={12} md={10} lg={8}>
                        <Accordion defaultActiveKey="0" className="d-flex flex-column flex-column-reverse">
                            {renderFloors}
                        </Accordion>
                    </Col>

                </Row>
                <Row>
                    <Col className="pt-3 offset-md-1 offset-lg-2">
                        <Button variant="dark"
                            className={`add-shadow-small ${this.state.floors.length < 10 ? '' : 'd-none'}`}
                            onClick={() => { this.addFloor(this.props.mall.mallId) }}>
                            <span className="fa fa-plus mr-2"></span>
                            <span>Add Floor</span>
                        </Button>
                    </Col>
                </Row>

            </Container >
        );
    }
}

export default MallLayout;