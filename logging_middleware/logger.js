const axios = require('axios');

// ✅ PASTE YOUR ACCESS TOKEN HERE (ONLY TOKEN)
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzYTMyNTFAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMDc0OCwiaWF0IjoxNzc3Njk5ODQ4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiOTNhYzU1ZWQtYTM0Yy00MDc2LThkY2EtYmU2NzM2OWFjMTIxIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYW5rYW0gc2FpIGFuaXJ1ZGgiLCJzdWIiOiJmZGQ2YWE2Yi04NDJjLTQwYzgtOGU1NS1jY2I0YWYxNDAyNzYifSwiZW1haWwiOiJzYTMyNTFAc3JtaXN0LmVkdS5pbiIsIm5hbWUiOiJhbmthbSBzYWkgYW5pcnVkaCIsInJvbGxObyI6InJhMjMxMTAyNjAxMDA4NyIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6ImZkZDZhYTZiLTg0MmMtNDBjOC04ZTU1LWNjYjRhZjE0MDI3NiIsImNsaWVudFNlY3JldCI6IlVySmRKUURXZUFwS1l2TVUifQ.ZD3cZMH_uCrG2ZiDKzydt5epfxbFG7YZ5tGK_PmB0w4";

async function Log(stack, level, pkg, message) {
  try {
    const response = await axios.post(
      "http://20.207.122.201/evaluation-service/logs",
      {
        stack: stack,
        level: level,
        package: pkg,
        message: message
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ Log created:", response.data);
  } catch (error) {
    console.error("❌ Log failed:", error.response?.data || error.message);
  }
}

module.exports = Log;