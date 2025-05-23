<template>
	<DataTable
		aria-label-name-key="title"
		:items="invitationTableData"
		:header-bottom="headerBottom"
		:table-headers="tableHeaders"
		:show-select="true"
		:external-selected-ids="selectedIds"
		@update:selected-ids="onUpdateSelectedIds"
	>
		<template #[`action-menu-items`]>
			<KebabMenuActionDeleteMemberInvitation
				@click="onDeleteLinks(selectedIds)"
			/>
		</template>

		<template #[`item.actions`]="{ item }">
			<div class="d-flex align-center">
				<v-btn
					ref="shareButton"
					variant="text"
					size="36"
					:aria-label="
						t('pages.rooms.members.invitationTable.shareButton.ariaLabel')
					"
					:data-testid="`share-button-${item.id}`"
					:icon="mdiShareVariantOutline"
					@click="onOpenShareModal(item.id)"
				/>
				<KebabMenu :data-testid="`kebab-menu-${item.id}`">
					<KebabMenuActionEdit
						:data-testid="`menu-edit-button-${item.id}`"
						@click="onEdit(item.id)"
					/>
					<KebabMenuActionShare
						:text="t('common.actions.share')"
						:data-testid="`menu-share-button-${item.id}`"
						@click="onOpenShareModal(item.id)"
					/>
					<KebabMenuActionDelete
						scope-language-key="pages.rooms.invitationLinkStatus.title"
						:name="item.title"
						:data-testid="`menu-delete-button-${item.id}`"
						@click="onDeleteLinks([item.id])"
					/>
				</KebabMenu>
			</div>
		</template>
	</DataTable>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { DataTable } from "@ui-data-table";
import { InvitationStep, useRoomInvitationLinkStore } from "@data-room";
import {
	KebabMenu,
	KebabMenuActionShare,
	KebabMenuActionEdit,
	KebabMenuActionDelete,
	KebabMenuActionDeleteMemberInvitation,
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

const onUpdateSelectedIds = (ids: string[]) => {
	selectedIds.value = ids;
};

const prepareRemovalMessage = (linkIds: string[]) => {
	return linkIds.length > 1
		? t("pages.rooms.members.invitationTable.multipleDelete.confirmation")
		: t("pages.rooms.members.invitationTable.delete.confirmation", {
				invitation: invitationTableData.value.find(
					(link) => link.id === linkIds[0]
				)?.title,
			});
};

const confirmDeletion = async (linkIds: string[]) => {
	const shouldDelete = await askConfirmation({
		message: prepareRemovalMessage(linkIds),
		confirmActionLangKey: "common.actions.delete",
	});

	return shouldDelete;
};

const onDeleteLinks = async (linkIds: string[]) => {
	const shouldDelete = await confirmDeletion(linkIds);
	if (shouldDelete) {
		await roomInvitationLinkStore.deleteLinks(linkIds);
	}
};

const onEdit = async (linkId: string) => {
	editedLink.value =
		roomInvitationLinks.value.find((link) => link.id === linkId) || null;
	invitationStep.value = InvitationStep.EDIT;
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
		key: "isValidForStudents",
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
		align: "center",
	},
];

const onOpenShareModal = (itemId: string) => {
	invitationStep.value = InvitationStep.SHARE;
	sharedUrl.value = `${window.location.origin}/rooms/invitation-link/${itemId}`;
	isInvitationDialogOpen.value = true;
};
</script>
