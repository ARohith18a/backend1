const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Task = require("./taskModel");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection failed", err));
// Routes
app.get("/", (req, res) => {
     res.send('✅ MERN backend is live and working!');
});
   app.get("/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post("/tasks", async (req, res) => {
    const task = new Task({ text: req.body.text });
    const saved = await task.save();
    res.status(201).json(saved);
});

app.delete("/tasks/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
