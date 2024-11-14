import {
	Permission,
	ImportUserResponseRoleNamesEnum as Roles,
} from "@/serverApi/v3";
import { RoomDetails } from "@/types/room/Room";
import { AUTH_MODULE_KEY, injectStrict } from "@/utils/inject";
import {
	computed,
	ComputedRef,
	MaybeRefOrGetter,
	ref,
	toValue,
	watchEffect,
} from "vue";

export const useRoomAuthorization = (
	room:
		| ComputedRef<RoomDetails | undefined>
		| MaybeRefOrGetter<RoomDetails | undefined>
) => {
	const authModule = injectStrict(AUTH_MODULE_KEY);

	const canCreateBoard = ref(false);
	const canViewBoard = ref(false);
	const canEditBoard = ref(false);
	const canDeleteBoard = ref(false);

	const canModifyBoard = computed(
		() => canEditBoard.value || canDeleteBoard.value
	);

	watchEffect(() => {
		const permissions = toValue(room)?.permissions ?? [];

		canCreateBoard.value =
			permissions.includes(Permission.RoomEdit) &&
			authModule.getUserRoles.includes(Roles.Teacher);
		canViewBoard.value = permissions.includes(Permission.RoomView);
		canEditBoard.value = permissions.includes(Permission.RoomEdit);
		canDeleteBoard.value = permissions.includes(Permission.RoomDelete);
	});

	return {
		canCreateBoard,
		canViewBoard,
		canEditBoard,
		canDeleteBoard,
		canModifyBoard,
	};
};
