<template>
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
	<ConfirmationDialog />
</template>

<script setup lang="ts">
import { type Registration, useRegistrationStore } from "@data-room";
import { ConfirmationDialog, useConfirmationDialog } from "@ui-confirmation-dialog";
import { DataTable } from "@ui-data-table";
import { KebabMenu, KebabMenuActionRemoveInvitation, KebabMenuActionResendInvitation } from "@ui-kebab-menu";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();
const registrationStore = useRegistrationStore();

const { roomRegistrations, selectedIds } = storeToRefs(registrationStore);

const { removeInvitations, resendInvitations } = registrationStore;
const { askConfirmation } = useConfirmationDialog();

const registrationTableData = computed(() => roomRegistrations.value as unknown as Record<string, unknown>[]);

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

// formatter to avoid recreating it on each re-render
const dateFormatter = computed(() => new Intl.DateTimeFormat(locale.value));

const formatDate = (isoDate: string) => dateFormatter.value.format(new Date(isoDate));

const getAriaLabel = (registration: Registration, actionFor: "remove" | "resend" | "" = "") => {
	const registrationEmail = registration.email;
	const mapActionToConst = {
		remove: "pages.rooms.members.registrations.remove.ariaLabel",
		resend: "pages.rooms.members.registrations.resend.ariaLabel",
		"": "pages.rooms.members.registrations.actionMenu.ariaLabel",
	};
	const languageKey = mapActionToConst[actionFor];
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
	},
]);
</script>
