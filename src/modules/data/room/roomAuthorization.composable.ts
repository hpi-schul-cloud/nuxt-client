import {
	Permission,
	ImportUserResponseRoleNamesEnum as Roles,
} from "@/serverApi/v3";
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
	const canEditRoom = ref(false);
	const canEditRoomContent = ref(false);
	const canLeaveRoom = ref(false);
	const canRemoveRoomMembers = ref(false);
	const canSeeAllStudents = ref(false);
	const canViewRoom = ref(false);

	watchEffect(() => {
		const permissions = toValue(room)?.permissions ?? [];

		canAddRoomMembers.value = permissions.includes(Permission.RoomMembersAdd);
		canChangeOwner.value = permissions.includes(Permission.RoomChangeOwner);
		canCreateRoom.value =
			authModule?.getUserPermissions.includes(
				Permission.RoomCreate.toLowerCase()
			) && authModule.getUserRoles.includes(Roles.Teacher);
		canDeleteRoom.value = permissions.includes(Permission.RoomDelete);
		canCopyRoom.value = permissions.includes(Permission.RoomCopy);
		canEditRoom.value = permissions.includes(Permission.RoomEdit);
		canEditRoomContent.value = permissions.includes(Permission.RoomContentEdit);
		canLeaveRoom.value = permissions.includes(Permission.RoomLeave);
		canRemoveRoomMembers.value = permissions.includes(
			Permission.RoomMembersRemove
		);
		canSeeAllStudents.value = authModule?.getUserPermissions.includes(
			Permission.StudentList.toLowerCase()
		);
		canViewRoom.value = permissions.includes(Permission.RoomView);
	});

	return {
		canAddRoomMembers,
		canChangeOwner,
		canCreateRoom,
		canDeleteRoom,
		canCopyRoom,
		canEditRoom,
		canEditRoomContent,
		canLeaveRoom,
		canRemoveRoomMembers,
		canSeeAllStudents,
		canViewRoom,
	};
};
