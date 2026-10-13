require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const Enquiry = mongoose.model("Enquiry", new mongoose.Schema({
  name: String,
  phone: String,
  eventDate: String,
  guests: Number,
  message: String,
  createdAt: { type: Date, default: Date.now }
}));

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.post("/api/enquiries", async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.body);
    res.status(201).json(enquiry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => console.log("Server on port " + process.env.PORT));
  })
  .catch(err => console.error(err));