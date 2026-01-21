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
    // Database: SchoolDB, Collection: students
    const db = client.db("SchoolDB");
    collection = db.collection("students");
    console.log("DB Connected!");
}
connectDB();

// 1. POST: Store Student Details
app.post("/add-student", async (req, res) => {
    const { Name, USN, Department, Grade } = req.body;
    
    const data = { Name, USN, Department, Grade };
    
    await collection.insertOne(data);
    res.json({ message: "Student Added Successfully" });
});

// 2. PUT: Update Grade by specifying Name
app.put("/update-grade", async (req, res) => {
    const { Name, newGrade } = req.body;

    // Find student by Name and update their Grade
    await collection.updateOne(
        { Name: Name },
        { "$set": { Grade: newGrade } }
    );
    
    res.json({ message: "Grade Updated Successfully" });
});

// 3. GET: Display all student records
app.get("/all-students", async (req, res) => {
    // Empty filter {} means "get everything"
    const list = await collection.find({}).toArray();
    res.json(list);
});

app.listen(3000, () => { console.log("Server: http://localhost:3000"); });