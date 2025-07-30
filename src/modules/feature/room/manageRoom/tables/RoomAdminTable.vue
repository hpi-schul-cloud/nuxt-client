<template>
	<DataTable
		:items="roomList"
		:header-bottom="headerBottom"
		:table-headers="tableHeaders"
		:show-select="false"
		aria-label-name-key="name"
		select-item-key="roomId"
		data-testid="room-admin-table"
	>
		<template #[`item.owner`]="{ item }">
			<span>
				<v-icon
					v-if="!item.owner"
					:icon="mdiAlert"
					color="warning"
					class="text-medium-emphasis"
				/>
				{{
					item.owner || t("pages.rooms.administration.table.row.owner.notExist")
				}}
			</span>
		</template>

		<template #[`item.actions`]="{ item }">
			<KebabMenu
				:data-testid="`kebab-menu-${item.id}`"
				:aria-label="
					t('pages.rooms.administration.table.row.actionMenu.ariaLabel', {
						roomName: item.name,
					})
				"
			>
				<KebabMenuActionDelete
					scope-language-key="pages.rooms.administration.title"
					:name="'some title here'"
					:data-testid="'menu-delete-rooms'"
					@click="onDeleteRooms(item.roomId)"
				/>
			</KebabMenu>
		</template>
	</DataTable>
	<ConfirmationDialog>
		<template #alert>
			<v-alert
				class="mx-6 mb-4"
				type="warning"
				data-testid="error-alert"
				:icon="mdiAlert"
			>
				<span class="alert-text">some alert text</span>
			</v-alert>
		</template>
	</ConfirmationDialog>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { DataTable } from "@ui-data-table";
import { useAdministrationRoomStore } from "@data-room";
import { KebabMenu, KebabMenuActionDelete } from "@ui-kebab-menu";
import { storeToRefs } from "pinia";
import { mdiAlert } from "@icons/material";
import { computed } from "vue";
import {
	useConfirmationDialog,
	ConfirmationDialog,
} from "@ui-confirmation-dialog";

type Props = {
	headerBottom?: number;
	showSelect?: boolean;
};

withDefaults(defineProps<Props>(), {
	headerBottom: 0,
	showSelect: true,
});

const { t } = useI18n();
const { askConfirmation } = useConfirmationDialog();
const administrationRoomStore = useAdministrationRoomStore();

const { roomList } = storeToRefs(administrationRoomStore);

const confirmDeletion = async (id: string) => {
	if (!id) {
		return false;
	}
	const shouldDelete = await askConfirmation({
		message: "some confirmation message here",
		confirmActionLangKey: "common.actions.delete",
	});

	return shouldDelete;
};

const onDeleteRooms = async (id: string) => {
	const shouldDelete = await confirmDeletion(id);
	if (shouldDelete) {
		await administrationRoomStore.deleteRoom(id);
	}
};

const tableHeaders = computed(() => [
	{
		title: t("pages.rooms.administration.table.header.roomName"),
		key: "name",
	},
	{
		title: t("pages.rooms.administration.table.header.roomOwner"),
		key: "owner",
	},
	{
		title: t("pages.rooms.administration.table.header.totalMember"),
		key: "totalMembers",
	},
	{
		title: t("pages.rooms.administration.table.header.internalMember"),
		key: "internalMembers",
	},
	{
		title: t("pages.rooms.administration.table.header.externalMember"),
		key: "externalMembers",
	},
	{
		title: t("pages.rooms.administration.table.header.creationDate"),
		key: "createdAt",
	},
	{
		title: t("pages.rooms.administration.table.header.mainSchool"),
		key: "schoolName",
	},
	{
		title: t("pages.rooms.administration.table.header.actions"),
		key: "actions",
		sortable: false,
		width: 100,
		align: "center",
	},
]);
</script>

<style scoped>
.alert-text {
	color: rgba(var(--v-theme-on-background)) !important;
	line-height: var(--line-height-lg) !important;
}
</style>
