<template>
	<section>
		<h4 class="text-h4 mb-6">
			{{ t("common.words.termsOfUse") }}
		</h4>
		<v-alert
			v-if="status === 'error'"
			light
			prominent
			text
			type="error"
			class="mb-6"
			data-testid="error-alert"
		>
			{{ t("pages.administration.school.index.termsOfUse.error") }}
		</v-alert>
		<template v-else>
			<v-progress-linear
				v-if="status === 'pending'"
				indeterminate
				class="mb-6"
				data-testid="progress-bar"
			/>
			<v-list-item v-else two-line dense class="mb-6" data-testid="terms-item">
				<v-list-item-icon>
					<v-icon>{{ "$file_pdf_outline" }}</v-icon>
				</v-list-item-icon>
				<v-list-item-content>
					<v-list-item-title class="text-body-1 black--text mb-2">
						{{ t("pages.administration.school.index.termsOfUse.fileName") }}
					</v-list-item-title>
					<v-list-item-subtitle class="text-body-2">
						<template v-if="termsOfUse">
							{{
								t("pages.administration.school.index.termsOfUse.uploadedOn", {
									date: dayjs(termsOfUse.publishedAt).format(
										t("format.dateTime")
									),
								})
							}}
						</template>
						<template v-else>
							{{
								t("pages.administration.school.index.termsOfUse.notUploadedYet")
							}}
						</template>
					</v-list-item-subtitle>
				</v-list-item-content>
				<v-list-item-action
					v-if="hasSchoolEditPermission"
					class="edit-icon"
					data-testid="edit-button"
					@click="isSchoolTermsFormDialogOpen = true"
				>
					<v-btn
						icon
						:aria-label="t('pages.administration.school.index.termsOfUse.edit')"
					>
						<v-icon>
							{{ mdiPencilOutline }}
						</v-icon>
					</v-btn>
				</v-list-item-action>
				<v-list-item-action
					v-if="termsOfUse"
					class="download-icon"
					data-testid="download-button"
					@click="downloadFile"
				>
					<v-btn
						icon
						:aria-label="
							t('pages.administration.school.index.termsOfUse.download')
						"
					>
						<v-icon>
							{{ mdiTrayArrowDown }}
						</v-icon>
					</v-btn>
				</v-list-item-action>
			</v-list-item>
			<school-terms-form-dialog
				v-if="hasSchoolEditPermission"
				:is-open="isSchoolTermsFormDialogOpen"
				@close="closeDialog"
				data-testid="form-dialog"
			/>
		</template>
	</section>
</template>

<script lang="ts">
import SchoolTermsFormDialog from "@/components/organisms/administration/SchoolTermsFormDialog.vue";
import dayjs from "dayjs";
import { mdiPencilOutline, mdiTrayArrowDown } from "@mdi/js";
import { computed, ComputedRef, defineComponent, ref, Ref, watch } from "vue";
import { School } from "@/store/types/schools";
import { ConsentVersion } from "@/store/types/consent-version";
import { BusinessError } from "@/store/types/commons";
import { useI18n } from "@/composables/i18n.composable";
import {
	injectStrict,
	AUTH_MODULE_KEY,
	TERMS_OF_USE_MODULE_KEY,
	SCHOOLS_MODULE_KEY,
} from "@/utils/inject";

export default defineComponent({
	name: "SchoolTerms",
	components: {
		SchoolTermsFormDialog,
	},
	setup() {
		const { t } = useI18n();
		const authModule = injectStrict(AUTH_MODULE_KEY);
		const termsOfUseModule = injectStrict(TERMS_OF_USE_MODULE_KEY);
		const schoolsModule = injectStrict(SCHOOLS_MODULE_KEY);

		const isSchoolTermsFormDialogOpen: Ref<boolean> = ref(false);

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

		const downloadFile = () => {
			const link = document.createElement("a");
			link.href = termsOfUse.value?.consentData.data as string;
			link.download = t(
				"pages.administration.school.index.termsOfUse.fileName"
			);
			link.click();
		};

		const closeDialog = () => {
			isSchoolTermsFormDialogOpen.value = false;
		};

		return {
			t,
			isSchoolTermsFormDialogOpen,
			hasSchoolEditPermission,
			termsOfUse,
			status,
			error,
			mdiPencilOutline,
			mdiTrayArrowDown,
			downloadFile,
			dayjs,
			closeDialog,
		};
	},
});
</script>
