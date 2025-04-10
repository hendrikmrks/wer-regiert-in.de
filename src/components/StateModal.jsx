import React from 'react';
import { Modal as BootstrapModal, Table, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import formatNumber from '../hooks/useFormatNumbers.jsx';
import * as Icon from 'react-bootstrap-icons';

const StateModal = ({
                        selectedState,
                        show,
                        handleClosePopUp,
                        statesData
                    }) => {
    return (
        <>
            {selectedState ? (
                <BootstrapModal size="lg" show={show} onHide={handleClosePopUp}>
                    <BootstrapModal.Header closeButton>
                        <BootstrapModal.Title>{statesData[selectedState]?.name} ({statesData[selectedState]?.capital})</BootstrapModal.Title>
                    </BootstrapModal.Header>
                    <BootstrapModal.Body>
                        <Table bordered hover>
                            <tbody>
                            <tr>
                                <td>Einwohnerzahl</td>
                                <td>
                                    {formatNumber(statesData[selectedState]?.population)}
                                </td>
                            </tr>
                            </tbody>
                        </Table>

                        <Row>
                            {statesData[selectedState]?.government.map((gov, index) => (
                                <Col sm={6} className="mb-4" key={`gov-${index}`}>
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
                                <p>Wahlergebnis nach Zweitstimmen (Anzahl der Sitze)</p>
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

                        <Icon.Calendar /> Letzte Wahl: {statesData[selectedState]?.lastVoteDate}
                    </BootstrapModal.Body>
                    <BootstrapModal.Footer>
                        <Button variant="secondary" onClick={handleClosePopUp}>
                            Schließen
                        </Button>
                    </BootstrapModal.Footer>
                </BootstrapModal>
            ) : null}
        </>
    );
};

export default StateModal;