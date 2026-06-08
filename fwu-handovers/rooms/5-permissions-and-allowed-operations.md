# Technical Handover: Room Frontend

## 5. Permissions & Allowed Operations

*The general pattern is explained in [board-frontend-handover.md §5](board-frontend-handover.md#5-permissions--allowed-operations). This section covers room-specific operations.*

### Room-Level Operations

The server returns `allowedOperations` with every room response:

```typescript
interface RoomItemResponseAllowedOperations {
    // Room access
    accessRoom: boolean;
    accessRoomBoards: boolean;
    viewContent: boolean;
    viewDraftContent: boolean;
    viewMemberlist: boolean;
    
    // Room management
    createRoom: boolean;
    updateRoom: boolean;
    deleteRoom: boolean;
    copyRoom: boolean;
    shareRoom: boolean;
    leaveRoom: boolean;
    arrangeRooms: boolean;
    
    // Member management
    addMembers: boolean;
    addAllStudents: boolean;
    addExternalPersonByEmail: boolean;
    changeRolesOfMembers: boolean;
    getRoomMembers: boolean;
    getRoomMembersRedacted: boolean;  // For school admins
    
    // Content editing
    editContent: boolean;
    
    // Invitation links
    createRoomInvitationLinks: boolean;
    listRoomInvitationLinks: boolean;
    updateRoomInvitationLinks: boolean;
    deleteRoomInvitationLinks: boolean;
}
```

### Using Permissions in Components

The `useRoomAllowedOperations()` composable provides reactive access to permissions:

[room-allowed-operations.composable.ts](src/modules/data/room/room-allowed-operations.composable.ts)

```typescript
export const useRoomAllowedOperations = () => {
    const { room } = storeToRefs(useRoomDetailsStore());

    const allowedOperations = computed(() => {
        if (room.value?.allowedOperations) {
            return room.value.allowedOperations;
        } else {
            // Return proxy that returns false for all operations
            return new Proxy({}, { get: () => false });
        }
    });

    return { allowedOperations };
};
```

**Usage in templates:**

```html
<template>
    <button v-if="allowedOperations.addMembers">Add Member</button>
    <RoomMenu v-if="allowedOperations.updateRoom" />
</template>

<script setup>
const { allowedOperations } = useRoomAllowedOperations();
</script>
```

### Per-Member Allowed Operations

Each member in the members list also has individual `allowedOperations`:

```typescript
interface RoomMemberResponseAllowedOperations {
    changeRole: boolean;      // Can change this member's role
    passOwnershipTo: boolean; // Can transfer ownership to this member
    removeMember: boolean;    // Can remove this member
}
```

This enables fine-grained control in the members table:

```html
<!-- MembersTable.vue -->
<KebabMenu v-if="member.allowedOperations?.changeRole || 
                  member.allowedOperations?.passOwnershipTo || 
                  member.allowedOperations?.removeMember">
    <KebabMenuActionChangePermission 
        v-if="member.allowedOperations?.changeRole || member.allowedOperations?.passOwnershipTo"
    />
    <KebabMenuActionRemoveMember 
        v-if="member.allowedOperations?.removeMember"
    />
</KebabMenu>
```

### Permission Pattern Example: RoomMenu

[RoomMenu.vue](src/modules/feature/room/RoomMenu.vue) demonstrates the standard pattern:

```html
<template>
    <KebabMenu>
        <KebabMenuActionEdit v-if="allowedOperations.updateRoom" @click="..." />
        <KebabMenuActionRoomMembers v-if="allowedOperations.viewMemberlist" ... />
        <KebabMenuActionRoomCopy 
            v-if="isRoomCopyFeatureEnabled && allowedOperations.copyRoom" 
            @click="..." 
        />
        <KebabMenuActionShare 
            v-if="isRoomShareFeatureEnabled && allowedOperations.shareRoom" 
            @click="..." 
        />
        <KebabMenuActionDelete v-if="allowedOperations.deleteRoom" ... />
        <KebabMenuActionLeaveRoom @click="..." />  <!-- Always visible -->
    </KebabMenu>
</template>

<script setup>
const { allowedOperations } = useRoomAllowedOperations();
</script>
```

