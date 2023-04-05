const express = require("express")
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

// Making Connection to the server
const app = express()


app.listen(8800, () => {
    console.log("Connected to Server!");
});

// Making Connection to the Database

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "products"
});

// verifying Connection to DB

db.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    else {
        console.log("Connection to database Succesful");
    }
})
// Activating API Usage on front-end
app.use(cors())
// Activiting Client Data Access
app.use(express.json())

// Checking data on browser 

app.get("/", (req, res) => {
    res.json("Hi there I am Your Server Running ")
})

// Fetching Products from the Data Base
app.get("/products", (req, res) => {
    const fetchProducts = "select * from pro";
    db.query(fetchProducts, (err, data) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(data)
        }
    })
})

// Adding Data to the Database

app.post("/products", (req, res) => {
    const addProducts = "insert into pro (`brand`, `name`, `model_no`, `image`, `original_price`, `disc_price`, `overview`, `sale_count`, `ratings`) values(?)"
    const values = [
        req.body.brand,
        req.body.name,
        req.body.model_no,
        req.body.image,
        req.body.original_price,
        req.body.disc_price,
        req.body.overview,
        req.body.sale_count,
        req.body.ratings
    ];
    db.query(addProducts, [values], (err, data) => {
        if (err) {
            return res.json(err.message)
        }
        else {
            return res.json("Data added Successfully")
        }
    })
});


// deleting Products
app.delete("/products/:id",(req,res)=>{
    const productId = req.params.id
    const deleteProducts = "delete from pro where id = ?"
    db.query(deleteProducts, [productId], (err,data)=>{
        if (err) {
            return res.json(err.message)
        }
        else {
            return res.json("Data deleted Successfully")
        }
    })
})