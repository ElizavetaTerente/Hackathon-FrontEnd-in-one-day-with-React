const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());

// const trainings = Array.from({ length: 50 }, (_, i) => ({
//     id: i + 1,
//     title: `Training ${i + 1}`,
//     location: `Location ${i + 1}`,
//     state: 'Active',
//     language: 'English',
//     date: new Date().toISOString(),
//     timeFrames: [
//         { startDate: new Date().toISOString(), endDate: new Date().toISOString(), prolongation: i % 2 === 0 }
//     ],
//     userStatistics: [
//         {
//             userId: 1,
//             email: `user1@example.com`,
//             completionRate: 0.92,
//             lastActive: new Date().toISOString(),
//             finalExamPassed: true,
//             correctLearningSteps: 30,
//             wrongLearningSteps: 2
//         },
//         {
//             userId: 2,
//             email: `user2@example.com`,
//             completionRate: 0.75,
//             lastActive: new Date().toISOString(),
//             finalExamPassed: false,
//             correctLearningSteps: 21,
//             wrongLearningSteps: 10
//         }
//     ],
//     learningCards: [
//         { id: `card-${i + 1}-1`, title: `Card A for Training ${i + 1}` },
//         { id: `card-${i + 1}-2`, title: `Card B for Training ${i + 1}` }
//     ]
// }));

const trainings = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `Training ${i + 1}`,
    location: `Location ${i + 1}`,
    state: 'Active',
    language: 'English',
    date: new Date().toISOString(),
    timeFrames: [
        {
            startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days ago
            endDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),  // 45 days ago
            prolongation: false
        },
        {
            startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
            endDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),  // 15 days ago
            prolongation: true
        },
        {
            startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
            endDate: new Date(Date.now()).toISOString(),                             // today
            prolongation: i % 2 === 0
        }
    ],
    userStatistics: [
        {
            userId: 1,
            email: `user1@example.com`,
            completionRate: 0.92,
            lastActive: new Date().toISOString(),
            finalExamPassed: true,
            correctLearningSteps: 30,
            wrongLearningSteps: 2
        },
        {
            userId: 2,
            email: `user2@example.com`,
            completionRate: 0.75,
            lastActive: new Date().toISOString(),
            finalExamPassed: false,
            correctLearningSteps: 21,
            wrongLearningSteps: 10
        }
    ],
    learningCards: [
        { id: `card-${i + 1}-1`, title: `Card A for Training ${i + 1}` },
        { id: `card-${i + 1}-2`, title: `Card B for Training ${i + 1}` }
    ]
}));


app.get('/training/all/count', (req, res) => {
    res.json({ returnObject: trainings.length });
});

app.get('/training/all', (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const sliced = trainings.slice(offset, offset + limit);
    res.json({ returnObject: sliced });
});

app.get('/statistics/training', (req, res) => {
    const id = parseInt(req.query.trainingId);
    const training = trainings.find(t => t.id === id);
    if (training) {
        res.json({ returnObject: training });
    } else {
        res.status(404).json({ message: 'Training not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Mock server running at http://localhost:${PORT}`);
});