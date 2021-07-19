const express = require("express");
const app = express();
//const userRoutes = require("./routes/user")

app.use((req,res)=>{
    res.json({message: "votre req est bien reçus"})
})




module.exports = app;
