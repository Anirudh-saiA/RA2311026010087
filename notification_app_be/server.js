const express = require('express');
const app = express();   // ✅ MUST come before routes

const Log = require('../logging_middleware/logger');
const getTopNotifications = require('./notifications');

app.use(express.json());

// ✅ Existing routes
app.get('/', (req, res) => {
  console.log("➡️ GET / called");
  Log("backend", "info", "route", "GET / called");
  res.send("Server running");
});

app.get('/error', (req, res) => {
  console.log("➡️ GET /error called");
  Log("backend", "error", "handler", "Something went wrong");
  res.send("Error route");
});

// ✅ NEW STAGE 1 ROUTE
app.get('/notifications/top', async (req, res) => {
  console.log("➡️ GET /notifications/top");

  const data = await getTopNotifications();

  res.json({
    topNotifications: data
  });
});

// ✅ START SERVER
app.listen(3000, () => {
  console.log("🚀 Server started on port 3000");
});