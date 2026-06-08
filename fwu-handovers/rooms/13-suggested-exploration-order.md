# Technical Handover: Room Frontend

## 13. Suggested Exploration Order

**Assumption:** You have already reviewed the board frontend handover and understand layer separation, generated APIs, and the allowedOperations pattern.

1. **Quick context:** Understand that rooms contain boards; board permissions inherit from room membership
2. **Routing:** Open [routes.ts](src/router/routes.ts) and find all `/rooms` and `/administration/rooms` routes
3. **Room list flow:** Trace from `Rooms.page.vue` → `room.store.ts` → `RoomGrid.vue`
4. **Room details flow:** Open `RoomDetailsSwitch.page.vue`, understand Room vs. CourseRoom detection
5. **Permissions/Allowed Operations:** Find permission checks in `RoomMenu.vue` and `RoomDetails.page.vue`
6. **Admin vs. Owner:** Compare `AdministrationRoomMembers.page.vue` with `RoomMembers.page.vue`
7. **Members store:** Read `RoomMembers.store.ts`, focus on `setAdminMode()` and `fetchMembers()`
8. **Invitation links:** Trace from `InviteMembersDialog.vue` → `RoomInvitationLink.store.ts` → `RoomInvitationLinkStatus.page.vue`
9. **Per-member operations:** Find `allowedOperations` usage in `MembersTable.vue`
