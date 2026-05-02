import React, { useEffect, useState } from "react";
import { fetchNotifications } from "../api";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
} from "@mui/material";

const getColor = (type) => {
  if (type === "Placement") return "success";
  if (type === "Event") return "primary";
  return "warning";
};

export default function AllNotifications() {
  const [data, setData] = useState([]);
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const [read, setRead] = useState({});

  useEffect(() => {
    let query = `?page=${page}&limit=10`;
    if (type) query += `&notification_type=${type}`;

    fetchNotifications(query).then((res) => {
      setData(res.notifications || []);
    });
  }, [type, page]);

  return (
    <div>
      <h2>📋 All Notifications</h2>

      {/* FILTER */}
      <div style={{ marginBottom: "10px" }}>
        <select
          onChange={(e) => setType(e.target.value)}
          style={{ padding: "5px" }}
        >
          <option value="">All</option>
          <option value="Event">Event</option>
          <option value="Result">Result</option>
          <option value="Placement">Placement</option>
        </select>
      </div>

      {/* CARDS */}
      {data.map((n) => (
        <Card
          key={n.ID}
          onClick={() => setRead({ ...read, [n.ID]: true })}
          style={{
            margin: "10px 0",
            cursor: "pointer",
            background: read[n.ID] ? "#f5f5f5" : "#ffffff",
            borderLeft: read[n.ID]
              ? "5px solid grey"
              : "5px solid #1976d2",
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

      {/* PAGINATION */}
      <div style={{ marginTop: "10px" }}>
        <Button
          variant="contained"
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
        >
          Prev
        </Button>

        <Button
          variant="contained"
          style={{ marginLeft: "10px" }}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}