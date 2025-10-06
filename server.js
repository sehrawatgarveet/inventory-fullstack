import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";   // ✅ Import CORS
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

// ✅ Enable CORS (allow requests from React frontend)
app.use(cors({
  origin: "*",  // allow only React dev server
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

// Middleware
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.get("/", (_req, res) => res.send("Hi from ashu"));

// MongoDB Connection (no app.listen)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Export the app instead of listening
module.exports = app;