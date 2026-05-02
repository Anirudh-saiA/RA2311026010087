#  Notification System Design

##  Stage 1 & Stage 2 Overview

This project implements a **Campus Notifications System** that fetches real-time notifications from a protected API, prioritizes important notifications, and displays them through a responsive frontend interface.

The system is divided into:

* **Stage 1** → Backend logic + priority handling
* **Stage 2** → Frontend UI + filtering + pagination

---

#  System Architecture

```
External API (AffordMed)
        ↓
Backend (Node.js + Express)
        ↓
Frontend (React + Material UI)
```

### Components:

1. **External API**

   * Provides notifications data
   * Requires Bearer token authentication

2. **Backend (Node.js)**

   * Fetches notifications securely
   * Applies priority logic
   * Logs API activity using logging middleware
   * Exposes endpoint:

     ```
     GET /notifications/top
     ```

3. **Frontend (React)**

   * Displays:

     * Top notifications
     * All notifications
   * Supports:

     * Filtering
     * Pagination
     * Read/unread state

---

#  Priority Logic

Notifications are ranked using **multi-factor priority**:

###  Priority Order

```
Placement > Result > Event
```

### Recency

Within same type:

* Newer notifications are ranked higher

###  Sorting Logic

```javascript
const priority = {
  Placement: 3,
  Result: 2,
  Event: 1
};

notifications.sort((a, b) => {
  if (priority[b.Type] !== priority[a.Type]) {
    return priority[b.Type] - priority[a.Type];
  }
  return new Date(b.Timestamp) - new Date(a.Timestamp);
});
```

---

#  Top N Notifications

* After sorting → top **N = 10** selected
* Returned via backend API:

```
GET /notifications/top
```

---

#  Handling Continuous Updates

New notifications keep coming from API.

### Strategy:

* Always fetch latest data from API
* Re-run sorting logic on every request
* No database required (as per instructions)
* Ensures:

  * Real-time accuracy
  * No stale data

---

#  Authentication Flow

1. Register → get access code
2. Authenticate → receive token
3. Use token in requests:

```
Authorization: Bearer <access_token>
```

---

#  Logging Middleware

Implemented custom logging:

### Features:

* Logs every API call
* Tracks success & failure
* Sends logs to evaluation service

Example log:

```json
{
  "logID": "abc123",
  "message": "log created successfully"
}
```

---

#  Frontend Features (Stage 2)

###  Top Notifications

* Displays top 10 prioritized notifications
* Card-based UI
* Color-coded types

###  All Notifications

* Filter by:

  * Event
  * Result
  * Placement
* Pagination support

###  Read / Unread

* Click → mark as read
* Visual difference using UI styling

---

#  UI/UX Design Decisions

* Material UI used for clean design
* Cards for better readability
* Chips for notification type
* Minimal and responsive layout
* Focus on clarity and hierarchy

---

#  Performance Considerations

* Sorting done in-memory (small dataset)
* No database overhead
* Efficient filtering using query params
* Fast rendering using React state

---

#  Constraints Followed

✔ No database used
✔ No hardcoded notifications
✔ API-based dynamic data
✔ Responsive frontend
✔ Proper authentication handling

---

#  Conclusion

This system ensures:

* Real-time notification delivery
* Intelligent prioritization
* Clean and user-friendly interface
* Scalable design for future extensions

---

#  Future Improvements

* Push notifications (WebSockets)
* User-specific preferences
* Notification grouping
* Backend caching for performance
* Persistent read/unread state

---
