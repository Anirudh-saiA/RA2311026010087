# Stage 1 – Priority Inbox

## Approach

The system fetches notifications from the provided API and prioritizes them based on importance and recency.

### Priority Rules
- Placement (highest priority)
- Result
- Event (lowest priority)

### Sorting Logic
1. Notifications are assigned weights:
   - Placement = 3
   - Result = 2
   - Event = 1
2. Sorted by:
   - Priority (descending)
   - Timestamp (latest first)

### Output
- Top 10 notifications are returned

### Handling New Notifications
- The system dynamically fetches notifications from the API each time
- Sorting ensures new high-priority notifications automatically appear at the top