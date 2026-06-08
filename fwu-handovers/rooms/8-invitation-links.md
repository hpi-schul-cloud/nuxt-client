# Technical Handover: Room Frontend

## 8. Invitation Links

Invitation links allow users to join a room without being explicitly added by an admin.

### Link Properties

```typescript
interface RoomInvitationLink {
    id: string;
    title: string;
    roomId: string;
    creatorUserId: string;
    creatorSchoolId: string;
    
    // Access restrictions
    restrictedToCreatorSchool: boolean;  // Only users from creator's school
    isUsableByStudents: boolean;         // Allow students to join
    isUsableByExternalPersons: boolean;  // Allow external persons (feature-flagged)
    activeUntil?: string;                // Expiry date (or perpetual)
    
    // Join behavior
    requiresConfirmation: boolean;       // If true, user joins as ROOMAPPLICANT
}
```

### Link Management

[RoomInvitationLink.store.ts](src/modules/data/room/roomMembers/RoomInvitationLink.store.ts)

```typescript
const createLink = async (link: CreateRoomInvitationLinkDto) => {
    const response = await api.roomInvitationLinkControllerCreateRoomInvitationLink({
        ...link,
        roomId: getRoomId(),
    });
    sharedUrl.value = BASE_SHARED_URL + response.id;
    invitationStep.value = InvitationStep.SHARE;
};

const updateLink = async (link: UpdateRoomInvitationLinkDto) => ...
const deleteLinks = async (linkIds: string | string[]) => ...
```

### Link Usage Flow

When a user follows an invitation link:

1. User navigates to `/rooms/invitation-link/:linkId`
2. `RoomInvitationLinkStatus.page.vue` renders and calls `useLink()`
3. Server validates the link and user eligibility
4. **On success:** Redirect to room (`/rooms/:roomId`)
5. **On error:** Display validation message

```typescript
// RoomInvitationLink.store.ts
const useLink = async (linkId: string): Promise<UseLinkResult> => {
    const result = { roomId: "", validationMessage: "", schoolName: "" };
    try {
        const response = await api.roomInvitationLinkControllerUseLink(linkId);
        result.roomId = response.data.id;
    } catch (error) {
        const { validationMessage, schoolName } = error.response.data.details;
        result.validationMessage = validationMessage;
        result.schoolName = schoolName;
    }
    return result;
};
```

### Validation Errors

The server returns specific validation errors that the frontend translates:

| Error | User Message |
|-------|--------------|
| `EXPIRED` | Link has expired |
| `RESTRICTED_TO_CREATOR_SCHOOL` | Link restricted to {schoolName} |
| `CANT_INVITE_STUDENTS_FROM_OTHER_SCHOOL` | Students from other schools cannot join |
| `NOT_USABLE_FOR_CURRENT_ROLE` | Your role cannot use this link |
| `INVALID_LINK` | Invalid or deleted link |
| `ROOM_APPLICANT_WAITING` | Successfully joined, awaiting confirmation |

```typescript
// RoomInvitationLinkStatus.page.vue
const updateInfoMessage = (validationMessage: string, schoolName: string) => {
    switch (validationMessage) {
        case RoomInvitationLinkValidationError.EXPIRED:
            infoMessage.value = t("pages.rooms.invitationLinkStatus.expired");
            break;
        case RoomInvitationLinkValidationError.ROOM_APPLICANT_WAITING:
            infoMessage.value = t("pages.rooms.invitationLinkStatus.confirmationPending");
            break;
        // ... other cases
    }
};
```