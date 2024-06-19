// src/server.ts

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = './src/db.json';

// Middleware
app.use(bodyParser.json());

// Ping endpoint
app.get('/ping', (req: Request, res: Response) => {
  res.json({ success: true });
});

// Submit endpoint
app.post('/submit', (req: Request, res: Response) => {
  const { name, email, phone, github_link, stopwatch_time } = req.body;

  // Read current submissions from JSON file
  let submissions: any[] = [];
  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    submissions = JSON.parse(data);
  } catch (error) {
    console.error('Error reading DB file:', error);
  }

  // Add new submission
  const newSubmission = { name, email, phone, github_link, stopwatch_time };
  submissions.push(newSubmission);

  // Write updated submissions back to JSON file
  fs.writeFileSync(DB_FILE, JSON.stringify(submissions, null, 2), 'utf-8');

  res.json({ success: true, submission: newSubmission });
});

// Read endpoint
app.get('/read', (req: Request, res: Response) => {
  const { index } = req.query;
  const idx = parseInt(index as string, 10);

  // Read submissions from JSON file
  let submissions: any[] = [];
  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    submissions = JSON.parse(data);
  } catch (error) {
    console.error('Error reading DB file:', error);
  }

  if (idx >= 0 && idx < submissions.length) {
    res.json({ success: true, submission: submissions[idx] });
  } else {
    res.status(404).json({ success: false, message: 'Submission not found' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
 
