<template>
	<DataTable
		:items="confirmationList"
		:header-bottom="headerBottom"
		:table-headers="tableHeaders"
		:show-select="true"
		:external-selected-ids="confirmationSelectedIds"
		@update:selected-ids="onUpdateSelectedIds"
	>
		<template #[`action-menu-items`]>
			<KebabMenuActionConfirmRequest />
			<KebabMenuActionRejectRequest />
		</template>

		<template #[`item.actions`]="{ item }">
			<div class="d-flex align-center">
				<v-btn
					ref="acceptButton"
					variant="text"
					:aria-label="
						t('pages.rooms.members.invitationTable.shareButton.ariaLabel')
					"
					:data-testid="`share-button-${item.id}`"
					:icon="mdiAccountCheckOutline"
				/>
				<v-btn
					ref="rejectButton"
					variant="text"
					:aria-label="
						t('pages.rooms.members.invitationTable.shareButton.ariaLabel')
					"
					:data-testid="`share-button-${item.id}`"
					:icon="mdiAccountRemoveOutline"
				/>
			</div>
		</template>
	</DataTable>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { DataTable } from "@ui-data-table";
import { useRoomMembersStore } from "@data-room";
import {
	KebabMenuActionConfirmRequest,
	KebabMenuActionRejectRequest,
} from "../menus";
import {
	mdiAccountCheckOutline,
	mdiAccountRemoveOutline,
} from "@icons/material";
import { useConfirmationDialog } from "@ui-confirmation-dialog";
import { storeToRefs } from "pinia";

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

const { askConfirmation } = useConfirmationDialog();
const { confirmationList, confirmationSelectedIds } = storeToRefs(
	useRoomMembersStore()
);

const onUpdateSelectedIds = (ids: string[]) => {
	confirmationSelectedIds.value = ids;
};

// const prepareRemovalMessage = (linkIds: string[]) => {
// 	return linkIds.length > 1
// 		? t("pages.rooms.members.invitationTable.multipleDelete.confirmation")
// 		: t("pages.rooms.members.invitationTable.delete.confirmation", {
// 				invitation: confirmationSelectedIds.value.find(
// 					(link) => link.id === linkIds[0]
// 				)?.title,
// 			});
// };

// const confirmDeletion = async (linkIds: string[]) => {
// 	const shouldDelete = await askConfirmation({
// 		message: prepareRemovalMessage(linkIds),
// 		confirmActionLangKey: "common.actions.delete",
// 	});

// 	return shouldDelete;
// };

const tableHeaders = [
	{
		title: t("common.labels.firstName"),
		key: "firstName",
	},
	{
		title: t("common.labels.lastName"),
		key: "lastName",
	},
	{
		title: t("pages.rooms.members.tableHeader.schoolRole"),
		key: "displaySchoolRole",
	},
	{
		title: t("common.words.mainSchool"),
		key: "schoolName",
	},
	{
		title: t("pages.rooms.members.tableHeader.actions"),
		key: "actions",
		sortable: false,
		width: 50,
		align: "center",
	},
];
</script>
