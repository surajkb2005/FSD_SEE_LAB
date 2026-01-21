const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());             // For parsing JSON data from the frontend
app.use(express.static(__dirname));  // Serves index.html automatically at localhost:3000

// 1. Database Configuration
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
let collection;

async function connectDB() {
    await client.connect();
    const db = client.db("ComplaintManagement");
    collection = db.collection("complaints");
    console.log("DB Connected!");
}
connectDB();

// 2. POST: Submit a new complaint
app.post("/submit-complaint", async (req, res) => {
    // Each complaint includes ID, Name, Issue, and Status
    const { complaintId, userName, issue } = req.body;
    const data = { complaintId, userName, issue, status: "Pending" };
    
    await collection.insertOne(data);
    res.json({ message: "Complaint Submitted" });
});

// 3. PUT: Update complaint status (e.g., "In Progress", "Resolved")
app.put("/update-status", async (req, res) => {
    const { complaintId, newStatus } = req.body;

    await collection.updateOne(
        { complaintId: complaintId },
        { "$set": { status: newStatus } }
    );
    
    res.json({ message: "Status Updated" });
});

// 4. GET: Retrieve all complaints that are currently pending
app.get("/pending-complaints", async (req, res) => {
    const list = await collection.find({ status: "Pending" }).toArray();
    res.json(list);
});

app.listen(3000, () => { 
    console.log("Server running on http://localhost:3000"); 
});