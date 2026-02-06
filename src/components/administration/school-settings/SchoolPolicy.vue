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
				@confirm="onConfirm"
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
import { CreateConsentVersionPayload } from "@/store/types/consent-version";
import { downloadFile } from "@/utils/fileHelper";
import { injectStrict, SCHOOLS_MODULE_KEY } from "@/utils/inject";
import { useAppStore } from "@data-app";
import { useSchoolPrivacyPolicy } from "@data-school";
import { mdiFilePdfBox, mdiTrashCanOutline, mdiTrayArrowUp } from "@icons/material";
import { ErrorAlert, InfoAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const schoolsModule = injectStrict(SCHOOLS_MODULE_KEY);
const isSchoolPolicyFormDialogOpen = ref(false);
const isDeletePolicyDialogOpen = ref(false);
const { status, fetchPrivacyPolicy, privacyPolicy, createPrivacyPolicy, deletePrivacyPolicy } =
	useSchoolPrivacyPolicy();

const school = computed(() => schoolsModule.getSchool);
watch(
	school,
	async (newValue) => {
		await fetchPrivacyPolicy(newValue.id);
	},
	{ immediate: true }
);

const hasSchoolEditPermission = useAppStore().hasPermission(Permission.SchoolEdit);

const formatDate = (dateTime: string) => formatDateForAlerts(dateTime, true);

const downloadPolicy = () => {
	if (privacyPolicy.value) {
		downloadFile(privacyPolicy.value.consentData.data, t("pages.administration.school.index.schoolPolicy.fileName"));
	}
};

const deleteFile = async () => {
	await deletePrivacyPolicy();
};

const closeDialog = () => {
	isSchoolPolicyFormDialogOpen.value = false;
};

const onConfirm = async (newConsentVersion: CreateConsentVersionPayload) => {
	await createPrivacyPolicy(newConsentVersion);
};
</script>
