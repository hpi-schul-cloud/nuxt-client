# Technical Handover: Room Frontend

## 3. Routing Structure

### Route Overview

| Route | Page Component | Purpose |
|-------|----------------|---------|
| `/rooms` | `Rooms.page.vue` | Room overview list |
| `/rooms/new` | `RoomCreate.page.vue` | Create new room |
| `/rooms/:id` | `RoomDetailsSwitch.page.vue` | Room details (switches between Room/CourseRoom) |
| `/rooms/:id/edit` | `RoomEdit.page.vue` | Edit room settings |
| `/rooms/:id/members` | `RoomMembers.page.vue` | Manage room members |
| `/rooms/invitation-link/:id` | `RoomInvitationLinkStatus.page.vue` | Invitation link handler |
| `/administration/rooms/manage` | `AdministrationRooms.page.vue` | School admin room list |
| `/administration/rooms/manage/:roomId` | `AdministrationRoomMembers.page.vue` | School admin member management |

### Route Guards

Routes are protected by permission guards in [routes.ts](src/router/routes.ts):

```typescript
// Administration routes require SCHOOL_ADMINISTRATE_ROOMS
{
    path: `/administration/rooms/manage`,
    beforeEnter: createPermissionGuard([Permission.SCHOOL_ADMINISTRATE_ROOMS]),
}

// Create room requires SCHOOL_CREATE_ROOM
{
    path: `/rooms/new`,
    beforeEnter: [createPermissionGuard([Permission.SCHOOL_CREATE_ROOM])],
}
```

**Note:** Most room routes don't have guards because access is controlled by server-side permissions. The server returns appropriate errors (403, 404) which the frontend handles.
