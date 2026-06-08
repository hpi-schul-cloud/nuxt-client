# Technical Handover: Room Frontend

## 7. Members Management

### Member States & Tabs

The members page (`RoomMembers.page.vue`) has three tabs, each showing different member states:

| Tab | Content | Visibility |
|-----|---------|------------|
| **Members** | Full room members (all roles except ROOMAPPLICANT) | Always visible |
| **Invitations** | Pending email invitations (external person registration) | If `updateRoomInvitationLinks` permission |
| **Confirmations** | Users awaiting approval (ROOMAPPLICANT role) | If applicants exist |

### Adding Members

There are multiple ways to add members:

#### Direct Add (from school lists)

```typescript
// AddMembersDialog.vue → RoomMembers.store.ts
const addMembers = async (userIds: string[]) => {
    await roomApi.roomControllerAddMembers(getRoomId(), { userIds });
    await fetchMembers();
};
```

Teachers can select from:
- Teachers in own school
- Students in own school
- Teachers in other schools (if not restricted) (only those that are "visible")

#### Add by Email (external teachers)

```typescript
const addMemberByEmail = async (email: string): Promise<ExternalMemberCheckStatus> => {
    await roomApi.roomControllerAddByEmail(roomId, { email });
    // Returns status: ACCOUNT_FOUND_AND_ADDED, ACCOUNT_NOT_FOUND, or ACCOUNT_IS_NOT_EXTERNAL
};
```

#### Invitation Links

Users can join via shareable links. See §9 for details.

#### Registration Invitation

Email-based registration for external persons who don't have accounts yet. See §10 for details.

### Changing Roles

It's possible for users of role roomowner or roomadmin to change the roomrole of other members to be roomviewer, roomeditor ot roomadmin.

**Ownership transfer** is a special case:

```typescript
const changeRoomOwner = async (userId: string) => {
    await roomApi.roomControllerPassOwnership(getRoomId(), { userId });
};
```

Ownership can only be transferred to teachers (not students), and only one owner exists per room.

### Leave Room Restriction

Room owners cannot leave their room. The UI shows a `LeaveRoomProhibitedDialog` explaining they must transfer ownership first.