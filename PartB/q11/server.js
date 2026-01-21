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
    // Database: AttendanceDB, Collection: students
    const db = client.db("AttendanceDB");
    collection = db.collection("students");
    console.log("DB Connected!");
}
connectDB();

// 1. POST: Accept details, Calculate Percentage, and Store
app.post("/add-student", async (req, res) => {
    const { Student_ID, Name, Course, Total_Attendance, Classes_Attended } = req.body;
    
    // Convert inputs to numbers for math
    const total = Number(Total_Attendance);
    const attended = Number(Classes_Attended);
    
    // Calculate Percentage
    const percentage = (attended / total) * 100;

    const data = { 
        Student_ID, 
        Name, 
        Course, 
        Total_Attendance: total, 
        Classes_Attended: attended, 
        Attendance_Percentage: percentage // Storing the result
    };
    
    await collection.insertOne(data);
    res.json({ message: "Student Added. Attendance: " + percentage.toFixed(2) + "%" });
});

// 2. GET: Display students with attendance < 75%
app.get("/low-attendance", async (req, res) => {
    // $lt means "less than"
    const list = await collection.find({ Attendance_Percentage: { $lt: 75 } }).toArray();
    res.json(list);
});

app.listen(3000, () => { console.log("Server: http://localhost:3000"); });