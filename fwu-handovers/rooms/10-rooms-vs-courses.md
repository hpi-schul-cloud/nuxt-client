# Technical Handover: Room Frontend

## 10. Room vs. Course

### The Distinction

The codebase supports two types of "rooms":
- **Room** - The new rooms feature (this document's focus)
- **CourseRoom** - Legacy courses that behave similarly to rooms

### RoomDetailsSwitch

[RoomDetailsSwitch.page.vue](src/modules/page/room/RoomDetailsSwitch.page.vue) handles the distinction automatically:

```html
<template>
    <RoomLockedPage v-if="isRoom && isLocked" :title="lockedRoomName" />
    <RoomDetailsPage v-else-if="isRoom && room" :room="room" />
    <CourseRoomDetailsPage v-else />
</template>

<script setup>
const { fetchRoomAndBoards } = useRoomDetailsStore();

// Try to fetch as Room first
const result = await fetchRoomAndBoards(roomId);

// If 404, store sets roomVariant to COURSE_ROOM
// If 403 with LOCKED_ROOM, show locked page
</script>
```

### RoomVariant Enum

```typescript
export enum RoomVariant {
    ROOM = "room",           // New rooms feature
    COURSE_ROOM = "courseRoom"  // Legacy course
}
```

The store detects the variant based on API response:

```typescript
// RoomDetails.store.ts
const fetchRoom = async (id: string) => {
    try {
        roomVariant.value = RoomVariant.ROOM;
        room.value = (await roomApi.roomControllerGetRoomDetails(id)).data;
    } catch (error) {
        if (responseError.code === 404) {
            roomVariant.value = RoomVariant.COURSE_ROOM;
        } else if (responseError.type === "LOCKED_ROOM") {
            return { isLocked: true, lockedRoomName: responseError.message };
        }
    }
};
```
