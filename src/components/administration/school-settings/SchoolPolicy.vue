<template>
	<div>
		<ErrorAlert v-if="status === 'error'" data-testid="error-alert">
			{{ t("pages.administration.school.index.schoolPolicy.error") }}
		</ErrorAlert>
		<template v-else>
			<VProgressLinear v-if="status === 'pending'" indeterminate class="mb-6" data-testid="progress-bar" />
			<VListItem
				v-else
				lines="two"
				class="mb-6"
				data-testid="policy-item"
				:prepend-icon="mdiFilePdfBox"
				v-on="privacyPolicy ? { click: downloadPolicy } : {}"
			>
				<VListItemTitle class="text-body-1 mb-2">
					{{ t("pages.administration.school.index.schoolPolicy.fileName") }}
				</VListItemTitle>
				<VListItemSubtitle class="text-body-2">
					{{
						privacyPolicy
							? t("pages.administration.school.index.schoolPolicy.uploadedOn", {
									date: formatDate(privacyPolicy.publishedAt),
								})
							: t("pages.administration.school.index.schoolPolicy.notUploadedYet")
					}}
				</VListItemSubtitle>
				<template #append>
					<VListItemAction
						v-if="hasSchoolEditPermission"
						data-testid="edit-button"
						@click.stop="isSchoolPolicyFormDialogOpen = true"
					>
						<VBtn
							:icon="mdiTrayArrowUp"
							variant="text"
							:aria-label="t('pages.administration.school.index.schoolPolicy.edit')"
						/>
					</VListItemAction>
					<VListItemAction
						v-if="privacyPolicy"
						data-testid="delete-button"
						@click.stop="isDeletePolicyDialogOpen = true"
					>
						<VBtn
							:icon="mdiTrashCanOutline"
							variant="text"
							:aria-label="t('pages.administration.school.index.schoolPolicy.delete.title')"
						/>
					</VListItemAction>
				</template>
			</VListItem>
			<school-policy-form-dialog
				v-if="hasSchoolEditPermission"
				:is-open="isSchoolPolicyFormDialogOpen"
				data-testid="form-dialog"
				@close="closeDialog"
			/>
			<SvsDialog
				v-model="isDeletePolicyDialogOpen"
				data-testid="delete-dialog"
				:confirm-btn-lang-key="'common.actions.delete'"
				:title="t('pages.administration.school.index.schoolPolicy.delete.title')"
				@confirm="deleteFile"
			>
				<template #content>
					<InfoAlert>
						{{ t("pages.administration.school.index.schoolPolicy.delete.text") }}
					</InfoAlert>
				</template>
			</SvsDialog>
		</template>
	</div>
</template>

<script setup lang="ts">
import SchoolPolicyFormDialog from "./SchoolPolicyFormDialog.vue";
import { formatDateForAlerts } from "@/plugins/datetime";
import { Permission } from "@/serverApi/v3";
import { ConsentVersion } from "@/store/types/consent-version";
import { downloadFile } from "@/utils/fileHelper";
import { injectStrict, PRIVACY_POLICY_MODULE_KEY, SCHOOLS_MODULE_KEY } from "@/utils/inject";
import { notifySuccess, useAppStore } from "@data-app";
import { mdiFilePdfBox, mdiTrashCanOutline, mdiTrayArrowUp } from "@icons/material";
import { ErrorAlert, InfoAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { computed, ComputedRef, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const privacyPolicyModule = injectStrict(PRIVACY_POLICY_MODULE_KEY);
const schoolsModule = injectStrict(SCHOOLS_MODULE_KEY);
const isSchoolPolicyFormDialogOpen = ref(false);
const isDeletePolicyDialogOpen = ref(false);

const school = computed(() => schoolsModule.getSchool);
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

const deleteFile = async () => {
	await privacyPolicyModule.deletePrivacyPolicy();

	notifySuccess(t("pages.administration.school.index.schoolPolicy.delete.success"));
};

const closeDialog = () => {
	isSchoolPolicyFormDialogOpen.value = false;
};
</script>
