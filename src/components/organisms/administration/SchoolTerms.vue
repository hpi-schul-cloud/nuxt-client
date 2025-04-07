<template>
	<div>
		<v-alert
			v-if="status === 'error'"
			type="error"
			class="mb-6"
			data-testid="error-alert"
			:text="t('pages.administration.school.index.termsOfUse.error')"
			:icon="mdiAlertCircle"
		>
			<div class="alert-text">
				{{ t("pages.administration.school.index.termsOfUse.error") }}
			</div>
		</v-alert>
		<template v-else>
			<v-progress-linear
				v-if="status === 'pending'"
				indeterminate
				class="mb-6"
				data-testid="progress-bar"
			/>
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
					<v-icon>$file_pdf_outline</v-icon>
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
						{{
							t("pages.administration.school.index.termsOfUse.notUploadedYet")
						}}
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
							:aria-label="
								t('pages.administration.school.index.termsOfUse.edit')
							"
						/>
					</v-list-item-action>
					<v-list-item-action
						v-if="termsOfUse"
						data-testid="delete-button"
						@click.stop="isDeleteTermsDialogOpen = true"
					>
						<v-btn
							:icon="mdiTrashCanOutline"
							variant="text"
							:aria-label="
								t('pages.administration.school.index.termsOfUse.delete.title')
							"
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
			<v-custom-dialog
				v-model:is-open="isDeleteTermsDialogOpen"
				:size="430"
				has-buttons
				confirm-btn-title-key="common.actions.delete"
				:confirm-btn-icon="mdiTrashCanOutline"
				data-testid="delete-dialog"
				@dialog-confirmed="deleteFile"
			>
				<template #title>
					<h4 class="text-h4 mt-0">
						{{ t("pages.administration.school.index.termsOfUse.delete.title") }}
					</h4>
				</template>
				<template #content>
					<v-alert type="info" class="mb-0">
						<div class="alert-text">
							{{
								t("pages.administration.school.index.termsOfUse.delete.text")
							}}
						</div>
					</v-alert>
				</template>
			</v-custom-dialog>
		</template>
	</div>
</template>

<script lang="ts">
import SchoolTermsFormDialog from "@/components/organisms/administration/SchoolTermsFormDialog.vue";
import { computed, ComputedRef, defineComponent, ref, Ref, watch } from "vue";
import { School } from "@/store/types/schools";
import { ConsentVersion } from "@/store/types/consent-version";
import { BusinessError } from "@/store/types/commons";
import { useI18n } from "vue-i18n";
import {
	injectStrict,
	AUTH_MODULE_KEY,
	TERMS_OF_USE_MODULE_KEY,
	SCHOOLS_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
} from "@/utils/inject";
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { downloadFile } from "@/utils/fileHelper";
import { formatDateForAlerts } from "@/plugins/datetime";
import {
	mdiAlertCircle,
	mdiTrashCanOutline,
	mdiTrayArrowUp,
} from "@icons/material";

export default defineComponent({
	name: "SchoolTerms",
	components: {
		vCustomDialog,
		SchoolTermsFormDialog,
	},
	setup() {
		const { t } = useI18n();
		const authModule = injectStrict(AUTH_MODULE_KEY);
		const termsOfUseModule = injectStrict(TERMS_OF_USE_MODULE_KEY);
		const schoolsModule = injectStrict(SCHOOLS_MODULE_KEY);
		const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);

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

		const hasSchoolEditPermission: ComputedRef<boolean> = computed(() =>
			authModule.getUserPermissions.includes("school_edit")
		);
		const termsOfUse: ComputedRef<ConsentVersion | null> = computed(
			() => termsOfUseModule.getTermsOfUse
		);
		const status: ComputedRef<string> = computed(
			() => termsOfUseModule.getStatus
		);
		const error: ComputedRef<BusinessError> = computed(
			() => termsOfUseModule.getBusinessError
		);

		const formatDate = (dateTime: string) =>
			formatDateForAlerts(dateTime, true);

		const downloadTerms = () => {
			if (termsOfUse.value) {
				downloadFile(
					termsOfUse.value.consentData.data,
					t("pages.administration.school.index.termsOfUse.fileName")
				);
			}
		};

		const deleteFile = async () => {
			await termsOfUseModule.deleteTermsOfUse();

			notifierModule.show({
				text: t("pages.administration.school.index.termsOfUse.delete.success"),
				status: "success",
				timeout: 5000,
			});
		};

		const closeDialog = () => {
			isSchoolTermsFormDialogOpen.value = false;
		};

		return {
			t,
			isSchoolTermsFormDialogOpen,
			isDeleteTermsDialogOpen,
			hasSchoolEditPermission,
			termsOfUse,
			status,
			error,
			downloadTerms,
			deleteFile,
			formatDate,
			closeDialog,
			mdiAlertCircle,
			mdiTrashCanOutline,
			mdiTrayArrowUp,
		};
	},
});
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
