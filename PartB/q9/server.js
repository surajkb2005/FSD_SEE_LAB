const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());             
app.use(express.static(__dirname));  

// Database Configuration
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
let collection;

async function connectDB() {
    await client.connect();
    // Database: CollegeDB, Collection: students
    const db = client.db("CollegeDB");
    collection = db.collection("students");
    console.log("DB Connected!");
}
connectDB();

// 1. POST: Accept and store student details
app.post("/add-student", async (req, res) => {
    const { User_Name, Branch, Semester } = req.body;
    
    const data = { User_Name, Branch, Semester };
    
    await collection.insertOne(data);
    res.json({ message: "Student Added Successfully" });
});

// 2. GET: Display students from 'CSE' branch AND '6th' semester
app.get("/filter-students", async (req, res) => {
    // Filter for BOTH conditions
    const query = { 
        Branch: "CSE", 
        Semester: "6" 
    };
    
    const list = await collection.find(query).toArray();
    res.json(list);
});

app.listen(3000, () => { console.log("Server: http://localhost:3000"); });