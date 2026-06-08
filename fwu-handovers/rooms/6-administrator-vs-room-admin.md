# Technical Handover: Room Frontend

## 6. Administrator vs. Room Owner/Admin

This is a critical distinction in the room module. There are two different flows for managing room members.

### School Administrator Flow

#### Who: Users with `SCHOOL_ADMINISTRATE_ROOMS` permission (typically school administrators)

#### Access: `/administration/rooms/manage` and `/administration/rooms/manage/:roomId`

#### Characteristics:
- Can see ALL rooms at their school (not just rooms they belong to)
- Uses `AdministrationRoom.store.ts` with `roomControllerGetRoomStats()` endpoint
- Can see basic member info via `roomControllerGetMembersRedacted()` (anonymized for privacy)
- Can add members to rooms at their own school
- **Cannot** manage rooms from other schools
- **Cannot** see full member details (names are redacted)

#### Implementation:

```typescript
// AdministrationRoomMembers.page.vue
const roomMembersStore = useRoomMembersStore();
roomMembersStore.setAdminMode(true);  // Switch to admin mode
await fetchMembers();  // Now uses getMembersRedacted endpoint
```

```typescript
// RoomMembers.store.ts - Admin mode changes endpoint
const fetchMembers = async () => {
    const getMembers = _asAdmin 
        ? roomApi.roomControllerGetMembersRedacted 
        : roomApi.roomControllerGetMembers;
    // ...
};
```

### Room Owner/Admin Flow

#### Who: Users who are members of the room with ROOMOWNER or ROOMADMIN role

#### Access: `/rooms/:id/members`

#### Characteristics:**
- Can see full member details
- Uses `RoomMembers.store.ts` with `roomControllerGetMembers()` endpoint
- Room Owners can:
  - Transfer ownership to other teachers
  - Cannot leave room (must transfer ownership first)
- Room Admins can:
  - Manage members and roles
  - Cannot become owner or transfer ownership
  - Can add users from their own school (cross-school)

### Visual Comparison

| Aspect | School Administrator | Room Owner/Admin |
|--------|---------------------|------------------|
| **Route** | `/administration/rooms/manage/:roomId` | `/rooms/:id/members` |
| **Page** | `AdministrationRoomMembers.page.vue` | `RoomMembers.page.vue` |
| **Store mode** | `setAdminMode(true)` | `setAdminMode(false)` |
| **API endpoint** | `getMembersRedacted` | `getMembers` |
| **Member names** | Anonymized | Full names |
| **Can add members** | Only from own school | Including other schools |
| **Invitation links** | Cannot manage | Can create/manage |
