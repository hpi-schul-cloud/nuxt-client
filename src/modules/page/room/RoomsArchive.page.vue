<template>
	<DefaultWireframe max-width="full" :breadcrumbs="breadcrumbs">
		<template #header>
			<h1 data-testid="page-title">{{ t("pages.rooms.archived.title") }}</h1>
		</template>

		<VContainer v-if="isLoading && isEmpty" class="loader">
			<VSkeletonLoader ref="skeleton-loader" type="table-thead, table-tbody" class="mt-6" />
		</VContainer>
		<EmptyState v-else-if="isEmpty" :title="t('pages.rooms.archived.emptyState')">
			<template #media>
				<RoomsEmptyStateSvg />
			</template>
		</EmptyState>
		<DataTable
			v-else
			:items="archivedRooms"
			:table-headers="tableHeaders"
			show-select
			data-testid="rooms-archive-table"
			:external-selected-ids="selectedIds"
			@update:selected-ids="selectedIds = $event"
		>
			<template #action-menu-items="{ selectedIds: ids }">
				<KebabMenuAction
					v-if="canRestoreSelection(ids)"
					:icon="mdiRestore"
					data-testid="rooms-archive-restore-selected"
					@click="onUnarchiveMany(ids)"
				>
					{{ t("common.actions.restore") }}
				</KebabMenuAction>
				<KebabMenuAction
					v-if="canDeleteSelection(ids)"
					:icon="mdiTrashCanOutline"
					data-testid="rooms-archive-delete-selected"
					@click="onDeleteMany(ids)"
				>
					{{ t("common.actions.delete") }}
				</KebabMenuAction>
			</template>

			<template #[`item.name`]="{ item }: ArchivedRoomTableItem">
				<RouterLink
					:to="{ name: 'room-details', params: { id: item.id } }"
					:data-testid="`rooms-archive-room-link-${item.id}`"
				>
					{{ item.name }}
				</RouterLink>
			</template>

			<template #[`item.ownerName`]="{ item }: ArchivedRoomTableItem">
				<span data-testid="rooms-archive-table-owner-not-existing">
					<VIcon v-if="!item.ownerName" :icon="mdiAlert" color="warning" class="text-medium-emphasis" />
					{{ item.ownerName || t("pages.rooms.administration.table.row.owner.notExist") }}
				</span>
			</template>

			<template #[`item.archivedAt`]="{ item }: ArchivedRoomTableItem">
				<span>{{ formatUtc(item.archivedAt, "date") }}</span>
			</template>

			<template #[`item.actions`]="{ item }: ArchivedRoomTableItem">
				<KebabMenu
					:data-testid="`kebab-menu-archived-room-${item.id}`"
					:aria-label="t('pages.rooms.archived.table.row.actionMenu.ariaLabel', { roomName: item.name })"
				>
					<KebabMenuAction
						v-if="item.allowedOperations?.archiveRoom"
						:icon="mdiRestore"
						:data-testid="`menu-restore-room-${item.id}`"
						@click="onUnarchiveOne(item)"
					>
						{{ t("common.actions.restore") }}
					</KebabMenuAction>
					<KebabMenuAction
						v-if="item.allowedOperations?.deleteRoom"
						:icon="mdiTrashCanOutline"
						:data-testid="`menu-delete-room-${item.id}`"
						@click="onDeleteOne(item)"
					>
						{{ t("common.actions.delete") }}
					</KebabMenuAction>
				</KebabMenu>
			</template>
		</DataTable>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { askDeletionForItem, askDeletionForType } from "@/utils/confirmation-dialog.utils";
import { formatUtc } from "@/utils/date-time.utils";
import { buildPageTitle } from "@/utils/pageTitle";
import { RoomArchivedItemResponse } from "@api-server";
import { notifySuccess, notifyWarning } from "@data-app";
import { useRoomStore } from "@data-room";
import { mdiAlert, mdiRestore, mdiTrashCanOutline } from "@icons/material";
import { DataTable } from "@ui-data-table";
import { EmptyState, RoomsEmptyStateSvg } from "@ui-empty-state";
import { KebabMenu, KebabMenuAction } from "@ui-kebab-menu";
import { Breadcrumb, DefaultWireframe } from "@ui-layout";
import { useTitle } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { DataTableHeader } from "vuetify";

type ArchivedRoomTableItem = { item: RoomArchivedItemResponse };
type ArchivedRoomTableHeaderKey = keyof RoomArchivedItemResponse | "actions";
type ArchivedRoomTableHeader = Omit<DataTableHeader, "key"> & {
	key: ArchivedRoomTableHeaderKey;
};

const { t } = useI18n();

const roomStore = useRoomStore();
const { archivedRooms, isLoading } = storeToRefs(roomStore);
const { fetchArchivedRooms, unarchiveRoom, deleteRoom } = roomStore;

const pageTitle = computed(() => buildPageTitle(t("pages.rooms.archived.title")));
useTitle(pageTitle);

const breadcrumbs: Breadcrumb[] = [
	{
		title: t("pages.rooms.title"),
		to: "/rooms",
	},
	{
		title: t("pages.rooms.archived.title"),
		disabled: true,
	},
];

const isEmpty = computed(() => archivedRooms.value.length === 0);
const selectedIds = ref<string[]>([]);

const tableHeaders = computed((): ArchivedRoomTableHeader[] => [
	{ title: t("pages.rooms.administration.table.header.roomName"), key: "name" },
	{ title: t("pages.rooms.administration.table.header.roomOwner"), key: "ownerName" },
	{ title: t("pages.rooms.administration.table.header.totalMember"), key: "totalMembers", align: "end" },
	{ title: t("pages.rooms.archived.table.header.archivedAt"), key: "archivedAt" },
	{ title: t("pages.rooms.administration.table.header.mainSchool"), key: "schoolName" },
	{ title: t("pages.rooms.administration.table.header.actions"), key: "actions", sortable: false, align: "end" },
]);

const permittedRoomIds = (roomIds: string[], permission: "archiveRoom" | "deleteRoom") =>
	archivedRooms.value
		.filter((room) => roomIds.includes(room.id) && room.allowedOperations?.[permission])
		.map((room) => room.id);

const canRestoreSelection = (roomIds: string[]) => permittedRoomIds(roomIds, "archiveRoom").length > 0;
const canDeleteSelection = (roomIds: string[]) => permittedRoomIds(roomIds, "deleteRoom").length > 0;

const onUnarchiveOne = async (item: RoomArchivedItemResponse) => {
	const { success } = await unarchiveRoom(item.id);
	if (success) {
		notifySuccess(t("pages.rooms.archived.restore.success", { count: 1 }, 1));
	}
	await fetchArchivedRooms();
};

const onUnarchiveMany = async (roomIds: string[]) => {
	const restorableIds = permittedRoomIds(roomIds, "archiveRoom");

	await Promise.all(restorableIds.map((roomId) => unarchiveRoom(roomId)));

	if (restorableIds.length > 0 && restorableIds.length < roomIds.length) {
		notifyWarning(t("pages.rooms.archived.restore.partial", { count: restorableIds.length, total: roomIds.length }));
	} else if (restorableIds.length > 0) {
		notifySuccess(t("pages.rooms.archived.restore.success", { count: restorableIds.length }, restorableIds.length));
	}

	selectedIds.value = [];
	await fetchArchivedRooms();
};

const onDeleteOne = async (item: RoomArchivedItemResponse) => {
	const shouldDelete = await askDeletionForItem(item.name, "common.labels.room");
	if (!shouldDelete) return;

	await deleteRoom(item.id);
	await fetchArchivedRooms();
};

const onDeleteMany = async (roomIds: string[]) => {
	const shouldDelete = await askDeletionForType("common.labels.room");
	if (!shouldDelete) return;

	const deletableIds = permittedRoomIds(roomIds, "deleteRoom");

	await Promise.all(deletableIds.map((roomId) => deleteRoom(roomId)));

	if (deletableIds.length > 0 && deletableIds.length < roomIds.length) {
		notifyWarning(t("pages.rooms.archived.delete.partial", { count: deletableIds.length, total: roomIds.length }));
	}

	selectedIds.value = [];
	await fetchArchivedRooms();
};

onMounted(() => {
	fetchArchivedRooms();
});
</script>
