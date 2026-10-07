import express from "express";
const app = express();
const PORT = 5000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Expense Tracker Api is Running");
});
app.listen(PORT, () => {
  console.log(`server running on Port ${PORT}`);
});
