import express from "express";
import dotenv from "dotenv"
import connectDb from "./utils/db.js";
import cors from "cors"
const app = express();
dotenv.config()
app.use(cors());
app.use(express.json());
connectDb()
app.get("/", (req, res) => {
  res.send("Expense Tracker Api is Running");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on Port ${PORT}`);
});
