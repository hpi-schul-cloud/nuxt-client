<template>
	<ErrorAlert v-if="status === 'error'" data-testid="error-alert" class="mb-6">
		{{ t("pages.administration.school.index.termsOfUse.error") }}
	</ErrorAlert>
	<template v-else>
		<VProgressLinear v-if="status === 'pending'" indeterminate class="mb-6" data-testid="progress-bar" />
		<VListItem
			v-else
			lines="two"
			class="mb-6"
			data-testid="terms-item"
			:prepend-icon="mdiFilePdfBox"
			v-on="termsOfUse ? { click: downloadTerms } : {}"
		>
			<VListItemTitle class="text-body-1 mb-2">
				{{ t("pages.administration.school.index.termsOfUse.fileName") }}
			</VListItemTitle>
			<VListItemSubtitle class="text-body-2">
				{{
					termsOfUse
						? t("pages.administration.school.index.termsOfUse.uploadedOn", {
								date: formatDate(termsOfUse.publishedAt),
							})
						: t("pages.administration.school.index.termsOfUse.notUploadedYet")
				}}
			</VListItemSubtitle>
			<template #append>
				<VListItemAction
					v-if="hasSchoolEditPermission"
					data-testid="edit-button"
					@click.stop="isSchoolTermsFormDialogOpen = true"
				>
					<VBtn
						:icon="mdiTrayArrowUp"
						variant="text"
						:aria-label="t('pages.administration.school.index.termsOfUse.edit')"
					/>
				</VListItemAction>
				<VListItemAction v-if="termsOfUse" data-testid="delete-button" @click.stop="isDeleteTermsDialogOpen = true">
					<VBtn
						:icon="mdiTrashCanOutline"
						variant="text"
						:aria-label="t('pages.administration.school.index.termsOfUse.delete.title')"
					/>
				</VListItemAction>
			</template>
		</VListItem>
		<SchoolTermsFormDialog
			v-if="hasSchoolEditPermission"
			:is-open="isSchoolTermsFormDialogOpen"
			data-testid="form-dialog"
			@confirm="onCreate"
			@close="closeDialog"
		/>
		<SvsDialog
			v-model="isDeleteTermsDialogOpen"
			data-testid="delete-dialog"
			:confirm-btn-lang-key="'common.actions.delete'"
			:title="t('pages.administration.school.index.termsOfUse.delete.title')"
			@confirm="deleteFile"
		>
			<template #content>
				<InfoAlert>
					{{ t("pages.administration.school.index.termsOfUse.delete.text") }}
				</InfoAlert>
			</template>
		</SvsDialog>
	</template>
</template>

<script setup lang="ts">
import SchoolTermsFormDialog from "./SchoolTermsFormDialog.vue";
import { formatDateForAlerts } from "@/plugins/datetime";
import { Permission } from "@/serverApi/v3";
import { School } from "@/store/types/schools";
import { downloadFile } from "@/utils/fileHelper";
import { injectStrict, SCHOOLS_MODULE_KEY, TERMS_OF_USE_MODULE_KEY } from "@/utils/inject";
import { notifySuccess, useAppStore } from "@data-app";
import { ConsentVersion, CreateConsentVersionPayload } from "@data-school";
import { mdiFilePdfBox, mdiTrashCanOutline, mdiTrayArrowUp } from "@icons/material";
import { ErrorAlert, InfoAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { computed, ComputedRef, Ref, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const termsOfUseModule = injectStrict(TERMS_OF_USE_MODULE_KEY);
const schoolsModule = injectStrict(SCHOOLS_MODULE_KEY);
const isSchoolTermsFormDialogOpen: Ref<boolean> = ref(false);
const isDeleteTermsDialogOpen: Ref<boolean> = ref(false);

const school: ComputedRef<School> = computed(() => schoolsModule.getSchool);
watch(
	school,
	async (newValue) => {
		await termsOfUseModule.fetchTermsOfUse(newValue.id);
	},
	{ immediate: true }
);

const hasSchoolEditPermission = useAppStore().hasPermission(Permission.SchoolEdit);

const termsOfUse: ComputedRef<ConsentVersion | null> = computed(() => termsOfUseModule.getTermsOfUse);
const status: ComputedRef<string> = computed(() => termsOfUseModule.getStatus);

const formatDate = (dateTime: string) => formatDateForAlerts(dateTime, true);

const downloadTerms = () => {
	if (termsOfUse.value) {
		downloadFile(termsOfUse.value.consentData.data, t("pages.administration.school.index.termsOfUse.fileName"));
	}
};

const deleteFile = async () => {
	await termsOfUseModule.deleteTermsOfUse();
	notifySuccess(t("pages.administration.school.index.termsOfUse.delete.success"));
};

const closeDialog = () => {
	isSchoolTermsFormDialogOpen.value = false;
};

const onCreate = async (newConsentVersion: CreateConsentVersionPayload) => {
	await termsOfUseModule.createTermsOfUse(newConsentVersion);
};
</script>
