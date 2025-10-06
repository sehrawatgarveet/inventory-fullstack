import React, { useState } from "react";
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Slider, Button } from "@mui/material";
import { saveAs } from "file-saver";

function SettingsSection({ products, darkMode, setDarkMode, language, setLanguage, translations }) {
  const [lowStockThreshold, setLowStockThreshold] = useState(5);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleExportCSV = () => {
    if (!products || products.length === 0) {
      alert("No products to export!");
      return;
    }

    // Prepare CSV headers and rows
    const headers = ["Name", "Category", "Stock", "Price"];
    const rows = products.map(p => [
      p.name,
      p.category,
      p.stock,
      `₹${p.price.toLocaleString()}` // format price with commas
    ]);

    const csvContent =
      [headers, ...rows]
        .map(e => e.join(",")) // join columns by comma
        .join("\n");           // join rows by newline

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "inventory.csv");
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        {translations.settings}
      </Typography>

      {/* Dark Mode Toggle */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography>{darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}</Typography>
        <Button variant="contained" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Switch to Light" : "Switch to Dark"}
        </Button>
      </Box>

      {/* Language Selection */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>{translations.language}</InputLabel>
        <Select
          value={language}
          label={translations.language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="hi">Hindi</MenuItem>
          <MenuItem value="de">German</MenuItem>
          <MenuItem value="fr">French</MenuItem>
        </Select>
      </FormControl>

      {/* Low Stock Threshold */}
      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>{translations.lowStockThreshold}: {lowStockThreshold}</Typography>
        <Slider
          value={lowStockThreshold}
          min={1}
          max={20}
          step={1}
          onChange={(e, val) => setLowStockThreshold(val)}
          valueLabelDisplay="auto"
        />
      </Box>

      {/* Rows Per Page */}
      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>{translations.rowsPerPage}: {rowsPerPage}</Typography>
        <Slider
          value={rowsPerPage}
          min={1}
          max={20}
          step={1}
          onChange={(e, val) => setRowsPerPage(val)}
          valueLabelDisplay="auto"
        />
      </Box>

      {/* Export Inventory CSV */}
      <Box sx={{ textAlign: "center" }}>
        <Button variant="contained" color="success" onClick={handleExportCSV}>
          {translations.exportCSV}
        </Button>
      </Box>
    </Box>
  );
}

export default SettingsSection;
