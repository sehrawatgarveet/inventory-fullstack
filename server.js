import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";   // ✅ Import CORS
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

// ✅ Enable CORS (allow requests from React frontend)
app.use(cors({
  origin: "http://localhost:3000",  // allow only React dev server
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

// Middleware
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
