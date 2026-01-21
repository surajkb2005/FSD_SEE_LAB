const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());             // Handle JSON data
app.use(express.static(__dirname));  // Serve index.html

// Database Configuration
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
let collection;

async function connectDB() {
    await client.connect();
    // Create database named HR with collection called employees
    const db = client.db("HR");
    collection = db.collection("employees");
    console.log("HR Database Connected!");
}
connectDB();

// 1. POST: Store employee details from the web form
app.post("/add-employee", async (req, res) => {
    const { emp_name, email, phone, hire_date, job_title, salary } = req.body;
    
    // Store data, converting salary to a Number for filtering
    const data = { 
        emp_name, email, phone, hire_date, job_title, 
        salary: Number(salary) 
    };
    
    await collection.insertOne(data);
    res.json({ message: "Employee Stored Successfully" });
});

// 2. GET: Display records where salary > 50,000
app.get("/high-salary", async (req, res) => {
    // $gt is the MongoDB operator for "greater than"
    const results = await collection.find({ salary: { $gt: 50000 } }).toArray();
    res.json(results);
});

app.listen(3000, () => { console.log("Server: http://localhost:3000"); });