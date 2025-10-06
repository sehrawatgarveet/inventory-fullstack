import React from "react";
import { Typography, Card, CardContent, List, ListItem } from "@mui/material";

const UsersTable = () => {
  const users = [
    { name: "Admin", role: "Administrator" },
    { name: "John Doe", role: "Staff" },
    { name: "Jane Smith", role: "Manager" }
  ];

  return (
    <Card
      sx={{
        p: 3,
        boxShadow: 3,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": { transform: "translateY(-5px)", boxShadow: 6 }
      }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
          Users
        </Typography>
        <List>
          {users.map((user, i) => (
            <ListItem key={i} sx={{ py: 0.5, borderBottom: "1px solid #eee" }}>
              {user.name} — <strong>{user.role}</strong>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default UsersTable;


