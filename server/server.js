const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.join(__dirname, '..', 'public/');

// Heroku port
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

/**
 * For all requests, route to index.html,
 * AppRouter does static routing after that
 */
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log('Server running');
});