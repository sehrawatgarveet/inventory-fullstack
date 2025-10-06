import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, default: 0 },
  price: { type: Number, required: true },
  expiryDate: { type: Date }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
