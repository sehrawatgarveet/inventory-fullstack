import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import axios from "axios";

const ProductForm = ({ onAdded }) => {
  const [form, setForm] = useState({ name: "", category: "", stock: 0, price: 0 });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/products", form);
    setForm({ name: "", category: "", stock: 0, price: 0 });
    onAdded();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} sx={{ mt: 1 }}>
        <TextField label="Name" name="name" value={form.name} onChange={handleChange} required />
        <TextField label="Category" name="category" value={form.category} onChange={handleChange} required />
        <TextField label="Stock" type="number" name="stock" value={form.stock} onChange={handleChange} />
        <TextField label="Price (₹)" type="number" name="price" value={form.price} onChange={handleChange} required />
        <Button type="submit" variant="contained" color="success">Save</Button>
      </Stack>
    </form>
  );
};

export default ProductForm;
