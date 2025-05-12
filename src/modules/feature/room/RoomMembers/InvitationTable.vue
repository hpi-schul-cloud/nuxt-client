<template>
	<DataTable
		:items="invitationTableData"
		:header-bottom="headerBottom"
		:table-headers="tableHeaders"
		:show-select="true"
		:external-selected-ids="selectedIds"
		@update:model-value="updateSelectedIds"
	>
		<template #[`action-menu-items`]>
			<KebabMenuActionRemoveMember @click="onRemoveLinks(selectedIds)" />
		</template>

		<template #[`item.title`]="{ item }">
			<span :class="{ 'text-medium-emphasis': item.isExpired }">{{
				item.title
			}}</span>
		</template>
		<template #[`item.restrictedToCreatorSchool`]="{ item }">
			<span :class="{ 'text-medium-emphasis': item.isExpired }"
				>{{ item.restrictedToCreatorSchool }}
			</span>
		</template>
		<template #[`item.validForStudents`]="{ item }">
			<span :class="{ 'text-medium-emphasis': item.isExpired }">{{
				item.validForStudents
			}}</span>
		</template>
		<template #[`item.activeUntil`]="{ item }">
			<span :class="{ 'text-medium-emphasis': item.isExpired }">{{
				item.activeUntil
			}}</span>
		</template>
		<template #[`item.requiresConfirmation`]="{ item }">
			<span :class="{ 'text-medium-emphasis': item.isExpired }">{{
				item.requiresConfirmation
			}}</span>
		</template>
		<template #[`item.status`]="{ item }">
			<span :class="{ 'text-medium-emphasis': item.isExpired }">{{
				item.status
			}}</span>
		</template>

		<template #[`item.actions`]="{ item }">
			<div
				class="d-flex align-center"
				:class="{ 'text-medium-emphasis': item.isExpired }"
			>
				<v-btn
					variant="text"
					:icon="mdiShareVariantOutline"
					@click="openShareModal(item.id)"
				/>
				<KebabMenu>
					<KebabMenuActionEdit @click="onEdit(item.id)" />
					<KebabMenuActionShare
						:text="t('common.actions.share')"
						@click="openShareModal(item.id)"
					/>
					<KebabMenuActionDelete
						scope-language-key="pages.rooms.invitationLinkStatus.title"
						:name="item.title"
						@click="onRemoveLinks([item.id])"
					/>
				</KebabMenu>
			</div>
		</template>
	</DataTable>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { DataTable } from "@ui-data-table";
import { RoomInvitationLink, useRoomInvitationLinkStore } from "@data-room";
import {
	KebabMenu,
	KebabMenuActionShare,
	KebabMenuActionEdit,
	KebabMenuActionDelete,
	KebabMenuActionRemoveMember,
} from "@ui-kebab-menu";
import { mdiShareVariantOutline } from "@icons/material";
import { storeToRefs } from "pinia";
import { useConfirmationDialog } from "@ui-confirmation-dialog";

const { t } = useI18n();

defineProps({
	headerBottom: {
		type: Number,
		default: 0,
	},
	showSelect: {
		type: Boolean,
		default: false,
	},
});

const roomInvitationLinkStore = useRoomInvitationLinkStore();
const {
	editedLink,
	invitationTableData,
	invitationStep,
	isInvitationDialogOpen,
	roomInvitationLinks,
	sharedUrl,
	selectedIds,
} = storeToRefs(roomInvitationLinkStore);
const { askConfirmation } = useConfirmationDialog();

const updateSelectedIds = (ids: string[]) => {
	selectedIds.value = ids;
};

const confirmRemoval = async (linkIds: string[]) => {
	let message = t(
		"pages.rooms.members.invitationTable.multipleDelete.confirmation"
	);
	if (linkIds.length === 1) {
		const invitationTitle = invitationTableData.value.find(
			(link) => link.title === linkIds[0]
		)?.title;
		message = t("pages.rooms.members.invitationTable.delete.confirmation", {
			invitation: invitationTitle,
		});
	}
	const shouldRemove = await askConfirmation({
		message,
		confirmActionLangKey: "common.actions.remove",
	});
	return shouldRemove;
};

const onRemoveLinks = async (linkIds: string[]) => {
	const shouldRemove = await confirmRemoval(linkIds);
	if (shouldRemove) {
		await roomInvitationLinkStore.deleteLinks(linkIds);
	}
};

const onEdit = async (linkId: string) => {
	editedLink.value =
		roomInvitationLinks.value.find((link) => link.id === linkId) || null;
	invitationStep.value = "edit";
	isInvitationDialogOpen.value = true;
};

const tableHeaders = [
	{
		title: t("pages.rooms.members.tableHeader.description"),
		key: "title",
	},
	{
		title: t("pages.rooms.members.tableHeader.onlyValidWithinTheSchool"),
		key: "restrictedToCreatorSchool",
	},
	{
		title: t("pages.rooms.members.tableHeader.validForStudents"),
		key: "validForStudents",
	},
	{
		title: t("pages.rooms.members.tableHeader.expirationDate"),
		key: "activeUntil",
	},
	{
		title: t("pages.rooms.members.tableHeader.confirmationRequired"),
		key: "requiresConfirmation",
	},
	{
		title: t("pages.rooms.members.tableHeader.status"),
		key: "status",
	},
	{
		title: t("pages.rooms.members.tableHeader.actions"),
		key: "actions",
		sortable: false,
		width: 100,
	},
];

const openShareModal = (itemId: string) => {
	invitationStep.value = "share";
	sharedUrl.value = `${window.location.origin}/rooms/invitation-link/${itemId}`;
	isInvitationDialogOpen.value = true;
};
</script>
