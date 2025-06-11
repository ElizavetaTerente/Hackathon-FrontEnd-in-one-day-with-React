import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Container, Row, Col, Card, Tabs, Tab, Pagination, Alert} from 'react-bootstrap';

const TrainingList = () => {
    const [trainings, setTrainings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [trainingsPerPage] = useState(9);
    const [totalTrainings, setTotalTrainings] = useState(0);
    const navigate = useNavigate();

    const fetchTrainingCount = () => {
        fetch('http://localhost:3001/training/all/count', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => setTotalTrainings(data.returnObject))
            .catch(error => {
                console.error('Error fetching count: ', error);
                setError('Failed to fetch training count');
            });
    };

    const fetchTrainings = () => {
        const offset = (currentPage - 1) * trainingsPerPage;
        fetch(`http://localhost:3001/training/all?limit=${trainingsPerPage}&offset=${offset}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setTrainings(data.returnObject);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
                setError('Failed to load trainings');
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchTrainingCount();
        fetchTrainings();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setLoading(true);
    };

    if (loading) return <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>;
    if (error) return <Alert variant="danger">{error}</Alert>;

    const colors = ['border-primary', 'border-secondary', 'border-success', 'border-danger', 'border-warning', 'border-info'];
    const totalPages = Math.ceil(totalTrainings / trainingsPerPage)-9;
    const items = [];
    for (let number = 1; number <= totalPages; number++) {
        items.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
                {number}
            </Pagination.Item>
        );
    }

    return (
        <Container>
            <Container>
            <Row>
    {/*Maps over the trainings array to create a grid of Cards*/}
                {trainings.map((training, index) => (
                    <Col key={training.id} md={4} style={{ marginBottom: '20px' }}>
                        <Card className={colors[index % colors.length]} style={{ boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)' }}>
                            <Card.Header className="text-center" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>{training.title}</Card.Header>
                            <Card.Body>
                                <Card.Subtitle className="mb-2 text-muted">Location: {training.location}</Card.Subtitle>
                                <Card.Text>State: {training.state}</Card.Text>
                                <Card.Text>Language: {training.language}</Card.Text>
                                <Tabs defaultActiveKey="timeFrames" id="uncontrolled-tab-example" className="mb-3">
                                    <Tab eventKey="timeFrames" title="Time Frames">
                                        {training.timeFrames.map(frame => (
                                            <p key={frame.startDate}>
                                                Start: {new Date(frame.startDate).toLocaleDateString()} -
                                                End: {new Date(frame.endDate).toLocaleDateString()}
                                            </p>
                                        ))}
                                    </Tab>
                                    <Tab eventKey="learningCards" title="Learning Cards">
                                        {training.learningCards.map(card => (
                                            <p key={card.id}>{card.title}</p>
                                        ))}
                                    </Tab>
                                </Tabs>
                            </Card.Body>
                            <Card.Footer>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => navigate(`/statistics/${training.id}`)}
                                >Statistics</button>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
            </Container>
            <Container>
            <Pagination className="justify-content-center" style={{ marginTop: '20px' }}>
                <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                <Pagination.Item>{`Page ${currentPage} of ${totalPages}`}</Pagination.Item>
                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
            </Pagination>
            </Container>
        </Container>
    );
};

export default TrainingList;
