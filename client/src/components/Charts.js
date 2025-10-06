import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const Charts = ({ products }) => {
  // Price Ranges only
  const priceRanges = [
    { range: "0-50", count: products.filter(p => p.price <= 50).length },
    { range: "51-100", count: products.filter(p => p.price > 50 && p.price <= 100).length },
    { range: "101-200", count: products.filter(p => p.price > 100 && p.price <= 200).length },
    { range: "200+", count: products.filter(p => p.price > 200).length },
  ];

  return (
    <Card sx={{ p: 2, boxShadow: 3, "&:hover": { transform: "translateY(-5px)", boxShadow: 6 }, transition: "0.3s" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          Price Ranges
        </Typography>
        <BarChart width={300} height={250} data={priceRanges}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </CardContent>
    </Card>
  );
};

export default Charts;
