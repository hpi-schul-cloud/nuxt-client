import { Permission } from "@/serverApi/v3";
import { useRoomDetailsStore } from "@data-room";
import { storeToRefs } from "pinia";
import { ref, toValue, watchEffect } from "vue";
import { useAppStore } from "@data-app";

export const useRoomAuthorization = () => {
	const { room } = storeToRefs(useRoomDetailsStore());
	const { hasPermission } = useAppStore();
	const userCanCreateRoom = hasPermission(Permission.SchoolCreateRoom);
	const userCanManageRoomInvitationLinks = hasPermission(
		Permission.SchoolManageRoomInvitationlinks
	);

	const canAddRoomMembers = ref(false);
	const canChangeOwner = ref(false);
	const canCreateRoom = hasPermission(Permission.SchoolCreateRoom);
	const canDeleteRoom = ref(false);
	const canCopyRoom = ref(false);
	const canShareRoom = ref(false);
	const canEditRoom = ref(false);
	const canEditRoomContent = ref(false);
	const canLeaveRoom = ref(false);
	const canRemoveRoomMembers = ref(false);
	const canSeeAllStudents = hasPermission(Permission.StudentList);
	const canViewRoom = ref(false);
	const canManageRoomInvitationLinks = ref(false);
	const canListDrafts = ref(false);
	const canManageVideoconferences = ref(false);

	watchEffect(() => {
		const permissions = toValue(room)?.permissions ?? [];

		canAddRoomMembers.value = permissions.includes(Permission.RoomAddMembers);
		canChangeOwner.value = permissions.includes(Permission.RoomChangeOwner);
		canDeleteRoom.value = permissions.includes(Permission.RoomDeleteRoom);
		canCopyRoom.value =
			userCanCreateRoom.value && permissions.includes(Permission.RoomCopyRoom);
		canShareRoom.value =
			userCanCreateRoom.value && permissions.includes(Permission.RoomShareRoom);
		canEditRoom.value = permissions.includes(Permission.RoomEditRoom);
		canEditRoomContent.value = permissions.includes(Permission.RoomEditContent);
		canLeaveRoom.value = permissions.includes(Permission.RoomLeaveRoom);
		canRemoveRoomMembers.value = permissions.includes(
			Permission.RoomRemoveMembers
		);
		canManageRoomInvitationLinks.value =
			userCanManageRoomInvitationLinks.value &&
			permissions.includes(Permission.RoomManageInvitationlinks);
		canViewRoom.value = permissions.includes(Permission.RoomListContent);
		canListDrafts.value = permissions.includes(Permission.RoomListDrafts);
		canManageVideoconferences.value = permissions.includes(
			Permission.RoomManageVideoconferences
		);
	});

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
		canSeeAllStudents,
		canViewRoom,
		canManageRoomInvitationLinks,
		canListDrafts,
		canManageVideoconferences,
	};
};
