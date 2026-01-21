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
    // Database: InternshipSystem, Collection: internships
    const db = client.db("InternshipSystem");
    collection = db.collection("internships");
    console.log("DB Connected!");
}
connectDB();

// 1. POST: Store Internship Details
app.post("/add-internship", async (req, res) => {
    const { Student_ID, Name, Company, Duration, Status } = req.body;
    
    const data = { Student_ID, Name, Company, Duration, Status };
    
    await collection.insertOne(data);
    res.json({ message: "Internship Data Saved" });
});

// 2. GET: Display students interning at 'Infosys'
app.get("/infosys-interns", async (req, res) => {
    // Filter specifically for Company: "Infosys"
    const list = await collection.find({ Company: "Infosys" }).toArray();
    res.json(list);
});

// 3. PUT: Update status to 'Completed'
app.put("/mark-completed", async (req, res) => {
    const { Student_ID } = req.body;

    // Find student by ID and set Status to "Completed"
    await collection.updateOne(
        { Student_ID: Student_ID },
        { "$set": { Status: "Completed" } }
    );
    
    res.json({ message: "Internship Marked as Completed" });
});

app.listen(3000, () => { console.log("Server: http://localhost:3000"); });