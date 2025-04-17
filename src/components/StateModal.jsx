import React from 'react';
import { Table, Row, Col, Card, Button, Alert, ProgressBar } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import * as Icon from 'react-bootstrap-icons';
import SeatsDiagram from "./SeatsDiagram.jsx";
import Coalition from "./Coalition.jsx";


const StateModal = ({
                        selectedState,
                        show,
                        handleClosePopUp,
                        statesData
                    }) => {
    return (
        <>
            {selectedState ? (
                <Modal size="lg" show={show} onHide={handleClosePopUp}>
                    <Modal.Header closeButton>
                        <Modal.Title>{statesData[selectedState]?.name} ({statesData[selectedState]?.capital})</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>Koalitionsaufbau</h5>
                        <Coalition state={statesData[selectedState]} colors={statesData["parties"]} />
                        <Row>
                            {statesData[selectedState]?.government.map((gov, index) => (
                                <Col className="mb-4" key={`gov-${index}`}>
                                    <Card
                                        className="h-100"
                                        style={{
                                            backgroundColor:
                                                statesData["parties"][gov.party]["color"],
                                            color: "#f7f5f5",
                                        }}
                                    >
                                        <Card.Body>
                                            <Card.Title>{gov.name}</Card.Title>
                                            <Card.Text>
                                                {gov.current + " (" + gov.party + ")"}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>

                        <Row>
                            <Col className="mb-4">
                                <SeatsDiagram state={statesData[selectedState]} colors={statesData["parties"]} />
                            </Col>
                        </Row>

                        <Row>
                            <Col className="mb-4">
                                <h5>Wahlergebnis nach Zweitstimmen (Anzahl der Sitze)</h5>
                                <Table bordered hover>
                                    <tbody>
                                        {statesData[selectedState]?.seats.map((seat) => (
                                            <tr>
                                                <td>{seat.name}</td>
                                                <td>{seat.percent} % ({seat.seats})</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Gesamte Anzahl der Sitze</td>
                                            <td>{statesData[selectedState]["seatsTotal"]}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        {statesData[selectedState]?.notes ? (
                            <Row>
                                <Col>
                                    <Alert variant={"warning"}>
                                        {statesData[selectedState]?.notes}
                                    </Alert>
                                </Col>
                            </Row>
                        ):null}

                        <Row>
                            <Col>
                                <p>
                                <Icon.Calendar /> Letzte Wahl: {statesData[selectedState]?.lastVoteDate}
                                </p>
                            </Col>
                            <Col>
                                <p className={"text-end"}>
                                <Icon.Calendar /> Nächste Wahl: {Number(statesData[selectedState]?.lastVoteDate) + statesData[selectedState]?.cycle}
                                </p>
                            </Col>
                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClosePopUp}>
                            Schließen
                        </Button>
                    </Modal.Footer>
                </Modal>
            ) : null}
        </>
    );
};

export default StateModal;