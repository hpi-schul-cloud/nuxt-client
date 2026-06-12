# Technical Handover: Room - Frontend

## 12. Key Files Quick Reference

*For general architecture patterns, see [board-frontend-handover.md §11](board-frontend-handover.md#11-key-files-quick-reference).*

**Room-specific key files:**

| Purpose | File |
|---------|------|
| **Main stores** | [room.store.ts](src/modules/data/room/room.store.ts), [RoomDetails.store.ts](src/modules/data/room/RoomDetails.store.ts) |
| **Permission composable** | [room-allowed-operations.composable.ts](src/modules/data/room/room-allowed-operations.composable.ts) |
| **Members store** | [RoomMembers.store.ts](src/modules/data/room/roomMembers/RoomMembers.store.ts) |
| **Invitation link store** | [RoomInvitationLink.store.ts](src/modules/data/room/roomMembers/RoomInvitationLink.store.ts) |
| **Admin room store** | [AdministrationRoom.store.ts](src/modules/data/room/manageRoom/AdministrationRoom.store.ts) |
| **Room details page** | [RoomDetails.page.vue](src/modules/page/room/RoomDetails.page.vue) |
| **Members page** | [RoomMembers.page.vue](src/modules/page/room/RoomMembers.page.vue) |
| **Admin members page** | [AdministrationRoomMembers.page.vue](src/modules/page/room/AdministrationRoomMembers.page.vue) |
| **Invitation status page** | [RoomInvitationLinkStatus.page.vue](src/modules/page/room/RoomInvitationLinkStatus.page.vue) |
| **Permission types** | [room-item-response-allowed-operations.ts](src/generated/serverApi/v3/models/room-item-response-allowed-operations.ts) |
| **Router configuration** | [routes.ts](src/router/routes.ts) |