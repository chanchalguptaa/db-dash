const { Console } = require('console');
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const connectDB = require('./Db_Services/dbConService')

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());

//connect mongodb
connectDB()
 
app.use('/api/user',require("./Routers/userRoute"))
    
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
