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

	const canCreateRoom = ref(false);
	const canViewRoom = ref(false);
	const canEditRoom = ref(false);
	const canDeleteRoom = ref(false);

	watchEffect(() => {
		const permissions = toValue(room)?.permissions ?? [];

		canCreateRoom.value =
			authModule.getUserPermissions.includes(
				Permission.RoomCreate.toLowerCase()
			) && authModule.getUserRoles.includes(Roles.Teacher);
		canViewRoom.value = permissions.includes(Permission.RoomView);
		canEditRoom.value = permissions.includes(Permission.RoomEdit);
		canDeleteRoom.value = permissions.includes(Permission.RoomDelete);
	});

	return {
		canCreateRoom,
		canViewRoom,
		canEditRoom,
		canDeleteRoom,
	};
};
