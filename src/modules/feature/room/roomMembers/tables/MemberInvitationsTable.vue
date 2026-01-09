<template>
	<div class="member-invitations-table">
		<DataTable
			:items="registrationTableData"
			:table-headers="tableHeaders"
			:show-select="true"
			:external-selected-ids="selectedIds"
			data-testid="participant-invitations-table"
			select-item-key="id"
			aria-label-name-key="email"
			@update:selected-ids="onUpdateSelectedIds"
		>
			<template #[`item.updatedAt`]="{ item }">
				<span class="text-no-wrap">
					{{ formatDate(item.updatedAt) }}
				</span>
			</template>
			<template #[`action-menu-items`]>
				<KebabMenuActionResendInvitation @click="onResendInvitation(selectedIds)" />
				<KebabMenuActionRemoveInvitation @click="onRemoveInvitation(selectedIds)" />
			</template>
			<template #[`item.actions`]="{ item, index }">
				<KebabMenu :data-testid="`kebab-menu-${index}`" :aria-label="getAriaLabel(item)">
					<KebabMenuActionResendInvitation
						:aria-label="getAriaLabel(item, 'resend')"
						@click="onResendInvitation([item.id])"
					/>
					<KebabMenuActionRemoveInvitation
						:aria-label="getAriaLabel(item, 'remove')"
						@click="onRemoveInvitation([item.id])"
					/>
				</KebabMenu>
			</template>
		</DataTable>
	</div>
	<ConfirmationDialog />
</template>

<script setup lang="ts">
import { KebabMenuActionRemoveInvitation, KebabMenuActionResendInvitation } from "../menus";
import { type Registration, useRegistrationStore } from "@data-room";
import { ConfirmationDialog, useConfirmationDialog } from "@ui-confirmation-dialog";
import { DataTable } from "@ui-data-table";
import { KebabMenu } from "@ui-kebab-menu";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();
const registrationStore = useRegistrationStore();

const { registrations, selectedIds } = storeToRefs(registrationStore);

const { removeInvitations, resendInvitations } = registrationStore;
const { askConfirmation } = useConfirmationDialog();

const registrationTableData = computed(() => registrations.value as unknown as Record<string, unknown>[]);

const onRemoveInvitation = async (registrationIds: string[]) => {
	const shouldRemove = await confirmRemoval(registrationIds);
	if (shouldRemove) await removeInvitations(registrationIds);
};

const onResendInvitation = async (registrationIds: string[]) => {
	await resendInvitations(registrationIds);
};

const confirmRemoval = async (invitationIds: string[]) => {
	let message = t("pages.rooms.members.registrations.multipleRemove.confirmation");
	if (invitationIds.length === 1) {
		const invitedEmail = registrationStore.getEmailOfRegistration(invitationIds[0]);
		message = t("pages.rooms.members.registrations.remove.confirmation", { invitedEmail });
	}
	const shouldRemove = await askConfirmation({
		message,
		confirmActionLangKey: "common.actions.delete",
	});
	return shouldRemove;
};

const onUpdateSelectedIds = (ids: string[]) => {
	selectedIds.value = ids;
};

const formatDate = (isoDate: string) => Intl.DateTimeFormat(locale.value).format(new Date(isoDate));

const getAriaLabel = (registration: Registration, actionFor: "remove" | "resend" | "" = "") => {
	const registrationEmail = registration.email;
	const mapActionToLanguageKey = {
		remove: "pages.rooms.members.registrations.remove.ariaLabel",
		resend: "pages.rooms.members.registrations.resend.ariaLabel",
		"": "pages.rooms.members.registrations.actionMenu.ariaLabel",
	};
	const languageKey = mapActionToLanguageKey[actionFor];
	return t(languageKey, { registrationEmail });
};

const tableHeaders = computed(() => [
	{
		title: t("common.labels.firstName"),
		key: "firstName",
	},
	{
		title: t("common.labels.lastName"),
		key: "lastName",
	},
	{
		title: t("common.labels.email"),
		key: "email",
	},
	{
		title: t("common.labels.invitedDate"),
		key: "updatedAt",
	},
	{
		title: t("pages.rooms.members.tableHeader.actions"),
		key: "actions",
		sortable: false,
		width: 50,
		align: "center",
	},
]);
</script>

<style lang="scss" scoped>
.member-invitations-table :deep(.table-title-header.pt-7) {
	padding-top: 8px !important;
}
</style>
