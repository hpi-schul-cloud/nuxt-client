<template>
	<DataTable
		:items="roomList"
		:header-bottom="headerBottom"
		:table-headers="tableHeaders"
		aria-label-name-key="name"
		select-item-key="roomId"
		data-testid="room-admin-table"
	>
		<template #[`item.owner`]="{ item }: RoomAdminTableItem">
			<span data-testid="room-admin-table-owner-not-existing">
				<VIcon v-if="!item.owner" :icon="mdiAlert" color="warning" class="text-medium-emphasis" />
				{{ item.owner || t("pages.rooms.administration.table.row.owner.notExist") }}
			</span>
		</template>

		<template #[`item.actions`]="{ item }: RoomAdminTableItem">
			<KebabMenu
				:data-testid="`kebab-menu-room-${item.roomId}`"
				:aria-label="
					t('pages.rooms.administration.table.row.actionMenu.ariaLabel', {
						roomName: item.name,
					})
				"
			>
				<KebabMenuActionRoomMembers
					:members-info-text="t('pages.rooms.administration.table.actionMenu.manageRoom')"
					:data-testid="`menu-manage-room-${item.roomId}`"
					@click="onManageRoom(item.roomId)"
				/>
				<KebabMenuAction
					v-if="userSchoolId === item.schoolId"
					:icon="mdiTrashCanOutline"
					:data-testid="`menu-delete-room-${item.roomId}`"
					@click="onDeleteRoom(item)"
				>
					{{ t("pages.rooms.administration.table.actionMenu.delete") }}
				</KebabMenuAction>
			</KebabMenu>
		</template>
	</DataTable>
</template>

<script setup lang="ts">
import { askDeletion } from "@/utils/confirm-dialog.utils";
import { RoomStatsItemResponse } from "@api-server";
import { useAdministrationRoomStore } from "@data-room";
import { mdiAlert, mdiTrashCanOutline } from "@icons/material";
import { DataTable } from "@ui-data-table";
import { KebabMenu, KebabMenuAction, KebabMenuActionRoomMembers } from "@ui-kebab-menu";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { DataTableHeader } from "vuetify";

type RoomAdminTableItem = { item: RoomStatsItemResponse };

type Props = {
	headerBottom?: number;
	showSelect?: boolean;
};

withDefaults(defineProps<Props>(), {
	headerBottom: 0,
	showSelect: true,
});

const emit = defineEmits<{
	(e: "manage-room-members", value: string): void;
}>();

const { t } = useI18n();

const administrationRoomStore = useAdministrationRoomStore();
const { deleteRoom } = administrationRoomStore;
const { roomList, userSchoolId } = storeToRefs(administrationRoomStore);

const onDeleteRoom = async (item: RoomStatsItemResponse) => {
	const shouldDelete = await askDeletion(
		t("ui-confirmation-dialog.ask-delete", {
			itemType: t("common.labels.room"),
			itemTitle: item.name,
		}),
		"pages.rooms.administration.table.delete.infoMessage"
	);
	if (shouldDelete) {
		await deleteRoom(item.roomId);
	}
};

const onManageRoom = async (roomId: string) => {
	emit("manage-room-members", roomId);
};

type RoomTableHeaderKey = keyof RoomStatsItemResponse | "actions";
type RoomTableHeader = Omit<DataTableHeader, "key"> & {
	key: RoomTableHeaderKey;
};

const tableHeaders = computed((): RoomTableHeader[] => [
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
		align: "end",
	},
	{
		title: t("pages.rooms.administration.table.header.internalMember"),
		key: "internalMembers",
		align: "end",
	},
	{
		title: t("pages.rooms.administration.table.header.externalMember"),
		key: "externalMembers",
		align: "end",
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
