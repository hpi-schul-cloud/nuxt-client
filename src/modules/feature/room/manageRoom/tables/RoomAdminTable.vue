<template>
	<DataTable
		aria-label-name-key="title"
		select-item-key="id"
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

const { roomList, selectedIds } = storeToRefs(administrationRoomStore);

const onUpdateSelectedIds = (ids: string[]) => {
	selectedIds.value = ids;
};

const headerKeys = [
	{ key: "name", sortable: true },
	{ key: "owner", sortable: true },
	{ key: "totalMembers", sortable: true },
	{ key: "internalMembers", sortable: true },
	{ key: "externalMembers", sortable: true },
	{ key: "creationDate", sortable: true },
	{ key: "mainSchool", sortable: true },
	{ key: "actions", sortable: false, width: 100, align: "center" },
];

const tableHeaders = headerKeys.map(({ key, ...rest }) => ({
	title: t(`pages.rooms.administration.table.header.${key}`),
	key,
	...rest,
}));
</script>
