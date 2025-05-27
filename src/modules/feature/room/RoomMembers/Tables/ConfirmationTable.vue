<template>
	<DataTable
		:items="roomApplicants"
		:header-bottom="headerBottom"
		:table-headers="tableHeaders"
		:show-select="true"
		select-item-key="userId"
		:external-selected-ids="confirmationSelectedIds"
		@update:selected-ids="onUpdateSelectedIds"
	>
		<template #[`action-menu-items`]>
			<KebabMenuActionConfirmRequest
				@click="onConfirm(confirmationSelectedIds)"
			/>
			<KebabMenuActionRejectRequest
				@click="onReject(confirmationSelectedIds)"
			/>
		</template>

		<template #[`item.actions`]="{ item }">
			<div class="d-flex align-center">
				<KebabMenu :data-testid="`kebab-menu-${item.id}`">
					<KebabMenuActionConfirmRequest
						:data-testid="`kebab-menu-confirm-${item.id}`"
						@click="onConfirm([item.userId])"
					/>

					<KebabMenuActionRejectRequest
						:data-testid="`kebab-menu-reject-${item.id}`"
						@click="onReject([item.userId])"
					/>
				</KebabMenu>
			</div>
		</template>
	</DataTable>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { DataTable } from "@ui-data-table";
import { useRoomMembersStore } from "@data-room";
import { KebabMenu } from "@ui-kebab-menu";
import {
	KebabMenuActionConfirmRequest,
	KebabMenuActionRejectRequest,
} from "../menus";
import { storeToRefs } from "pinia";
import { computed } from "vue";

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

const roomMembersStore = useRoomMembersStore();
const { roomApplicants: rawRoomApplicants, confirmationSelectedIds } =
	storeToRefs(roomMembersStore);

const { confirmInvitations, rejectInvitations } = roomMembersStore;

const roomApplicants = computed(() =>
	rawRoomApplicants.value.map((applicant) => ({ ...applicant }))
);

const onUpdateSelectedIds = (ids: string[]) => {
	confirmationSelectedIds.value = ids;
};

const onConfirm = async (ids: string[]) => {
	await confirmInvitations(ids);
};

const onReject = async (ids: string[]) => {
	await rejectInvitations(ids);
};

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
