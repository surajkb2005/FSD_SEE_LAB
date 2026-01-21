const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());             // For parsing JSON data
app.use(express.static(__dirname));  // Serves index.html at localhost:3000

// 1. Database Configuration
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
let collection;

async function connectDB() {
    await client.connect();
    const db = client.db("StudentExamDB");
    collection = db.collection("students");
    console.log("Student DB Connected!");
}
connectDB();

// 2. POST: Accept student details and store them
app.post("/add-student", async (req, res) => {
    const { Student_name, USN, Semester, Exam_fee } = req.body;
    // Ensure fee is stored as a number for accurate deletion checks
    const data = { 
        Student_name, 
        USN, 
        Semester, 
        Exam_fee: Exam_fee === "" ? null : Number(Exam_fee) 
    };
    await collection.insertOne(data);
    res.json({ message: "Student Data Stored" });
});

// 3. DELETE: Remove students where fee is 0 or null
app.delete("/delete-unpaid", async (req, res) => {
    const result = await collection.deleteMany({
        $or: [ { Exam_fee: 0 }, { Exam_fee: null } ]
    });
    res.json({ message: `Deleted ${result.deletedCount} unpaid records` });
});

// 4. GET: View all students (The "View Option" you requested)
app.get("/view-students", async (req, res) => {
    const students = await collection.find().toArray();
    res.json(students);
});

app.listen(3000, () => { console.log("Server: http://localhost:3000"); });