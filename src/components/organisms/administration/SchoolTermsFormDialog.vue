<template>
	<v-custom-dialog
		:is-open="isOpen"
		:size="425"
		@dialog-canceled="cancel"
		has-buttons
		confirm-btn-title-key="pages.administration.school.index.termsOfUse.replace"
		:confirm-btn-icon="mdiFileReplaceOutline"
		:confirm-btn-disabled="!isValid"
		@dialog-confirmed="submit"
	>
		<template #title>
			<h4 class="text-h4 mt-0">
				{{ t("common.words.termsOfUse") }}
			</h4>
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
					class="input-file mb-2"
					data-testid="input-file"
					:multiple="false"
					density="compact"
					accept="application/pdf"
					truncate-length="30"
					:label="
						t('pages.administration.school.index.termsOfUse.labels.uploadFile')
					"
					:hint="
						t('pages.administration.school.index.termsOfUse.hints.uploadFile')
					"
					:persistent-hint="true"
					:rules="[rules.required, rules.mustBePdf, rules.maxSize(4194304)]"
					@blur="onBlur"
					@update:modelValue="onFileChange"
				>
					<template v-slot:append-inner>
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
	NOTIFIER_MODULE_KEY,
	SCHOOLS_MODULE_KEY,
	TERMS_OF_USE_MODULE_KEY,
} from "@/utils/inject";
import { School } from "@/store/types/schools";
import { currentDate } from "@/plugins/datetime";
import { toBase64 } from "@/utils/fileHelper";
import { CreateConsentVersionPayload } from "@/store/types/consent-version";
import { useI18n } from "vue-i18n";
import { mdiAlert, mdiFileReplaceOutline } from "@icons/material";

export default defineComponent({
	name: "SchoolTermsFormDialog",
	components: {
		vCustomDialog,
	},
	emits: ["close"],
	props: {
		isOpen: {
			type: Boolean,
			required: true,
		},
	},
	setup(props, { emit }) {
		const { t } = useI18n();
		const termsOfUseModule = injectStrict(TERMS_OF_USE_MODULE_KEY);
		const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
		const schoolsModule = injectStrict(SCHOOLS_MODULE_KEY);

		const termsForm: Ref<File[]> = ref([]);
		const isFormValid: Ref<boolean> = ref(false);
		const isFormTouched: Ref<boolean> = ref(false);
		const files: Ref<File[]> = ref([]);

		const school: ComputedRef<School> = computed(() => schoolsModule.getSchool);

		const validationRules = {
			required: (value: File[]) =>
				!(value.length === 0) || t("common.validation.required"),
			mustBePdf: (value: File[]) =>
				!(value.length === 0) ||
				value[0].type === "application/pdf" ||
				t("pages.administration.school.index.termsOfUse.validation.notPdf"),
			maxSize: (bytes: number) => (value: File[]) =>
				!(value.length === 0) ||
				value[0].size <= bytes ||
				t("pages.administration.school.index.termsOfUse.validation.fileTooBig"),
		};

		const onBlur = () => {
			isFormTouched.value = true;
		};

		const onFileChange = (_files: File[] | File) => {
			if (Array.isArray(_files)) {
				files.value = _files;
			} else {
				files.value = [_files];
			}
		};

		const resetForm = () => {
			termsForm.value = [];
			isFormValid.value = false;
			isFormTouched.value = false;
		};

		const cancel = () => {
			resetForm();
			emit("close");
		};

		const submit = async () => {
			if (isFormValid.value) {
				const newConsentVersion: CreateConsentVersionPayload = {
					schoolId: school.value.id,
					title: t("pages.administration.school.index.termsOfUse.fileName"),
					consentText: "",
					consentTypes: ["termsOfUse"],
					publishedAt: currentDate().toString(),
					consentData: (await toBase64(files.value[0])) as string,
				};

				emit("close");
				await termsOfUseModule.createTermsOfUse(newConsentVersion);

				notifierModule.show({
					text: t("pages.administration.school.index.termsOfUse.success"),
					status: "success",
					timeout: 5000,
				});

				resetForm();
			}
		};

		return {
			t,
			rules: validationRules,
			cancel,
			submit,
			onBlur,
			onFileChange,
			isValid: isFormValid,
			isTouched: isFormTouched,
			termsForm,
			school,
			mdiAlert,
			mdiFileReplaceOutline,
		};
	},
});
</script>

<style lang="scss" scoped>
.alert-text {
	color: rgba(var(--v-theme-on-background)) !important;
	line-height: var(--line-height-lg) !important;
}

.button-left {
	width: 25%;
	text-align: left;
}

.button-right {
	display: inline-block;
	width: 75%;
	text-align: right;
}

.button-section {
	margin-bottom: calc(var(--space-base-vuetify) * 2);
}

.button-section > button {
	margin-left: calc(var(--space-base-vuetify) * 2);
}
</style>
