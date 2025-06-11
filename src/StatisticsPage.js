import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Table, Badge, Accordion } from 'react-bootstrap';


const StatisticsPage = () => {
    const { trainingId } = useParams();
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/statistics/training?trainingId=${trainingId}`,
            {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => setStats(data.returnObject))
            .catch(err => console.error("Failed to fetch data", err));
    }, [trainingId]);

    if (!stats) return <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>;
    const colors = ['border-primary', 'border-secondary', 'border-success', 'border-danger', 'border-warning', 'border-info'];

    return (
        <div className="container mt-5">
            <Card className={colors[trainingId-1 % colors.length]}>
                <Card.Header className="text-center" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>{stats.title} - Statistics</Card.Header>
                <Card.Body>
                    <h6>Location: {stats.location}</h6>
                    <h6>State: {stats.state}</h6>
                    <h6>Date: {new Date(stats.date).toLocaleDateString()}</h6>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Time Frames</Accordion.Header>
                            <Accordion.Body>
                                <Table striped bordered hover size="sm">
                                    <thead>
                                    <tr>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Prolongation</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {stats.timeFrames.map((frame, idx) => (
                                        <tr key={idx}>
                                            <td>{new Date(frame.startDate).toLocaleDateString()}</td>
                                            <td>{new Date(frame.endDate).toLocaleDateString()}</td>
                                            <td>{frame.prolongation ? 'Yes' : 'No'}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <Card.Title style={{marginTop : 20, fontStyle : "italic"}}>User Statistics</Card.Title>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Email</th>
                            <th>Completion Rate</th>
                            <th>Last Active</th>
                            <th>Final Exam Passed</th>
                            <th>Correct Learning Steps</th>
                            <th>Wrong Learning Steps</th>
                        </tr>
                        </thead>
                        <tbody>
                        {stats.userStatistics.map(user => (
                            <tr key={user.userId}>
                                <td>{user.email}</td>
                                <td>
                                    <Badge bg="info">{(user.completionRate * 100).toFixed(1)}%</Badge>
                                </td>
                                <td>{user.lastActive ? new Date(user.lastActive).toLocaleDateString() : 'N/A'}</td>
                                <td>
                                    <Badge bg={user.finalExamPassed ? 'success' : 'danger'}>
                                        {user.finalExamPassed ? 'Passed' : 'Failed'}
                                    </Badge>
                                </td>
                                <td>{user.correctLearningSteps}</td>
                                <td>{user.wrongLearningSteps}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    );
};

export default StatisticsPage;
