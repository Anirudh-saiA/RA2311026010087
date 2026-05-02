import React from "react";
import TopNotifications from "./components/TopNotifications";
import AllNotifications from "./components/AllNotifications";

function App() {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "auto",
        padding: "20px",
        fontFamily: "Segoe UI",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        📢 Notifications Dashboard
      </h1>

      <TopNotifications />
      <AllNotifications />
    </div>
  );
}

export default App;