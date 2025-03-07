import { defineStore, storeToRefs } from "pinia";
import {
	AUTH_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	injectStrict,
} from "@/utils/inject";
import { useRoomDetailsStore } from "@data-room";
import { computed, ref } from "vue";
import {
	Permission,
	ImportUserResponseRoleNamesEnum as Roles,
	RoleName,
	RoomMemberResponse,
} from "@/serverApi/v3";

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

export const useRoomPermissionsStore = defineStore(
	"roomPermissionsStore",
	() => {
		const canAddRoomMembers = ref(false);
		const canRemoveRoomMembers = ref(false);
		const canChangeOwner = ref(false);
		const canCreateRoom = ref(false);
		const canViewRoom = ref(false);
		const canEditRoom = ref(false);
		const canDeleteRoom = ref(false);
		const canLeaveRoom = ref(false);

		const authModule = injectStrict(AUTH_MODULE_KEY);
		const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
		const { FEATURE_ROOMS_CHANGE_PERMISSIONS_ENABLED } = envConfigModule.getEnv;
		const currentUserId = computed(() => authModule.getMe?.user.id);
		const { room } = storeToRefs(useRoomDetailsStore());

		const permissions = computed(() => room?.value?.permissions ?? []);
		const currentUserRole = computed(() => detectRole(permissions.value));

		canCreateRoom.value =
			authModule.getUserPermissions.includes(
				Permission.RoomCreate.toLowerCase()
			) && authModule.getUserRoles.includes(Roles.Teacher);

		canViewRoom.value = permissions.value.includes(Permission.RoomView);

		canDeleteRoom.value = permissions.value.includes(Permission.RoomDelete);

		canAddRoomMembers.value = permissions.value.includes(
			Permission.RoomMembersAdd
		);

		canRemoveRoomMembers.value = permissions.value.includes(
			Permission.RoomMembersRemove
		);

		canChangeOwner.value = permissions.value.includes(
			Permission.RoomChangeOwner
		);
		canEditRoom.value = permissions.value.includes(Permission.RoomEdit);

		canLeaveRoom.value = permissions.value.includes(Permission.RoomLeave);

		const manageMembersVisibility = computed(() => {
			const ownerOrAdmin =
				currentUserRole.value === RoleName.Roomowner ||
				currentUserRole.value === RoleName.Roomadmin;

			const isVisibleSelectionColumn = ownerOrAdmin,
				isVisibleActionColumn = ownerOrAdmin,
				isVisibleAddMemberButton = ownerOrAdmin,
				isVisiblePageInfoText = ownerOrAdmin;

			const isVisibleChangeRoleButton =
				ownerOrAdmin && FEATURE_ROOMS_CHANGE_PERMISSIONS_ENABLED;

			const isVisibleActionInRow = (user: RoomMemberResponse) => {
				if (user.roomRoleName === RoleName.Roomowner) return false;
				return user.userId !== currentUserId.value;
			};

			const isVisibleRemoveMemberButton = (user: RoomMemberResponse) => {
				return user.roomRoleName !== RoleName.Roomowner;
			};

			return {
				isVisibleSelectionColumn,
				isVisibleActionColumn,
				isVisibleAddMemberButton,
				isVisibleChangeRoleButton,
				isVisiblePageInfoText,
				isVisibleActionInRow,
				isVisibleRemoveMemberButton,
			};
		});

		return {
			canAddRoomMembers,
			canCreateRoom,
			canViewRoom,
			canDeleteRoom,
			canRemoveRoomMembers,
			canChangeOwner,
			canLeaveRoom,
			canEditRoom,
			currentUserRole,
			manageMembersVisibility,
			currentUserId,
		};
	}
);
