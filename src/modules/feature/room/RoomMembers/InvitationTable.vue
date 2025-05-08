<template>
	<DataTable :table-headers="tableHeaders" :show-select="true" v-bind="$attrs">
		<template #[`item.actions`]="{ item }">
			<div class="d-flex align-center">
				<v-btn
					variant="text"
					:icon="mdiShareVariantOutline"
					@click="openShareModal(item.id)"
				/>
				<KebabMenu>
					<KebabMenuActionEdit />
					<KebabMenuActionShare :text="t('common.actions.share')" />
					<KebabMenuActionDelete
						scope-language-key="pages.rooms.invitationLinkStatus.title"
						:name="item.title"
					/>
				</KebabMenu>
			</div>
		</template>
	</DataTable>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { DataTable } from "@ui-data-table";
import { useRoomInvitationLinkStore } from "@data-room";
import {
	KebabMenu,
	KebabMenuActionShare,
	KebabMenuActionEdit,
	KebabMenuActionDelete,
} from "@ui-kebab-menu";
import { mdiShareVariantOutline } from "@icons/material";
import { storeToRefs } from "pinia";

const emit = defineEmits<{
	(e: "open:shareModal", value: string): void;
}>();

enum InvitationStep {
	PREPARE = "prepare",
	SHARE = "share",
}

const { t } = useI18n();

const roomInvitationLinkStore = useRoomInvitationLinkStore();
const { shareDialogStep, isInvitationDialogOpen } = storeToRefs(
	roomInvitationLinkStore
);

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
	shareDialogStep.value = InvitationStep.SHARE;
	isInvitationDialogOpen.value = true;
	emit("open:shareModal", itemId);
};
</script>
