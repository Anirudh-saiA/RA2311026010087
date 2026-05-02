const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzYTMyNTFAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMjg4NywiaWF0IjoxNzc3NzAxOTg3LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiOGM1MmI1ZDctOTFmYi00MWUxLWE3MjAtOTcxZWQ5ZGMzN2JmIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYW5rYW0gc2FpIGFuaXJ1ZGgiLCJzdWIiOiJmZGQ2YWE2Yi04NDJjLTQwYzgtOGU1NS1jY2I0YWYxNDAyNzYifSwiZW1haWwiOiJzYTMyNTFAc3JtaXN0LmVkdS5pbiIsIm5hbWUiOiJhbmthbSBzYWkgYW5pcnVkaCIsInJvbGxObyI6InJhMjMxMTAyNjAxMDA4NyIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6ImZkZDZhYTZiLTg0MmMtNDBjOC04ZTU1LWNjYjRhZjE0MDI3NiIsImNsaWVudFNlY3JldCI6IlVySmRKUURXZUFwS1l2TVUifQ.ARskKarS-brmqWlzEi-PwuUg416uE0wCB9gPsc8nrNc";

export const fetchNotifications = async (params = "") => {
  const res = await fetch(
    `http://20.207.122.201/evaluation-service/notifications${params}`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );

  return res.json();
};