# Technical Handover: Board Frontend

## 10. Debugging Hints

When things go wrong, knowing where to look is half the battle. This section covers common issues and how to diagnose them.

### 10.1 Socket Connection Issues

Socket issues are among the most common problems. They can manifest as changes not syncing, operations failing silently, or the board feeling "stuck."

**Check connection state:**
```typescript
// In browser console
localStorage.setItem('debug', 'socket.io-client:*');
// Reload page to see socket.io debug logs
```

**Server-side logging:**
- Connection errors are reported to backend via `BoardErrorReportApiFactory`
- Check server logs for `socketio_connection` error types
- see Grafana boards 
  - for board error logging (e.g. for dev [North* - Board Collaboration - Logging (dev)](https://grafana.dbildungscloud.dev/d/ff788930-13b7-49a3-b99a-d498dccca7e1/north-board-collaboration-logging-dev?orgId=1|ref|prod))
  - for metrics (e.g. for dev [North* - Board Collaboration - Metrics (dev)](https://grafana.dbildungscloud.dev/d/c472e392-ffa0-4d28-9428-fb6330b81258/north-board-collaboration-metrics-dev?orgId=1))

**Common issues:**
| Symptom | Likely Cause | Solution |
|---------|--------------|----------|
| No real-time updates | Socket not connected | Check `FEATURE_COLUMN_BOARD_SOCKET_ENABLED` |
| Connection drops | Network issues | Check browser console for disconnect reasons |
| Changes not syncing | Failure response not handled | Check for `*-failure` events in network tab |

### 10.2 Permission Issues

If a user can't perform an action they should be able to, or if UI elements are missing, permissions are likely the cause. Remember: permissions come from the server, so if they're wrong, the issue is usually server-side.

**Debug permissions:**
```typescript
// In Vue DevTools, check board store
useBoardStore().board?.allowedOperations
```

**Common issues:**
| Symptom | Check |
|---------|-------|
| Button not visible | `allowedOperations.{operation}` value |
| Action fails with 403 | Server-side permission calculation |

### 10.3 State Management Issues

State issues can cause the UI to show incorrect data or not update when expected. Vue DevTools is your best friend for diagnosing these problems.

**Vue DevTools:**
1. Open Vue DevTools → Pinia tab
2. Select `boardStore` or `cardStore`
3. Inspect current state and history

**Manual state inspection:**
```typescript
// In browser console
const boardStore = useBoardStore();
console.log(boardStore.board);
console.log(boardStore.getCardLocation('cardId'));
```

### 10.4 Socket Event Debugging

Sometimes you need to see exactly what's being sent and received over the socket connection. This is especially useful when adding new operations or debugging sync issues.

**Monitor socket events:**
```typescript
// In socket.ts, events are logged via logger
// Enable logging by setting environment variable or using Vue DevTools

// The socket instance logs all events:
instance.onAny((event, payload) => {
    console.log('Socket event:', event, payload);
});
```