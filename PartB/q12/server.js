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
    // Database: ExamDB, Collection: students
    const db = client.db("ExamDB");
    collection = db.collection("students");
    console.log("DB Connected!");
}
connectDB();

// 1. POST: Accept details, Determine Eligibility, and Store
app.post("/add-student", async (req, res) => {
    const { Student_ID, Name, Subject, Marks } = req.body;
    
    // Convert Marks to Number for comparison
    const marksNum = Number(Marks);
    
    // Logic: Mark as "Not Eligible" if Marks < 20, else "Eligible"
    let status = "Eligible";
    if (marksNum < 20) {
        status = "Not Eligible";
    }

    const data = { 
        Student_ID, 
        Name, 
        Subject, 
        Marks: marksNum, 
        Eligibility_Status: status // Storing the calculated status
    };
    
    await collection.insertOne(data);
    res.json({ message: `Student Added. Status: ${status}` });
});

// 2. GET: Display students who are "Not Eligible"
app.get("/not-eligible", async (req, res) => {
    // Filter specifically for the status we calculated earlier
    const list = await collection.find({ Eligibility_Status: "Not Eligible" }).toArray();
    res.json(list);
});

app.listen(3000, () => { console.log("Server: http://localhost:3000"); });