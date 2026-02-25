import { useRoomAuthorization } from "@data-room";
import { computed, Ref } from "vue";

type RefPropertiesOnly<T> = {
	[K in keyof T as T[K] extends Ref ? K : never]: boolean;
};

export type RoomAuthorizationRefs = Partial<RefPropertiesOnly<ReturnType<typeof useRoomAuthorization>>>;

export const createRoomAuthorizationMock = (
	overrides: RoomAuthorizationRefs = {}
): ReturnType<typeof useRoomAuthorization> => {
	const defaults: RoomAuthorizationRefs = {
		canAddAllStudents: false,
		canAddRoomMembers: false,
		canChangeOwner: false,
		canCopyRoom: false,
		canCreateRoom: false,
		canDeleteRoom: false,
		canEditRoom: false,
		canEditRoomContent: false,
		canLeaveRoom: false,
		canListDrafts: false,
		canManageRoomInvitationLinks: false,
		canManageVideoconferences: false,
		canRemoveRoomMembers: false,
		canSeeAllStudents: false,
		canSeeMembersList: false,
		canShareRoom: false,
		canViewRoom: false,
	};

	const merged = { ...defaults, ...overrides };

	return {
		canAddAllStudents: computed(() => merged.canAddAllStudents ?? false),
		canAddRoomMembers: computed(() => merged.canAddRoomMembers ?? false),
		canChangeOwner: computed(() => merged.canChangeOwner ?? false),
		canCopyRoom: computed(() => merged.canCopyRoom ?? false),
		canCreateRoom: computed(() => merged.canCreateRoom ?? false),
		canDeleteRoom: computed(() => merged.canDeleteRoom ?? false),
		canEditRoom: computed(() => merged.canEditRoom ?? false),
		canEditRoomContent: computed(() => merged.canEditRoomContent ?? false),
		canLeaveRoom: computed(() => merged.canLeaveRoom ?? false),
		canListDrafts: computed(() => merged.canListDrafts ?? false),
		canManageRoomInvitationLinks: computed(() => merged.canManageRoomInvitationLinks ?? false),
		canManageVideoconferences: computed(() => merged.canManageVideoconferences ?? false),
		canRemoveRoomMembers: computed(() => merged.canRemoveRoomMembers ?? false),
		canSeeAllStudents: computed(() => merged.canSeeAllStudents ?? false),
		canSeeMembersList: computed(() => merged.canSeeMembersList ?? false),
		canShareRoom: computed(() => merged.canShareRoom ?? false),
		canViewRoom: computed(() => merged.canViewRoom ?? false),
	};
};
