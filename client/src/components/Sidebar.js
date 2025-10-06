import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import ReportIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";

const Sidebar = ({ selected, setSelected }) => {
  const drawerWidth = 220;

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, key: "dashboard" },
    { text: "Products", icon: <InventoryIcon />, key: "products" },
    { text: "Categories", icon: <CategoryIcon />, key: "categories" },
    { text: "Reports", icon: <ReportIcon />, key: "reports" },
    { text: "Users", icon: <PeopleIcon />, key: "users" },
    { text: "Settings", icon: <SettingsIcon />, key: "settings" }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#1e1e2f",
          color: "#fff",
        }
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map(item => (
          <ListItem
            button
            key={item.key}
            selected={selected === item.key}
            onClick={() => setSelected(item.key)}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#3a3a5c",
                borderLeft: "4px solid #1976d2",
                transform: "scale(1.05)"
              },
              "&:hover": {
                backgroundColor: "#2c2c4c",
                transform: "scale(1.05)",
                transition: "all 0.2s ease"
              },
              transition: "all 0.2s ease"
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
