# Technical Handover: Room Frontend

## 4. Data Layer

### Store Overview

The room module uses multiple Pinia stores, each with a specific responsibility:

| Store | Purpose | File |
|-------|---------|------|
| `room.store` | Room list operations (fetch, create, delete, leave) | [room.store.ts](../../src/modules/data/room/room.store.ts) |
| `RoomDetails.store` | Single room details and its boards | [RoomDetails.store.ts](../../src/modules/data/room/RoomDetails.store.ts) |
| `RoomMembers.store` | Member CRUD, role changes | [RoomMembers.store.ts](../../src/modules/data/room/roomMembers/RoomMembers.store.ts) |
| `RoomInvitationLink.store` | Invitation link management | [RoomInvitationLink.store.ts](../../src/modules/data/room/roomMembers/RoomInvitationLink.store.ts) |
| `AdministrationRoom.store` | School admin room list | [AdministrationRoom.store.ts](../../src/modules/data/room/manageRoom/AdministrationRoom.store.ts) |
| `registration.store` | External person registration | [registration.store.ts](../../src/modules/data/room/registration/registration.store.ts) |

```typescript
// In RoomMembers.store.ts
const { room } = storeToRefs(useRoomDetailsStore());
const roomId = computed(() => room.value?.id);
```

### Room Store ([room.store.ts](../../src/modules/data/room/room.store.ts))

Manages the list of rooms the current user belongs to:

```typescript
const roomApi = RoomApiFactory(undefined, "/v3", $axios);

const rooms = ref<RoomItem[]>([]);
const isEmpty = computed(() => rooms.value.length === 0);

const fetchRooms = async () => {
    const result = await execute(roomApi.roomControllerGetRooms, ...);
    rooms.value = result?.data.data;
};

const createRoom = async (params: RoomCreateParams) => ...
const deleteRoom = async (roomId: string) => ...
const copyRoom = async (roomId: string) => ...
const leaveRoom = async (roomId: string) => ...
```

### RoomDetails Store ([RoomDetails.store.ts](../../src/modules/data/room/RoomDetails.store.ts))

Manages a single room's details and its boards:

```typescript
const room = ref<RoomDetails>();
const roomBoards = ref<RoomBoardItem[]>([]);
const roomVariant = ref<RoomVariant>();

const fetchRoom = async (id: string, config = { loadBoards: false }) => {
    room.value = (await roomApi.roomControllerGetRoomDetails(id)).data;
    // Handle locked room (403 with LOCKED_ROOM type)
};

const createBoard = async (roomId: string, layout: BoardLayout, title: string) => ...
const updateRoom = async (id: string, params: RoomUpdateParams) => ...
```

**Locked room handling:** When fetching a room, the server may return 403 with `type: "LOCKED_ROOM"`. The store detects this and returns `{ isLocked: true }` so the page can show `RoomLocked.page.vue`.

### RoomMembers Store ([RoomMembers.store.ts](../../src/modules/data/room/roomMembers/RoomMembers.store.ts))

Manages room membership operations:

```typescript
const roomMembers: Ref<RoomMember[]> = ref([]);
let _asAdmin = false;  // Toggles between normal and admin mode

const setAdminMode = (asAdmin: boolean) => {
    _asAdmin = asAdmin;
};

const fetchMembers = async () => {
    // Uses different endpoint based on admin mode
    const getMembers = _asAdmin 
        ? roomApi.roomControllerGetMembersRedacted 
        : roomApi.roomControllerGetMembers;
    // ...
};

const addMembers = async (userIds: string[]) => ...
const removeMembers = async (userIds: string[]) => ...
const updateMembersRole = async (roleName, id?) => ...
const changeRoomOwner = async (userId: string) => ...
```

**Admin mode toggle:** The `setAdminMode(true)` call switches the store to use the redacted members endpoint, which returns anonymized data for privacy. This is used by school administrators who shouldn't see full user details.
