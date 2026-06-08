# Technical Handover: Room Frontend

## 2. Architecture

### Directory Structure

The room-related code follows the same page/feature/data layer pattern as boards and as described [here](https://documentation.dbildungscloud.dev/docs/frontend-design-patterns/ProjectStructure#types-of-building-blocks) for the frontend in general.

```
src/modules/
├── data/room/                          # Data layer (stores, composables)
│   ├── room.store.ts                   # Room list management
│   ├── RoomDetails.store.ts            # Single room details & boards
│   ├── room-allowed-operations.composable.ts  # Permission helper
│   ├── manageRoom/                     # School admin room management
│   │   └── AdministrationRoom.store.ts
│   ├── roomMembers/                    # Member management
│   │   ├── RoomMembers.store.ts
│   │   ├── RoomInvitationLink.store.ts
│   │   └── types.ts
│   └── registration/                   # External person registration
│       └── registration.store.ts
│
├── feature/room/                       # Feature components (complex UI)
│   ├── RoomForm.vue                    # Create/edit room form
│   ├── RoomGrid.vue                    # Room list display
│   ├── RoomMenu.vue                    # Room action menu
│   ├── RoomColorPicker/
│   ├── manageRoom/tables/              # Admin tables
│   ├── roomMembers/                    # Member management features
│   │   ├── dialogs/                    # AddMembersDialog, ChangeRole, etc.
│   │   ├── tables/                     # MembersTable, InvitationTable, etc.
│   │   ├── tabs/                       # Members, Invitations, Confirmations
│   │   └── menus/                      # Kebab menu actions
│   └── registration/                   # External registration flow
│
├── page/room/                          # Page components
│   ├── Rooms.page.vue                  # Room list page
│   ├── RoomCreate.page.vue             # Create room page
│   ├── RoomEdit.page.vue               # Edit room page
│   ├── RoomDetails.page.vue            # Room detail view
│   ├── RoomDetailsSwitch.page.vue      # Switch between Room/CourseRoom
│   ├── RoomMembers.page.vue            # Members management page
│   ├── RoomLocked.page.vue             # Locked room display
│   ├── RoomInvitationLinkStatus.page.vue  # Invitation link result
│   ├── AdministrationRooms.page.vue    # School admin: room list
│   └── AdministrationRoomMembers.page.vue # School admin: room members
│
└── ui/room-details/                    # Shared UI components
    ├── RoomBoardCard.vue
    ├── RoomDotMenu.vue
    └── LeaveRoomProhibitedDialog.vue
```

### Type Definitions

```
src/types/room/
├── Room.ts                             # Room types (re-exports from generated API)
└── RoomMembers.ts                      # Member-related types and enums
```

### Generated API Clients

*See [board-frontend-handover.md §1.3](board-frontend-handover.md#13-relationship-with-backend) for how generated clients work.*

Room-specific generated files:

```
src/generated/serverApi/v3/
├── api/
│   ├── room-api.ts                     # Room endpoints
│   └── room-invitation-link-api.ts     # Invitation link endpoints
└── models/
    ├── room-item-response.ts
    ├── room-details-response.ts
    ├── room-item-response-allowed-operations.ts   # Room-level permissions
    ├── room-member-response.ts
    ├── room-member-response-allowed-operations.ts # Per-member allowed actions
    └── room-invitation-link-*.ts
```
