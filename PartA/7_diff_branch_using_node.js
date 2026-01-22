const express = require("express"); 
const app = express(); 

app.get("/", (req, res) => { 
    res.send(`
        <body>
            <h1>Welcome to the Branch Selection Page</h1>
            <p>Select a branch:</p>
            <ul>
                <li><a href="/cse">CSE</a></li>
                <li><a href="/ece">ECE</a></li>
                <li><a href="/mech">Mechanical</a></li>
            </ul>
        </body>
    `);
});

app.get("/cse", (req, res) => { 
    // Added background color and font styling
    res.send(`
        <body style="background-color: lightblue; font-family: 'Courier New', Courier, monospace;">
            <h1>CSE Branch</h1>
            <p>Computer Science and Engineering</p>
        </body>
    `); 
}); 

app.get("/ece", (req, res) => { 
    res.send(`
        <body style="background-color: lightgreen; font-family: Arial, sans-serif;">
            <h1>ECE Branch</h1>
            <p>Electronics and Communication Engineering</p>
        </body>
    `); 
}); 

app.get("/mech", (req, res) => { 
    res.send(`
        <body style="background-color: mistyrose; font-family: Georgia, serif;">
            <h1>Mechanical Branch</h1>
            <p>Mechanical Engineering</p>
        </body>
    `); 
}); 

app.listen(3000, () => console.log("server running on port 3000"));