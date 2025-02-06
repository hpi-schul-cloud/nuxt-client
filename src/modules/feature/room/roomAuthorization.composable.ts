import {
	Permission,
	ImportUserResponseRoleNamesEnum as Roles,
} from "@/serverApi/v3";
import { RoomDetails } from "@/types/room/Room";
import { AUTH_MODULE_KEY, injectStrict } from "@/utils/inject";
import { ComputedRef, MaybeRefOrGetter, ref, toValue, watchEffect } from "vue";

export const useRoomAuthorization = (
	room:
		| ComputedRef<RoomDetails | undefined>
		| MaybeRefOrGetter<RoomDetails | undefined>
) => {
	const authModule = injectStrict(AUTH_MODULE_KEY);

	const canAddRoomMembers = ref(false);
	const canRemoveRoomMembers = ref(false);
	const canChangeOwner = ref(false);
	const canCreateRoom = ref(false);
	const canViewRoom = ref(false);
	const canEditRoom = ref(false);
	const canDeleteRoom = ref(false);
	const canLeaveRoom = ref(false);

	watchEffect(() => {
		const permissions = toValue(room)?.permissions ?? [];

		canCreateRoom.value =
			authModule.getUserPermissions.includes(
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
	};
};
