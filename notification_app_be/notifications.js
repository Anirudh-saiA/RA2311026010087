const axios = require('axios');

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzYTMyNTFAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMDk5OSwiaWF0IjoxNzc3NzAwMDk5LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMDY3NGIwYjgtODExNy00NGIzLWE5ZDMtY2ZkMDgyMDZhN2FlIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYW5rYW0gc2FpIGFuaXJ1ZGgiLCJzdWIiOiJmZGQ2YWE2Yi04NDJjLTQwYzgtOGU1NS1jY2I0YWYxNDAyNzYifSwiZW1haWwiOiJzYTMyNTFAc3JtaXN0LmVkdS5pbiIsIm5hbWUiOiJhbmthbSBzYWkgYW5pcnVkaCIsInJvbGxObyI6InJhMjMxMTAyNjAxMDA4NyIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6ImZkZDZhYTZiLTg0MmMtNDBjOC04ZTU1LWNjYjRhZjE0MDI3NiIsImNsaWVudFNlY3JldCI6IlVySmRKUURXZUFwS1l2TVUifQ.anlyBiBzFpaGH_SFYTGJAriON_DAD84fHKdqBtwgGkg";

const priorityMap = {
  placement: 3,
  result: 2,
  event: 1
};

async function getTopNotifications() {
  try {
    const response = await axios.get(
      "http://20.207.122.201/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      }
    );

    let notifications = response.data.notifications;

    // 🔥 Sort logic
    notifications.sort((a, b) => {
      const weightA = priorityMap[a.Type.toLowerCase()];
      const weightB = priorityMap[b.Type.toLowerCase()];

      // Priority first
      if (weightB !== weightA) {
        return weightB - weightA;
      }

      // Then latest timestamp
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    // Return top 10
    return notifications.slice(0, 10);

  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    return [];
  }
}

module.exports = getTopNotifications;