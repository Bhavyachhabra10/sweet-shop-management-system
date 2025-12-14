import express from "express";
import cors from "cors";

const app = express();

app.use(cors());               // ✅ VERY IMPORTANT
app.use(express.json());

const sweets: any[] = [];

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

// Add sweet
app.post("/sweets", (req, res) => {
  const { name, price, quantity } = req.body;

  if (!name || price === undefined || quantity === undefined) {
    return res.status(400).json({ error: "Invalid sweet data" });
  }

  const sweet = { name, price, quantity };
  sweets.push(sweet);

  res.status(201).json(sweet);
});

// Get all sweets
app.get("/sweets", (req, res) => {
  res.status(200).json(sweets);
});

// Delete sweet
app.delete("/sweets/:index", (req, res) => {
  const index = parseInt(req.params.index);

  if (isNaN(index) || index < 0 || index >= sweets.length) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  sweets.splice(index, 1);
  res.status(200).json({ message: "Sweet deleted" });
});

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

export default app;   // ✅ tests ke liye last me