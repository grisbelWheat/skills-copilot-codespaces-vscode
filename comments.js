// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const port = 3000;

// Use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Read comments from file
const filePath = path.join(__dirname, 'comments.json');
let comments = [];
if (fs.existsSync(filePath)) {
  comments = JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

// Get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Add a new comment
app.post('/comments', (req, res) => {
  const newComment = req.body;
  comments.push(newComment);
  fs.writeFileSync(filePath, JSON.stringify(comments, null, 2));
  res.json(newComment);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});