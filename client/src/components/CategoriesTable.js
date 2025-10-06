import React from "react";
import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

function CategoriesTable({ products, darkMode, translations }) {
  const categoryCounts = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  const tableStyle = {
    background: darkMode ? "#2c2c2c" : "#fff",
    color: darkMode ? "#fff" : "#000",
    borderRadius: 2,
  };

  return (
    <Paper sx={{ p: 3, mt: 3, ...tableStyle }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {translations.categories}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{translations.category}</TableCell>
            <TableCell>{translations.totalProducts}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(categoryCounts).map((cat) => (
            <TableRow key={cat}>
              <TableCell>{cat}</TableCell>
              <TableCell>{categoryCounts[cat]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default CategoriesTable;
