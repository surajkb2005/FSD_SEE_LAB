const express = require('express');
const app = express();
const PORT = 3000;

// Variable to track the number of visits
let visitorCount = 0;

// i. Custom Middleware: Logger
const logger = (req, res, next) => {
    const timestamp = new Date().toLocaleString();
    console.log(timestamp," ",req.method,"request to: ",req.url);
    next(); // Pass control to the next middleware function
};

// ii. Custom Middleware: Visitor Counter
const countVisitor = (req, res, next) => {
    visitorCount++;
    console.log("Total visits: ",visitorCount);
    next();
};

// Apply middleware globally
app.use(logger);
app.use(countVisitor);

// Routes
app.get('/', (req, res) => {
    res.send(`<h1>Home Page</h1><p>You are visitor number: ${visitorCount}</p>`);
});

app.get('/about', (req, res) => {
    res.send('<h1>About Page</h1>');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});