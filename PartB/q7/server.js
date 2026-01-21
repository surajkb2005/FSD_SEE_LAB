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
    // Database: CourseDB, Collection: enrollments
    const db = client.db("CourseDB");
    collection = db.collection("enrollments");
    console.log("DB Connected!");
}
connectDB();

// 1. POST: Accept and store enrollment details
app.post("/enroll", async (req, res) => {
    const { Student_ID, Name, Course_Name, Duration, Status } = req.body;
    
    const data = { Student_ID, Name, Course_Name, Duration, Status };
    
    await collection.insertOne(data);
    res.json({ message: "Enrollment Successful" });
});

// 2. GET: Display all active enrollments
app.get("/active-courses", async (req, res) => {
    // Filter for Status: "active" (case-sensitive)
    const list = await collection.find({ Status: "active" }).toArray();
    res.json(list);
});

// 3. PUT: Update status to 'completed' based on Student_ID
app.put("/complete-course", async (req, res) => {
    const { Student_ID } = req.body;

    // Find by Student_ID and set Status to "completed"
    await collection.updateOne(
        { Student_ID: Student_ID },
        { "$set": { Status: "completed" } }
    );
    
    res.json({ message: "Course Status Updated to Completed" });
});

app.listen(3000, () => { console.log("Server: http://localhost:3000"); });