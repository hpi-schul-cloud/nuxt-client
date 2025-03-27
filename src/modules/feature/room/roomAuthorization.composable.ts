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
	const canRemoveRoomMembers = ref(false);
	const canChangeOwner = ref(false);
	const canCreateRoom = ref(false);
	const canViewRoom = ref(false);
	const canEditRoom = ref(false);
	const canEditRoomContent = ref(false);
	const canDeleteRoom = ref(false);
	const canLeaveRoom = ref(false);

	watchEffect(() => {
		const permissions = toValue(room)?.permissions ?? [];

		canCreateRoom.value =
			authModule?.getUserPermissions.includes(
				Permission.RoomCreate.toLowerCase()
			) && authModule.getUserRoles.includes(Roles.Teacher);
		canViewRoom.value = permissions.includes(Permission.RoomView);
		canEditRoom.value = permissions.includes(Permission.RoomEdit);
		canEditRoomContent.value = permissions.includes(Permission.RoomContentEdit);
		canDeleteRoom.value = permissions.includes(Permission.RoomDelete);
		canAddRoomMembers.value = permissions.includes(Permission.RoomMembersAdd);
		canRemoveRoomMembers.value = permissions.includes(
			Permission.RoomMembersRemove
		);
		canChangeOwner.value = permissions.includes(Permission.RoomChangeOwner);
		canLeaveRoom.value = permissions.includes(Permission.RoomLeave);
	});

	return {
		canAddRoomMembers,
		canChangeOwner,
		canCreateRoom,
		canViewRoom,
		canEditRoom,
		canDeleteRoom,
		canLeaveRoom,
		canRemoveRoomMembers,
		canEditRoomContent,
	};
};
