import { Permission } from "@/serverApi/v3";
import { useAppStore } from "@data-app";
import { useRoomDetailsStore } from "@data-room";
import { storeToRefs } from "pinia";
import { computed } from "vue";

export const useRoomAuthorization = () => {
	const { room } = storeToRefs(useRoomDetailsStore());
	const { hasPermission } = useAppStore();
	const { isExpert } = storeToRefs(useAppStore());
	const roomPermissions = computed(() => room.value?.permissions ?? []);

	const checkRoomPermission = (permission: Permission) => roomPermissions.value.includes(permission);

	const userCanCreateRoom = hasPermission(Permission.SchoolCreateRoom);
	const userCanManageRoomInvitationLinks = hasPermission(Permission.SchoolManageRoomInvitationlinks);

	const canAddRoomMembers = computed(() => checkRoomPermission(Permission.RoomAddMembers));
	const canChangeOwner = computed(() => checkRoomPermission(Permission.RoomChangeOwner));
	const canCreateRoom = hasPermission(Permission.SchoolCreateRoom);
	const canDeleteRoom = computed(() => checkRoomPermission(Permission.RoomDeleteRoom));
	const canCopyRoom = computed(() => userCanCreateRoom.value && checkRoomPermission(Permission.RoomCopyRoom));
	const canShareRoom = computed(() => userCanCreateRoom.value && checkRoomPermission(Permission.RoomShareRoom));
	const canEditRoom = computed(() => checkRoomPermission(Permission.RoomEditRoom));
	const canEditRoomContent = computed(() => checkRoomPermission(Permission.RoomEditContent));
	const canLeaveRoom = computed(() => checkRoomPermission(Permission.RoomLeaveRoom));
	const canRemoveRoomMembers = computed(() => checkRoomPermission(Permission.RoomRemoveMembers));
	const canViewRoom = computed(() => checkRoomPermission(Permission.RoomListContent) && !isExpert.value);
	const canListDrafts = computed(() => checkRoomPermission(Permission.RoomListDrafts));
	const canManageVideoconferences = computed(() => checkRoomPermission(Permission.RoomManageVideoconferences));
	const canSeeAllStudents = hasPermission(Permission.StudentList);
	const canManageRoomInvitationLinks = computed(
		() => userCanManageRoomInvitationLinks.value && checkRoomPermission(Permission.RoomManageInvitationlinks)
	);

	const canAddAllStudents = computed(() => canAddRoomMembers.value && canSeeAllStudents.value);

	return {
		canAddRoomMembers,
		canChangeOwner,
		canCreateRoom,
		canDeleteRoom,
		canCopyRoom,
		canShareRoom,
		canEditRoom,
		canEditRoomContent,
		canLeaveRoom,
		canRemoveRoomMembers,
		canAddAllStudents,
		canSeeAllStudents,
		canViewRoom,
		canManageRoomInvitationLinks,
		canListDrafts,
		canManageVideoconferences,
	};
};
