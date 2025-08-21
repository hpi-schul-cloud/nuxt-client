<template>
	<DataTable
		:items="tableData"
		:table-headers="tableHeader"
		:show-select="canAddRoomMembers"
		:external-selected-ids="selectedIds"
		:header-bottom="headerBottom"
		select-item-key="userId"
		aria-label-name-key="fullName"
		@update:selected-ids="onUpdateSelectedIds"
	>
		<template #[`action-menu-items`]>
			<KebabMenuActionChangePermission
				v-if="canAddRoomMembers"
				@click="onChangePermission(selectedIds)"
			/>
			<KebabMenuActionRemoveMember @click="onRemoveMembers(selectedIds)" />
		</template>
		<template #[`item.displaySchoolRole`]="{ item }">
			<span class="text-no-wrap">
				<VIcon
					v-if="getSchoolRoleIcon(item.schoolRoleNames)"
					:icon="getSchoolRoleIcon(item.schoolRoleNames)"
				/>
				{{ item.displaySchoolRole }}
			</span>
		</template>
		<template v-if="canAddRoomMembers" #[`item.actions`]="{ item, index }">
			<KebabMenu
				v-if="isNeitherRoomOwnerNorCurrentUser(item.userId)"
				:data-testid="`kebab-menu-${index}`"
				:aria-label="getAriaLabel(item)"
			>
				<KebabMenuActionChangePermission
					:aria-label="getAriaLabel(item, 'changeRole')"
					@click="onChangePermission([item.userId])"
				/>
				<KebabMenuActionRemoveMember
					v-if="!isRoomOwner(item.userId)"
					:aria-label="getAriaLabel(item, 'remove')"
					@click="onRemoveMembers([item.userId])"
				/>
			</KebabMenu>
		</template>
	</DataTable>
	<VDialog
		v-model="isChangeRoleDialogOpen"
		:width="isExtraSmallDisplay ? 'auto' : 480"
		data-testid="dialog-change-role-participants"
		max-width="480"
		@keydown.esc="onDialogClose"
	>
		<ChangeRole :members="membersToChangeRole" @close="onDialogClose" />
	</VDialog>
	<ConfirmationDialog />
</template>

<script setup lang="ts">
import { DataTable } from "@ui-data-table";
import {
	KebabMenu,
	KebabMenuActionChangePermission,
	KebabMenuActionRemoveMember,
} from "@ui-kebab-menu";
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { mdiAccountSchoolOutline, mdiAccountOutline } from "@icons/material";
import {
	ConfirmationDialog,
	useConfirmationDialog,
} from "@ui-confirmation-dialog";
import {
	RoomMember,
	useRoomAuthorization,
	useRoomMembersStore,
} from "@data-room";
import { useDisplay } from "vuetify";
import { storeToRefs } from "pinia";
import { ChangeRole } from "@feature-room";
import { authModule } from "@/store/store-accessor";
import { RoleName } from "@/serverApi/v3";

type Props = {
	headerBottom?: number;
	showSelect?: boolean;
};

withDefaults(defineProps<Props>(), {
	headerBottom: 0,
	showSelect: false,
});

const { t } = useI18n();
const { xs: isExtraSmallDisplay } = useDisplay();
const { canAddRoomMembers } = useRoomAuthorization();

const roomMembersStore = useRoomMembersStore();
const { roomMembersWithoutApplicants, selectedIds, baseTableHeaders } =
	storeToRefs(roomMembersStore);
const { isRoomOwner, removeMembers } = roomMembersStore;
const { askConfirmation } = useConfirmationDialog();

const tableData = computed(
	() =>
		roomMembersWithoutApplicants.value as unknown as Record<string, unknown>[]
);
const isChangeRoleDialogOpen = ref(false);
const membersToChangeRole = ref<RoomMember[]>([]);

const isNeitherRoomOwnerNorCurrentUser = (userId: string) => {
	const isNotCurrentUser = userId !== authModule.getUser?.id;
	const isNotRoomOwner = !isRoomOwner(userId);
	return isNotCurrentUser && isNotRoomOwner;
};

const onDialogClose = () => {
	isChangeRoleDialogOpen.value = false;
};

const onRemoveMembers = async (userIds: string[]) => {
	const shouldRemove = await confirmRemoval(userIds);
	if (shouldRemove) await removeMembers(userIds);
};

const confirmRemoval = async (userIds: string[]) => {
	let message = t("pages.rooms.members.multipleRemove.confirmation");
	if (userIds.length === 1) {
		const memberFullName = roomMembersStore.getMemberFullName(userIds[0]);
		message = t("pages.rooms.members.remove.confirmation", { memberFullName });
	}
	const shouldRemove = await askConfirmation({
		message,
		confirmActionLangKey: "common.actions.remove",
	});
	return shouldRemove;
};

const onChangePermission = (userIds: string[]) => {
	membersToChangeRole.value = roomMembersWithoutApplicants.value.filter(
		(member) => userIds.includes(member.userId)
	);

	isChangeRoleDialogOpen.value = true;
};

const onUpdateSelectedIds = (ids: string[]) => {
	selectedIds.value = ids;
};

const getAriaLabel = (
	member: RoomMember,
	actionFor: "remove" | "changeRole" | "" = ""
) => {
	const memberFullName = member.fullName;
	const mapActionToConst = {
		remove: "pages.rooms.members.remove.ariaLabel",
		changeRole: "pages.rooms.members.changePermission.ariaLabel",
		"": "pages.rooms.members.actionMenu.ariaLabel",
	};
	const languageKey = mapActionToConst[actionFor];
	return t(languageKey, { memberFullName });
};

const tableHeader = computed(() => {
	return [
		...baseTableHeaders.value,
		{
			title: canAddRoomMembers.value
				? t("pages.rooms.members.tableHeader.actions")
				: "",
			key: "actions",
			sortable: false,
			width: 50,
		},
	];
});

const getSchoolRoleIcon = (schoolRoleNames: RoleName[]) => {
	if (schoolRoleNames.includes(RoleName.Teacher)) {
		return mdiAccountSchoolOutline;
	}
	if (schoolRoleNames.includes(RoleName.Student)) {
		return mdiAccountOutline;
	}
	return undefined;
};
</script>
