import React from "react";
import { Box, Grid, Paper, Typography, Switch } from "@mui/material";

function DashboardStats({ products, darkMode, toggleDarkMode, translations }) {
  const totalProducts = products.length;
  const lowStockItems = products.filter((p) => p.stock < 5).length;
  const totalInventoryValue = products.reduce((sum, p) => sum + p.stock * p.price, 0);

  const cardStyle = {
    p: 3,
    textAlign: "center",
    borderRadius: 2,
    background: darkMode ? "#2c2c2c" : "#fff",
    boxShadow: darkMode
      ? "0 0 10px rgba(0,0,0,0.5)"
      : "0 3px 10px rgba(0,0,0,0.1)",
    color: darkMode ? "#fff" : "#000",
  };

  return (
    <Grid container spacing={3} justifyContent="center" sx={{ mb: 3 }}>
      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={cardStyle}>
          <Typography variant="h6">{translations.totalProducts}</Typography>
          <Typography variant="h4">{totalProducts}</Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={cardStyle}>
          <Typography variant="h6">{translations.lowStockItems}</Typography>
          <Typography variant="h4" sx={{ color: lowStockItems > 0 ? "red" : "inherit" }}>
            {lowStockItems}
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={cardStyle}>
          <Typography variant="h6">{translations.totalInventoryValue}</Typography>
          <Typography variant="h4">₹ {totalInventoryValue.toLocaleString()}</Typography>

        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={cardStyle}>
          <Typography variant="h6">Dark Mode</Typography>
          <Switch checked={darkMode} onChange={toggleDarkMode} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default DashboardStats;
