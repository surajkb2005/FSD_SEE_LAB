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
    // Database: StartupDB, Collection: ideas
    const db = client.db("StartupDB");
    collection = db.collection("ideas");
    console.log("DB Connected!");
}
connectDB();

// 1. POST: Accept and store startup idea
app.post("/add-idea", async (req, res) => {
    const { ID, Team_Name, Title, Domain, Funding_Required } = req.body;
    
    // Store funding as a Number for comparison later
    const data = { 
        ID, 
        Team_Name, 
        Title, 
        Domain, 
        Funding_Required: Number(Funding_Required) 
    };
    
    await collection.insertOne(data);
    res.json({ message: "Startup Idea Submitted Successfully" });
});

// 2. GET: Display 'EdTech' ideas with Funding > 5,00,000
app.get("/high-funding-edtech", async (req, res) => {
    // Filter: Domain is "EdTech" AND Funding is greater than ($gt) 500000
    const query = { 
        Domain: "EdTech", 
        Funding_Required: { $gt: 500000 } 
    };
    
    const list = await collection.find(query).toArray();
    res.json(list);
});

app.listen(3000, () => { console.log("Server: http://localhost:3000"); });