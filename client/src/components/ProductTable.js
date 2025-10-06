import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Box, Button } from "@mui/material";
import axios from "axios";

function ProductTable({ products, refresh, setOpenForm, translations }) {
  const [search, setSearch] = useState("");

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      refresh();
    }
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { field: "name", headerName: translations.name, flex: 1 },
    { field: "category", headerName: translations.category, flex: 1 },
    {
      field: "stock",
      headerName: translations.stock,
      flex: 1,
      renderCell: (params) => (
        <span style={{ color: params.row.stock < 5 ? "red" : "inherit" }}>
          {params.row.stock}
        </span>
      ),
    },
    { field: "price", headerName: translations.price, flex: 1 },
    {
      field: "actions",
      headerName: translations.actions,
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => handleDelete(params.row._id)}
        >
          ❌
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filtered}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </div>
    </Box>
  );
}

export default ProductTable;
