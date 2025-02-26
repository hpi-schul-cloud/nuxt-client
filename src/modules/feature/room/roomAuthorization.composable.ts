import {
	Permission,
	RoleName,
	ImportUserResponseRoleNamesEnum as Roles,
} from "@/serverApi/v3";
import { useRoomDetailsStore } from "@data-room";
import { storeToRefs } from "pinia";
import { authModule } from "@/store";
import { computed, ref, toValue, watchEffect } from "vue";

const detectRole = (permissions: Permission[]) => {
	if (permissions.includes(Permission.RoomChangeOwner)) {
		return RoleName.Roomowner;
	}
	if (
		permissions.includes(Permission.RoomMembersChangeRole) &&
		!permissions.includes(Permission.RoomDelete)
	) {
		return RoleName.Roomadmin;
	}
	if (
		permissions.includes(Permission.RoomEdit) &&
		permissions.includes(Permission.RoomView) &&
		!permissions.includes(Permission.RoomMembersChangeRole)
	) {
		return RoleName.Roomeditor;
	}

	return RoleName.Roomviewer;
};

export const useRoomAuthorization = () => {
	const { room } = storeToRefs(useRoomDetailsStore());

	const canAddRoomMembers = ref(false);
	const canRemoveRoomMembers = ref(false);
	const canChangeOwner = ref(false);
	const canCreateRoom = ref(false);
	const canViewRoom = ref(false);
	const canEditRoom = ref(false);
	const canDeleteRoom = ref(false);
	const canLeaveRoom = ref(false);
	const canEditRoomBoard = ref(false);
	const currentUserRole = ref<RoleName | unknown>();

	watchEffect(() => {
		const permissions = toValue(room)?.permissions ?? [];

		currentUserRole.value = detectRole(permissions);

		canCreateRoom.value =
			authModule?.getUserPermissions.includes(
				Permission.RoomCreate.toLowerCase()
			) && authModule.getUserRoles.includes(Roles.Teacher);
		canViewRoom.value = permissions.includes(Permission.RoomView);
		canEditRoom.value = permissions.includes(Permission.RoomEdit);
		canDeleteRoom.value = permissions.includes(Permission.RoomDelete);
		canAddRoomMembers.value = permissions.includes(Permission.RoomMembersAdd);
		canRemoveRoomMembers.value = permissions.includes(
			Permission.RoomMembersRemove
		);
		canChangeOwner.value = permissions.includes(Permission.RoomChangeOwner);
		canLeaveRoom.value = permissions.includes(Permission.RoomLeave);
		canEditRoomBoard.value = permissions.includes(Permission.RoomChangeOwner); // TODO: Change this to the correct permission
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
		currentUserRole,
		canEditRoomBoard,
	};
};
