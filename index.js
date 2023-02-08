const { Console } = require('console');
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const connectDB = require('./Services/dbConService')

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());

//connect mongodb
connectDB()
 
app.use('/api/user',require("./Routers/userRoutes"))
    
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
