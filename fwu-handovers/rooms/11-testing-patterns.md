# Technical Handover: Room - Frontend

## 11. Testing Patterns

*See [board-frontend-handover.md §9](board-frontend-handover.md#9-testing-patterns) for general testing patterns.*

### Room-Specific Test Factories

Test utilities are available in `tests/test-utils/factory/room/`:

| Factory | Purpose |
|---------|---------|
| `roomFactory.ts` | Creates Room objects |
| `roomItemResponseFactory.ts` | Creates API response objects with `allowedOperations` |
| `roomMembersFactory.ts` | Creates member mock data |
| `roomInvitationLinkFactory.ts` | Creates invitation link mocks |
| `roomStatsItemResponseFactory.ts` | Creates admin room stats |

### Example Test Patterns

```typescript
// Using room factories with allowedOperations
const room = roomItemResponseFactory.build({
    allowedOperations: {
        addMembers: true,
        deleteRoom: false,
    }
});

// Testing admin mode toggle
const roomMembersStore = useRoomMembersStore();
roomMembersStore.setAdminMode(true);
await roomMembersStore.fetchMembers();
// Verify getMembersRedacted was called instead of getMembers

// Testing member permissions
const member = roomMembersFactory.build({
    allowedOperations: {
        changeRole: true,
        passOwnershipTo: false,
        removeMember: true,
    }
});
```