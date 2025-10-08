<template>
	<DataTable
		:items="roomApplicants"
		:header-bottom="headerBottom"
		:table-headers="tableHeaders"
		:show-select="showSelect"
		select-item-key="userId"
		aria-label-name-key="fullName"
		:external-selected-ids="confirmationSelectedIds"
		@update:selected-ids="onUpdateSelectedIds"
	>
		<template #[`action-menu-items`]>
			<KebabMenuActionConfirmRequest
				:aria-label="t('pages.rooms.members.confirmationTable.menus.confirm.label')"
				@click="onConfirm(confirmationSelectedIds)"
			/>
			<KebabMenuActionRejectRequest
				:aria-label="t('pages.rooms.members.confirmationTable.menus.reject.label')"
				@click="onReject(confirmationSelectedIds)"
			/>
		</template>

		<template #[`item.actions`]="{ item }">
			<div class="d-flex align-center">
				<KebabMenu :data-testid="`kebab-menu-${item.userId}`" :aria-label="getAriaLabel(item)">
					<KebabMenuActionConfirmRequest
						:data-testid="`kebab-menu-confirm-${item.userId}`"
						:aria-label="getAriaLabel(item, 'confirm')"
						@click="onConfirm([item.userId])"
					/>

					<KebabMenuActionRejectRequest
						:data-testid="`kebab-menu-reject-${item.userId}`"
						:aria-label="getAriaLabel(item, 'reject')"
						@click="onReject([item.userId])"
					/>
				</KebabMenu>
			</div>
		</template>
	</DataTable>
</template>

<script setup lang="ts">
import { KebabMenuActionConfirmRequest, KebabMenuActionRejectRequest } from "../menus";
import { useRoomMembersStore } from "@data-room";
import { DataTable } from "@ui-data-table";
import { KebabMenu } from "@ui-kebab-menu";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

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

const { t } = useI18n();
const roomMembersStore = useRoomMembersStore();
const { roomApplicants: rawRoomApplicants, confirmationSelectedIds } = storeToRefs(roomMembersStore);
const { confirmInvitations, rejectInvitations } = roomMembersStore;
const roomApplicants = computed(() => rawRoomApplicants.value.map((applicant) => ({ ...applicant })));

const onUpdateSelectedIds = (ids: string[]) => {
	confirmationSelectedIds.value = ids;
};

const onConfirm = async (ids: string[]) => {
	await confirmInvitations(ids);
};

const onReject = async (ids: string[]) => {
	await rejectInvitations(ids);
};

const getAriaLabel = (item: { fullName: string }, actionFor?: "confirm" | "reject") =>
	actionFor
		? t(`pages.rooms.members.confirmationTable.actionMenu.${actionFor}.ariaLabel`, {
				fullName: item.fullName,
			})
		: t("pages.rooms.members.confirmationTable.actionMenu.ariaLabel", {
				fullName: item.fullName,
			});

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
