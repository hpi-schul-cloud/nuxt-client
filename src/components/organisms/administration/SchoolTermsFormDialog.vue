<template>
	<v-custom-dialog
		:is-open="isOpen"
		:size="425"
		has-buttons
		confirm-btn-title-key="pages.administration.school.index.termsOfUse.replace"
		:confirm-btn-icon="mdiFileReplaceOutline"
		:confirm-btn-disabled="!isValid"
		@dialog-canceled="cancel"
		@dialog-confirmed="submit"
	>
		<template #title>
			<h3 class="text-h2 mt-0">
				{{ t("common.words.termsOfUse") }}
			</h3>
		</template>
		<template #content>
			<v-form ref="termsForm" v-model="isValid">
				<v-alert type="warning" class="mb-10" :icon="mdiAlert">
					<div class="alert-text">
						{{
							t(
								"pages.administration.school.index.termsOfUse.longText.willReplaceAndSendConsent"
							)
						}}
					</div>
				</v-alert>
				<v-file-input
					ref="input-file"
					v-model="file"
					class="input-file mb-2 truncate-file-input"
					data-testid="input-file"
					:multiple="false"
					density="compact"
					accept="application/pdf"
					:label="
						t('pages.administration.school.index.termsOfUse.labels.uploadFile')
					"
					:hint="
						t('pages.administration.school.index.termsOfUse.hints.uploadFile')
					"
					:persistent-hint="true"
					:rules="[rules.required, rules.mustBePdf, rules.maxSize]"
					@blur="onBlur"
				>
					<template #append-inner>
						<v-icon
							v-if="!isValid && isTouched"
							color="rgba(var(--v-theme-error))"
							data-testid="warning-icon"
							:icon="mdiAlert"
						/>
					</template>
				</v-file-input>
			</v-form>
		</template>
	</v-custom-dialog>
</template>

<script lang="ts">
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { computed, ComputedRef, defineComponent, ref, Ref } from "vue";
import {
	injectStrict,
	SCHOOLS_MODULE_KEY,
	TERMS_OF_USE_MODULE_KEY,
} from "@/utils/inject";
import { School } from "@/store/types/schools";
import { currentDate } from "@/plugins/datetime";
import { toBase64 } from "@/utils/fileHelper";
import { CreateConsentVersionPayload } from "@/store/types/consent-version";
import { useI18n } from "vue-i18n";
import { mdiAlert, mdiFileReplaceOutline } from "@icons/material";
import { notifySuccess } from "@data-app";

export default defineComponent({
	name: "SchoolTermsFormDialog",
	components: {
		vCustomDialog,
	},
	props: {
		isOpen: {
			type: Boolean,
			required: true,
		},
	},
	emits: ["close"],
	setup(props, { emit }) {
		const { t } = useI18n();
		const termsOfUseModule = injectStrict(TERMS_OF_USE_MODULE_KEY);
		const schoolsModule = injectStrict(SCHOOLS_MODULE_KEY);

		const termsForm: Ref<File[]> = ref([]);
		const isFormValid: Ref<boolean> = ref(false);
		const isFormTouched: Ref<boolean> = ref(false);
		const file: Ref<File | null> = ref(null);

		const school: ComputedRef<School> = computed(() => schoolsModule.getSchool);

		const maxFileUploadSizeInKb = 4194304;
		const validationRules = {
			required: (value: File | null) =>
				!!value || t("common.validation.required"),
			mustBePdf: (value: File | null) =>
				value?.type === "application/pdf" ||
				t("pages.administration.school.index.termsOfUse.validation.notPdf"),
			maxSize: (value: File | null) =>
				(!!value && value.size <= maxFileUploadSizeInKb) ||
				t("pages.administration.school.index.termsOfUse.validation.fileTooBig"),
		};

		const onBlur = () => {
			isFormTouched.value = true;
		};

		const resetForm = () => {
			termsForm.value = [];
			isFormValid.value = false;
			isFormTouched.value = false;
			file.value = null;
		};

		const cancel = () => {
			resetForm();
			emit("close");
		};

		const submit = async () => {
			if (isFormValid.value && file.value) {
				const newConsentVersion: CreateConsentVersionPayload = {
					schoolId: school.value.id,
					title: t("pages.administration.school.index.termsOfUse.fileName"),
					consentText: "",
					consentTypes: ["termsOfUse"],
					publishedAt: currentDate().toString(),
					consentData: (await toBase64(file.value)) as string,
				};

				emit("close");
				await termsOfUseModule.createTermsOfUse(newConsentVersion);

				notifySuccess(
					t("pages.administration.school.index.termsOfUse.success")
				);
				resetForm();
			}
		};

		return {
			t,
			rules: validationRules,
			cancel,
			submit,
			onBlur,
			isValid: isFormValid,
			isTouched: isFormTouched,
			termsForm,
			school,
			mdiAlert,
			mdiFileReplaceOutline,
			file,
		};
	},
});
</script>

<style lang="scss" scoped>
.alert-text {
	color: rgba(var(--v-theme-on-background)) !important;
	line-height: var(--line-height-lg) !important;
}

:deep(.truncate-file-input .v-field__input) {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	display: block;
	max-width: 100%;
}
</style>
