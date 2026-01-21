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
    // Database: HospitalDB, Collection: hospitals
    const db = client.db("HospitalDB");
    collection = db.collection("hospitals");
    console.log("DB Connected!");
}
connectDB();

// 1. POST: Store Hospital Details
app.post("/add-hospital", async (req, res) => {
    const { Hospital_ID, Name, Location, Total_Beds, Occupied_Beds } = req.body;
    
    // Store numbers as actual Numbers for math operations
    const data = { 
        Hospital_ID, 
        Name, 
        Location, 
        Total_Beds: Number(Total_Beds), 
        Occupied_Beds: Number(Occupied_Beds) 
    };
    
    await collection.insertOne(data);
    res.json({ message: "Hospital Added Successfully" });
});

// 2. GET: Display hospitals with Available Beds < 10
app.get("/low-beds", async (req, res) => {
    // Get all hospitals first
    const allHospitals = await collection.find().toArray();
    
    // Filter in JS: (Total - Occupied) < 10
    const results = allHospitals.filter(h => (h.Total_Beds - h.Occupied_Beds) < 10);
    
    res.json(results);
});

// 3. POST: Admit a patient (Increments Occupied_Beds)
app.post("/admit-patient", async (req, res) => {
    const { Hospital_ID } = req.body;

    // Use $inc to increase Occupied_Beds by 1
    await collection.updateOne(
        { Hospital_ID: Hospital_ID },
        { "$inc": { Occupied_Beds: 1 } }
    );
    
    res.json({ message: "Patient Admitted (Bed Count Increased)" });
});

app.listen(3000, () => { console.log("Server: http://localhost:3000"); });