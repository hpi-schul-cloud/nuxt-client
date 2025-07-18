<template>
	<DataTable
		aria-label-name-key="title"
		:items="roomList"
		:header-bottom="headerBottom"
		:table-headers="tableHeaders"
		:show-select="true"
		:external-selected-ids="selectedIds"
		@update:selected-ids="onUpdateSelectedIds"
	>
		<template #[`action-menu-items`]> &nbsp; </template>

		<template #[`item.owner`]="{ item }">
			<span>
				<v-icon
					v-if="!item.owner"
					:icon="mdiAlertOutline"
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
				&nbsp;
			</KebabMenu>
		</template>
	</DataTable>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { DataTable } from "@ui-data-table";
import { useAdministrationRoomStore } from "@data-room";
import { KebabMenu } from "@ui-kebab-menu";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { mdiAlertOutline } from "@icons/material";

type Props = {
	headerBottom?: number;
	showSelect?: boolean;
};

withDefaults(defineProps<Props>(), {
	headerBottom: 0,
	showSelect: true,
});
const { t } = useI18n();
const administrationRoomStore = useAdministrationRoomStore();
const { fetchRooms } = administrationRoomStore;
const { roomList, selectedIds } = storeToRefs(administrationRoomStore);

const onUpdateSelectedIds = (ids: string[]) => {
	selectedIds.value = ids;
};

onMounted(async () => {
	await fetchRooms();
});

const tableHeaders = [
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
		key: "creationDate",
	},
	{
		title: t("pages.rooms.administration.table.header.mainSchool"),
		key: "mainSchool",
	},
	{
		title: t("pages.rooms.administration.table.header.actions"),
		key: "actions",
		sortable: false,
		width: 100,
		align: "center",
	},
];
</script>
