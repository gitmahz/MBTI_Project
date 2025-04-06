
const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage for scores (would use a database in production)
let savedScores = [];

// API endpoints
app.post('/save-scores', (req, res) => {
    savedScores = req.body;
    res.status(200).send({ message: 'Scores saved successfully' });
});

app.get('/get-scores', (req, res) => {
    res.json(savedScores);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));