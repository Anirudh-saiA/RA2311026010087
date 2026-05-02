import React, { useEffect, useState } from "react";
import { fetchNotifications } from "../api";
import { Card, CardContent, Typography, Chip } from "@mui/material";

const getColor = (type) => {
  if (type === "Placement") return "success";
  if (type === "Event") return "primary";
  return "warning";
};

export default function TopNotifications() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchNotifications("?limit=20&page=1").then((res) => {
      const priority = { Placement: 3, Result: 2, Event: 1 };

      const sorted = (res.notifications || []).sort((a, b) => {
        if (priority[b.Type] !== priority[a.Type]) {
          return priority[b.Type] - priority[a.Type];
        }
        return new Date(b.Timestamp) - new Date(a.Timestamp);
      });

      setData(sorted.slice(0, 10));
    });
  }, []);

  return (
    <div>
      <h2>🔥 Top Notifications</h2>

      {data.map((n) => (
        <Card
          key={n.ID}
          style={{
            margin: "10px 0",
            background: "#fff3cd",
            transition: "0.3s",
          }}
        >
          <CardContent>
            <Chip label={n.Type} color={getColor(n.Type)} size="small" />

            <Typography variant="h6" style={{ marginTop: "5px" }}>
              {n.Message}
            </Typography>

            <Typography variant="caption" color="textSecondary">
              {n.Timestamp}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}