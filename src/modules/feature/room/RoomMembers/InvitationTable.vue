<template>
	<!-- :items="tableData" -->
	<DataTable :table-headers="tableHeaders" :show-select="true" v-bind="$attrs">
		<template #[`item.actions`]="{ item }">
			<div class="d-flex align-center">
				<v-btn variant="text" :icon="mdiShareVariantOutline" />
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
import {
	KebabMenu,
	KebabMenuActionShare,
	KebabMenuActionEdit,
	KebabMenuActionDelete,
} from "@ui-kebab-menu";
import { mdiShareVariantOutline } from "@icons/material";

const { t } = useI18n();

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

const tableData = [
	{
		title: "Invitation for Math Club",
		restrictedToCreatorSchool: true,
		validForStudents: true,
		activeUntil: "2023-12-31",
		requiresConfirmation: false,
		status: "Active",
		actions: "Edit",
	},
	{
		title: "Invitation for Science Fair",
		restrictedToCreatorSchool: false,
		validForStudents: true,
		activeUntil: "2024-01-15",
		requiresConfirmation: true,
		status: "Pending",
		actions: "View",
	},
	{
		title: "Invitation for Art Workshop",
		restrictedToCreatorSchool: true,
		validForStudents: false,
		activeUntil: "2023-11-20",
		requiresConfirmation: true,
		status: "Expired",
		actions: "Delete",
	},
	{
		title: "Invitation for Sports Event",
		restrictedToCreatorSchool: false,
		validForStudents: true,
		activeUntil: "2024-02-10",
		requiresConfirmation: false,
		status: "Active",
		actions: "Edit",
	},
	{
		title: "Invitation for Music Concert",
		restrictedToCreatorSchool: true,
		validForStudents: true,
		activeUntil: "2023-12-10",
		requiresConfirmation: false,
		status: "Active",
		actions: "Edit",
	},
	{
		title: "Invitation for Coding Bootcamp",
		restrictedToCreatorSchool: false,
		validForStudents: true,
		activeUntil: "2024-03-01",
		requiresConfirmation: true,
		status: "Pending",
		actions: "View",
	},
	{
		title: "Invitation for Drama Club",
		restrictedToCreatorSchool: true,
		validForStudents: false,
		activeUntil: "2023-11-25",
		requiresConfirmation: true,
		status: "Expired",
		actions: "Delete",
	},
	{
		title: "Invitation for Debate Competition",
		restrictedToCreatorSchool: false,
		validForStudents: true,
		activeUntil: "2024-01-20",
		requiresConfirmation: false,
		status: "Active",
		actions: "Edit",
	},
	{
		title: "Invitation for Robotics Workshop",
		restrictedToCreatorSchool: true,
		validForStudents: true,
		activeUntil: "2024-02-15",
		requiresConfirmation: true,
		status: "Pending",
		actions: "View",
	},
];
</script>
