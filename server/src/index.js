require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");

const flightsRouter = require("./routes/flights.js");

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

//routes
app.use("/api/flights", flightsRouter);

//health
app.get("/health", (req, res) => {
    console.log(req.body)
  res.json({ status: "ok" });
});

// error handler

app.use((err,req,res,next)=>{
    console.log(err);
    res.status(err.status || 500).json({error:err.message || "server_error caught by global error handler"});
});

//start
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MDB");

    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

