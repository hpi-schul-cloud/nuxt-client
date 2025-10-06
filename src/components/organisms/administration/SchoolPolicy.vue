<template>
	<div>
		<v-alert
			v-if="status === 'error'"
			type="error"
			class="mb-6"
			data-testid="error-alert"
			:icon="mdiAlertCircle"
			:text="$t('pages.administration.school.index.schoolPolicy.error')"
		>
			<div class="alert-text">
				{{ $t("pages.administration.school.index.schoolPolicy.error") }}
			</div>
		</v-alert>
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
					<v-icon>$file_pdf_outline</v-icon>
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
					<v-list-item-action
						v-if="privacyPolicy"
						data-testid="delete-button"
						@click.stop="isDeletePolicyDialogOpen = true"
					>
						<v-btn
							:icon="mdiTrashCanOutline"
							variant="text"
							:aria-label="$t('pages.administration.school.index.schoolPolicy.delete.title')"
						/>
					</v-list-item-action>
				</template>
			</v-list-item>
			<school-policy-form-dialog
				v-if="hasSchoolEditPermission"
				:is-open="isSchoolPolicyFormDialogOpen"
				data-testid="form-dialog"
				@close="closeDialog"
			/>
			<v-custom-dialog
				v-model:is-open="isDeletePolicyDialogOpen"
				:size="430"
				has-buttons
				confirm-btn-title-key="common.actions.delete"
				:confirm-btn-icon="mdiTrashCanOutline"
				data-testid="delete-dialog"
				@dialog-confirmed="deleteFile"
			>
				<template #title>
					<h3 class="text-h2 mt-0">
						{{ $t("pages.administration.school.index.schoolPolicy.delete.title") }}
					</h3>
				</template>
				<template #content>
					<v-alert type="info" class="mb-0">
						<div class="alert-text">
							{{ $t("pages.administration.school.index.schoolPolicy.delete.text") }}
						</div>
					</v-alert>
				</template>
			</v-custom-dialog>
		</template>
	</div>
</template>

<script setup lang="ts">
import SchoolPolicyFormDialog from "@/components/organisms/administration/SchoolPolicyFormDialog.vue";
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { formatDateForAlerts } from "@/plugins/datetime";
import { Permission } from "@/serverApi/v3";
import { ConsentVersion } from "@/store/types/consent-version";
import { School } from "@/store/types/schools";
import { downloadFile } from "@/utils/fileHelper";
import { injectStrict, PRIVACY_POLICY_MODULE_KEY, SCHOOLS_MODULE_KEY } from "@/utils/inject";
import { notifySuccess, useAppStore } from "@data-app";
import { mdiAlertCircle, mdiTrashCanOutline, mdiTrayArrowUp } from "@icons/material";
import { computed, ComputedRef, Ref, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const privacyPolicyModule = injectStrict(PRIVACY_POLICY_MODULE_KEY);
const schoolsModule = injectStrict(SCHOOLS_MODULE_KEY);
const isSchoolPolicyFormDialogOpen: Ref<boolean> = ref(false);
const isDeletePolicyDialogOpen: Ref<boolean> = ref(false);

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

const deleteFile = async () => {
	await privacyPolicyModule.deletePrivacyPolicy();

	notifySuccess(t("pages.administration.school.index.schoolPolicy.delete.success"));
};

const closeDialog = () => {
	isSchoolPolicyFormDialogOpen.value = false;
};
</script>

<style lang="scss" scoped>
.alert-text {
	color: rgba(var(--v-theme-on-background)) !important;
	line-height: var(--line-height-lg) !important;
}

.item-no-action {
	&:hover {
		cursor: default;
	}
	&:before {
		background-color: unset;
	}
}
</style>
