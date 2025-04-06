import React from 'react';
import { Modal as BootstrapModal, Table, Row, Col, Card, Accordion, Button } from 'react-bootstrap';

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
                        <BootstrapModal.Title>{statesData[selectedState]?.name}</BootstrapModal.Title>
                    </BootstrapModal.Header>
                    <BootstrapModal.Body>
                        <Table bordered hover>
                            <tbody>
                            <tr>
                                <td>Landeshauptstadt</td>
                                <td>{statesData[selectedState]?.capital}</td>
                            </tr>
                            <tr>
                                <td>Einwohnerzahl</td>
                                <td>{statesData[selectedState]?.population}</td>
                            </tr>
                            </tbody>
                        </Table>

                        <Row className="mb-4">
                            {statesData[selectedState]?.government.map((gov, index) => (
                                <Col sm={6} className="mb-4" key={`gov-${index}`}>
                                    <Card
                                        className="h-100"
                                        style={{
                                            backgroundColor:
                                                statesData["parties"][gov.party]["color"],
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

                        <Accordion>
                            {statesData[selectedState]?.ministries.map((min, index) => (
                                <Accordion.Item eventKey={`min-${index}`} key={`min-${index}`}>
                                    <Accordion.Header>{min.name}</Accordion.Header>
                                    <Accordion.Body>
                                        <Table bordered hover>
                                            <tbody>
                                            <tr>
                                                <td>Minister/in</td>
                                                <td>{min.current+" ("+min.party+")"}</td>
                                            </tr>
                                            <tr>
                                                <td>Adresse</td>
                                                <td>{min.address}</td>
                                            </tr>
                                            </tbody>
                                        </Table>
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
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