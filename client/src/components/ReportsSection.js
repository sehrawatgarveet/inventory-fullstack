import React from "react";
import { Typography, Card, CardContent, Grid, List, ListItem, Fade } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const ReportsSection = ({ products }) => {
  // Category Distribution
  const categoryMap = {};
  products.forEach(p => { categoryMap[p.category] = (categoryMap[p.category] || 0) + 1; });
  const categoryData = Object.keys(categoryMap).map(key => ({ name: key, value: categoryMap[key] }));

  // Price Ranges
  const priceRanges = [
    { range: "0-50", count: products.filter(p => p.price <= 50).length },
    { range: "51-100", count: products.filter(p => p.price > 50 && p.price <= 100).length },
    { range: "101-200", count: products.filter(p => p.price > 100 && p.price <= 200).length },
    { range: "200+", count: products.filter(p => p.price > 200).length },
  ];

  // Low Stock Products
  const lowStock = products.filter(p => p.stock < 5);

  // Top 5 Expensive Products
  const topExpensive = [...products].sort((a,b)=>b.price - a.price).slice(0,5);

  // Total Inventory Value
  const totalInventoryValue = products.reduce((sum, p) => sum + p.stock * p.price, 0);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A", "#FF4444"];

  return (
    <Grid container spacing={3}>

      {/* Total Inventory Value */}
      <Grid item xs={12} md={6}>
        <Fade in={true} timeout={500}>
          <Card sx={{ p:2, boxShadow:3, "&:hover": { transform:"translateY(-5px)", boxShadow:6 }, transition:"0.3s" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight:"bold" }}>Total Inventory Value</Typography>
              <Typography variant="h4">₹ {totalInventoryValue.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Fade>
      </Grid>

      {/* Category Pie */}
      <Grid item xs={12} md={6}>
        <Fade in={true} timeout={600}>
          <Card sx={{ p:2, boxShadow:3, "&:hover": { transform:"translateY(-5px)", boxShadow:6 }, transition:"0.3s" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight:"bold" }}>Category Distribution</Typography>
              {categoryData.length === 0 ? <Typography>No products yet</Typography> :
                <PieChart width={300} height={250}>
                  <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {categoryData.map((entry,index)=><Cell key={index} fill={COLORS[index%COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              }
            </CardContent>
          </Card>
        </Fade>
      </Grid>

      {/* Price Range Bar */}
      <Grid item xs={12} md={6}>
        <Fade in={true} timeout={700}>
          <Card sx={{ p:2, boxShadow:3, "&:hover": { transform:"translateY(-5px)", boxShadow:6 }, transition:"0.3s" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight:"bold" }}>Price Ranges</Typography>
              <BarChart width={300} height={250} data={priceRanges}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </CardContent>
          </Card>
        </Fade>
      </Grid>

      {/* Low Stock */}
      <Grid item xs={12} md={6}>
        <Fade in={true} timeout={800}>
          <Card sx={{ p:2, boxShadow:3, "&:hover": { transform:"translateY(-5px)", boxShadow:6 }, transition:"0.3s" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight:"bold" }}>Low Stock Products</Typography>
              {lowStock.length === 0 ? <Typography>No low stock items</Typography> :
                <List>
                  {lowStock.map(p=>(
                    <ListItem key={p._id} sx={{ color:"red", py:0.5, borderBottom:"1px solid #eee" }}>
                      {p.name} ({p.stock})
                    </ListItem>
                  ))}
                </List>
              }
            </CardContent>
          </Card>
        </Fade>
      </Grid>

      {/* Top 5 Expensive */}
      <Grid item xs={12} md={6}>
        <Fade in={true} timeout={900}>
          <Card sx={{ p:2, boxShadow:3, "&:hover": { transform:"translateY(-5px)", boxShadow:6 }, transition:"0.3s" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight:"bold" }}>Top 5 Expensive Products</Typography>
              {topExpensive.length === 0 ? <Typography>No products</Typography> :
                <List>
                  {topExpensive.map(p=>(
                    <ListItem key={p._id} sx={{ py:0.5, borderBottom:"1px solid #eee" }}>
                      {p.name} — ₹{p.price.toLocaleString()}
                    </ListItem>
                  ))}
                </List>
              }
            </CardContent>
          </Card>
        </Fade>
      </Grid>

    </Grid>
  );
};

export default ReportsSection;
