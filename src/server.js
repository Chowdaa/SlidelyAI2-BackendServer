"use strict";
// src/server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const DB_FILE = './src/db.json';
// Middleware
app.use(body_parser_1.default.json());
// Ping endpoint
app.get('/ping', (req, res) => {
    res.json({ success: true });
});
// Submit endpoint
app.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    // Read current submissions from JSON file
    let submissions = [];
    try {
        const data = fs_1.default.readFileSync(DB_FILE, 'utf-8');
        submissions = JSON.parse(data);
    }
    catch (error) {
        console.error('Error reading DB file:', error);
    }
    // Add new submission
    const newSubmission = { name, email, phone, github_link, stopwatch_time };
    submissions.push(newSubmission);
    // Write updated submissions back to JSON file
    fs_1.default.writeFileSync(DB_FILE, JSON.stringify(submissions, null, 2), 'utf-8');
    res.json({ success: true, submission: newSubmission });
});
// Read endpoint
app.get('/read', (req, res) => {
    const { index } = req.query;
    const idx = parseInt(index, 10);
    // Read submissions from JSON file
    let submissions = [];
    try {
        const data = fs_1.default.readFileSync(DB_FILE, 'utf-8');
        submissions = JSON.parse(data);
    }
    catch (error) {
        console.error('Error reading DB file:', error);
    }
    if (idx >= 0 && idx < submissions.length) {
        res.json({ success: true, submission: submissions[idx] });
    }
    else {
        res.status(404).json({ success: false, message: 'Submission not found' });
    }
});
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
