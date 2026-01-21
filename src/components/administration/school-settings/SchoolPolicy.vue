<template>
	<div>
		<ErrorAlert
			v-if="status === 'error'"
			class="mb-6"
			data-testid="error-alert"
			:text="$t('pages.administration.school.index.schoolPolicy.error')"
		/>
		<template v-else>
			<v-progress-linear v-if="status === 'pending'" indeterminate class="mb-6" data-testid="progress-bar" />
			<v-list-item
				v-else
				lines="two"
				class="mb-6"
				data-testid="policy-item"
				:class="{ 'item-no-action': !privacyPolicy }"
				:ripple="privacyPolicy !== null"
				@click="downloadPolicy"
			>
				<template #prepend>
					<v-icon :icon="mdiFilePdfBox" />
				</template>
				<v-list-item-title class="text-body-1 mb-2">
					{{ $t("pages.administration.school.index.schoolPolicy.fileName") }}
				</v-list-item-title>
				<v-list-item-subtitle class="text-body-2">
					<template v-if="privacyPolicy">
						{{
							$t("pages.administration.school.index.schoolPolicy.uploadedOn", {
								date: formatDate(privacyPolicy.publishedAt),
							})
						}}
					</template>
					<template v-else>
						{{ $t("pages.administration.school.index.schoolPolicy.notUploadedYet") }}
					</template>
				</v-list-item-subtitle>
				<template #append>
					<v-list-item-action
						v-if="hasSchoolEditPermission"
						data-testid="edit-button"
						@click.stop="isSchoolPolicyFormDialogOpen = true"
					>
						<v-btn
							:icon="mdiTrayArrowUp"
							variant="text"
							:aria-label="$t('pages.administration.school.index.schoolPolicy.edit')"
						/>
					</v-list-item-action>
					<v-list-item-action v-if="privacyPolicy" data-testid="delete-button" @click.stop="onDelete">
						<v-btn
							:icon="mdiTrashCanOutline"
							variant="text"
							:aria-label="$t('pages.administration.school.index.schoolPolicy.delete.title')"
						/>
					</v-list-item-action>
				</template>
			</v-list-item>
			<SchoolPolicyFormDialog
				v-if="hasSchoolEditPermission"
				:is-open="isSchoolPolicyFormDialogOpen"
				data-testid="form-dialog"
				@close="closeDialog"
			/>
			<ConfirmationDialog>
				<InfoAlert>
					{{ $t("pages.administration.school.index.schoolPolicy.delete.text") }}
				</InfoAlert>
			</ConfirmationDialog>
		</template>
	</div>
</template>

<script setup lang="ts">
import SchoolPolicyFormDialog from "./SchoolPolicyFormDialog.vue";
import { formatDateForAlerts } from "@/plugins/datetime";
import { Permission } from "@/serverApi/v3";
import { ConsentVersion } from "@/store/types/consent-version";
import { School } from "@/store/types/schools";
import { downloadFile } from "@/utils/fileHelper";
import { injectStrict, PRIVACY_POLICY_MODULE_KEY, SCHOOLS_MODULE_KEY } from "@/utils/inject";
import { notifySuccess, useAppStore } from "@data-app";
import { mdiFilePdfBox, mdiTrashCanOutline, mdiTrayArrowUp } from "@icons/material";
import { ErrorAlert, InfoAlert } from "@ui-alert";
import { ConfirmationDialog, useConfirmationDialog } from "@ui-confirmation-dialog";
import { computed, ComputedRef, Ref, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const privacyPolicyModule = injectStrict(PRIVACY_POLICY_MODULE_KEY);
const schoolsModule = injectStrict(SCHOOLS_MODULE_KEY);
const isSchoolPolicyFormDialogOpen: Ref<boolean> = ref(false);

const school: ComputedRef<School> = computed(() => schoolsModule.getSchool);

watch(
	school,
	async (newValue) => {
		await privacyPolicyModule.fetchPrivacyPolicy(newValue.id);
	},
	{ immediate: true }
);

const hasSchoolEditPermission = useAppStore().hasPermission(Permission.SchoolEdit);

const privacyPolicy: ComputedRef<ConsentVersion | null> = computed(() => privacyPolicyModule.getPrivacyPolicy);
const status: ComputedRef<string> = computed(() => privacyPolicyModule.getStatus);

const formatDate = (dateTime: string) => formatDateForAlerts(dateTime, true);

const downloadPolicy = () => {
	if (privacyPolicy.value) {
		downloadFile(privacyPolicy.value.consentData.data, t("pages.administration.school.index.schoolPolicy.fileName"));
	}
};

const { askConfirmation } = useConfirmationDialog();
const onDelete = async () => {
	const shouldDelete = await askConfirmation({
		message: t("pages.administration.school.index.schoolPolicy.delete.title"),
		confirmActionLangKey: "common.actions.delete",
	});

	if (shouldDelete) {
		await deleteFile();
	}
};

const deleteFile = async () => {
	await privacyPolicyModule.deletePrivacyPolicy();

	notifySuccess(t("pages.administration.school.index.schoolPolicy.delete.success"));
};

const closeDialog = () => {
	isSchoolPolicyFormDialogOpen.value = false;
};
</script>

<style scoped>
.item-no-action {
	&:hover {
		cursor: default;
	}
	&:before {
		background-color: unset;
	}
}
</style>
