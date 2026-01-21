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
    // Database: ProductDB, Collection: products
    const db = client.db("ProductDB");
    collection = db.collection("products");
    console.log("DB Connected!");
}
connectDB();

// 1. POST: Accept product, Calculate Final Price, and Store
app.post("/add-product", async (req, res) => {
    const { Product_ID, Name, Price, Discount, Stock } = req.body;
    
    // Convert strings to numbers for calculation
    const p = Number(Price);
    const d = Number(Discount);
    
    // Calculate Final Price
    const Final_Price = p - (p * d / 100);

    const data = { 
        Product_ID, 
        Name, 
        Price: p, 
        Discount: d, 
        Stock, 
        Final_Price // Storing the calculated value
    };
    
    await collection.insertOne(data);
    res.json({ message: "Product Added with Final Price: " + Final_Price });
});

// 2. GET: Display products where Final_Price < 1000
app.get("/cheap-products", async (req, res) => {
    // $lt means "less than"
    const list = await collection.find({ Final_Price: { $lt: 1000 } }).toArray();
    res.json(list);
});

app.listen(3000, () => { console.log("Server: http://localhost:3000"); });