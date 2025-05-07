const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv =require("dotenv")
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


const User = require("./models/User");
const Tank = require("./models/Tank");


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: "User already exists" });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT);
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ error: "No token" });
  try {
    const data = jwt.verify(token, process.env.JWT);
    req.userId = data.userId;
    next();
  } catch {
    res.status(403).json({ error: "Invalid token" });
  }
};

// Tank Data Routes
app.post("/api/level", async (req, res) => {
  const { tankId, levelPercent } = req.body;
  const tank = await Tank.findOneAndUpdate(
    { tankId },
    { levelPercent, updatedAt: new Date() },
    { upsert: true, new: true }
  );
  res.json(tank);
});

app.get("/api/level", authMiddleware, async (req, res) => {
  const data = await Tank.find();
  res.json(data);
});

app.listen(5000, () => console.log("Server running on port 5000"));
