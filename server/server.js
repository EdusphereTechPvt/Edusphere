const express = require('express');
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const authRoutes = require('./routes/AuthRoutes');
const requestdemoRoutes = require("./routes/RequestDemoRoutes");

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/requestdemo', requestdemoRoutes);

mongoose.connect(process.env.MONGO_URL, {
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});


app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})