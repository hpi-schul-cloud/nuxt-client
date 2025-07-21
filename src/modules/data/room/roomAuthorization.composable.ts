import { Permission } from "@/serverApi/v3";
import { useRoomDetailsStore } from "@data-room";
import { storeToRefs } from "pinia";
import { authModule } from "@/store";
import { ref, toValue, watchEffect } from "vue";

export const useRoomAuthorization = () => {
	const { room } = storeToRefs(useRoomDetailsStore());

	const canAddRoomMembers = ref(false);
	const canChangeOwner = ref(false);
	const canCreateRoom = ref(false);
	const canDeleteRoom = ref(false);
	const canCopyRoom = ref(false);
	const canShareRoom = ref(false);
	const canEditRoom = ref(false);
	const canEditRoomContent = ref(false);
	const canLeaveRoom = ref(false);
	const canRemoveRoomMembers = ref(false);
	const canSeeAllStudents = ref(false);
	const canViewRoom = ref(false);
	const canManageRoomInvitationLinks = ref(false);
	const canListDrafts = ref(false);
	const canManageVideoconferences = ref(false);

	watchEffect(() => {
		const permissions = toValue(room)?.permissions ?? [];

		canAddRoomMembers.value = permissions.includes(Permission.RoomAddMembers);
		canChangeOwner.value = permissions.includes(Permission.RoomChangeOwner);
		canCreateRoom.value = authModule?.getUserPermissions.includes(
			Permission.SchoolCreateRoom.toLowerCase()
		);
		canDeleteRoom.value = permissions.includes(Permission.RoomDeleteRoom);
		canCopyRoom.value =
			authModule?.getUserPermissions.includes(
				Permission.SchoolCreateRoom.toLowerCase()
			) && permissions.includes(Permission.RoomCopyRoom);
		canShareRoom.value =
			authModule?.getUserPermissions.includes(
				Permission.SchoolCreateRoom.toLowerCase()
			) && permissions.includes(Permission.RoomShareRoom);
		canEditRoom.value = permissions.includes(Permission.RoomEditRoom);
		canEditRoomContent.value = permissions.includes(Permission.RoomEditContent);
		canLeaveRoom.value = permissions.includes(Permission.RoomLeaveRoom);
		canRemoveRoomMembers.value = permissions.includes(
			Permission.RoomRemoveMembers
		);
		canManageRoomInvitationLinks.value =
			authModule?.getUserPermissions.includes(
				Permission.SchoolManageRoomInvitationlinks.toLowerCase()
			) && permissions.includes(Permission.RoomManageInvitationlinks);
		canSeeAllStudents.value = authModule?.getUserPermissions.includes(
			Permission.StudentList.toLowerCase()
		);
		canListDrafts.value = permissions.includes(Permission.RoomListDrafts);
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
