<template>
	<div>
		<ErrorAlert
			v-if="status === 'error'"
			class="mb-6"
			data-testid="error-alert"
			:text="t('pages.administration.school.index.termsOfUse.error')"
		/>
		<template v-else>
			<v-progress-linear v-if="status === 'pending'" indeterminate class="mb-6" data-testid="progress-bar" />
			<v-list-item
				v-else
				lines="two"
				class="mb-6"
				data-testid="terms-item"
				:class="{ 'item-no-action': !termsOfUse }"
				:ripple="termsOfUse !== null"
				@click="downloadTerms"
			>
				<template #prepend>
					<v-icon :icon="mdiFilePdfBox" />
				</template>
				<v-list-item-title class="text-body-1 mb-2">
					{{ t("pages.administration.school.index.termsOfUse.fileName") }}
				</v-list-item-title>
				<v-list-item-subtitle class="text-body-2">
					<template v-if="termsOfUse">
						{{
							t("pages.administration.school.index.termsOfUse.uploadedOn", {
								date: formatDate(termsOfUse.publishedAt),
							})
						}}
					</template>
					<template v-else>
						{{ t("pages.administration.school.index.termsOfUse.notUploadedYet") }}
					</template>
				</v-list-item-subtitle>
				<template #append>
					<v-list-item-action
						v-if="hasSchoolEditPermission"
						data-testid="edit-button"
						@click.stop="isSchoolTermsFormDialogOpen = true"
					>
						<v-btn
							:icon="mdiTrayArrowUp"
							variant="text"
							:aria-label="t('pages.administration.school.index.termsOfUse.edit')"
						/>
					</v-list-item-action>
					<v-list-item-action v-if="termsOfUse" data-testid="delete-button" @click.stop="onDelete">
						<v-btn
							:icon="mdiTrashCanOutline"
							variant="text"
							:aria-label="t('pages.administration.school.index.termsOfUse.delete.title')"
						/>
					</v-list-item-action>
				</template>
			</v-list-item>
			<school-terms-form-dialog
				v-if="hasSchoolEditPermission"
				:is-open="isSchoolTermsFormDialogOpen"
				data-testid="form-dialog"
				@close="closeDialog"
			/>
			<ConfirmationDialog>
				<InfoAlert>
					{{ t("pages.administration.school.index.termsOfUse.delete.text") }}
				</InfoAlert>
			</ConfirmationDialog>
		</template>
	</div>
</template>

<script setup lang="ts">
import SchoolTermsFormDialog from "./SchoolTermsFormDialog.vue";
import { formatDateForAlerts } from "@/plugins/datetime";
import { Permission } from "@/serverApi/v3";
import { ConsentVersion } from "@/store/types/consent-version";
import { School } from "@/store/types/schools";
import { downloadFile } from "@/utils/fileHelper";
import { injectStrict, SCHOOLS_MODULE_KEY, TERMS_OF_USE_MODULE_KEY } from "@/utils/inject";
import { notifySuccess, useAppStore } from "@data-app";
import { mdiFilePdfBox, mdiTrashCanOutline, mdiTrayArrowUp } from "@icons/material";
import { ErrorAlert, InfoAlert } from "@ui-alert";
import { ConfirmationDialog, useConfirmationDialog } from "@ui-confirmation-dialog";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const termsOfUseModule = injectStrict(TERMS_OF_USE_MODULE_KEY);
const schoolsModule = injectStrict(SCHOOLS_MODULE_KEY);
const isSchoolTermsFormDialogOpen = ref(false);

const school = computed<School>(() => schoolsModule.getSchool);
watch(
	school,
	async (newValue) => {
		await termsOfUseModule.fetchTermsOfUse(newValue.id);
	},
	{ immediate: true }
);

const hasSchoolEditPermission = useAppStore().hasPermission(Permission.SchoolEdit);

const termsOfUse = computed<ConsentVersion | null>(() => termsOfUseModule.getTermsOfUse);
const status = computed<string>(() => termsOfUseModule.getStatus);

const formatDate = (dateTime: string) => formatDateForAlerts(dateTime, true);

const downloadTerms = () => {
	if (termsOfUse.value) {
		downloadFile(termsOfUse.value.consentData.data, t("pages.administration.school.index.termsOfUse.fileName"));
	}
};

const { askConfirmation } = useConfirmationDialog();
const onDelete = async () => {
	const shouldDelete = await askConfirmation({
		message: t("pages.administration.school.index.termsOfUse.delete.title"),
		confirmActionLangKey: "common.actions.delete",
	});

	if (shouldDelete) {
		await deleteFile();
	}
};

const deleteFile = async () => {
	await termsOfUseModule.deleteTermsOfUse();
	notifySuccess(t("pages.administration.school.index.termsOfUse.delete.success"));
};

const closeDialog = () => {
	isSchoolTermsFormDialogOpen.value = false;
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
