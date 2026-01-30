<template>
	<SvsDialog
		:model-value="isOpen"
		title="common.words.termsOfUse"
		confirm-btn-lang-key="pages.administration.school.index.termsOfUse.replace"
		:confirm-btn-disabled="!isFormValid"
		@cancel="onCancel"
		@confirm="onConfirm"
	>
		<template #content>
			<VForm ref="termsForm" v-model="isFormValid">
				<WarningAlert class="mb-10">
					{{ t("pages.administration.school.index.termsOfUse.longText.willReplaceAndSendConsent") }}
				</WarningAlert>
				<VFileInput
					v-model="file"
					class="input-file mb-2 truncate-file-input"
					data-testid="input-file"
					:multiple="false"
					density="compact"
					accept="application/pdf"
					:label="t('pages.administration.school.index.termsOfUse.labels.uploadFile')"
					:hint="t('pages.administration.school.index.termsOfUse.hints.uploadFile')"
					:persistent-hint="true"
					:rules="[rules.required, rules.mustBePdf, rules.maxSize]"
					@blur="onBlur"
				>
					<template #append-inner>
						<VIcon
							v-if="!isFormValid && isFormTouched"
							color="rgba(var(--v-theme-error))"
							data-testid="warning-icon"
							:icon="mdiAlert"
						/>
					</template>
				</VFileInput>
			</VForm>
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import { currentDate } from "@/plugins/datetime";
import { CreateConsentVersionPayload } from "@/store/types/consent-version";
import { toBase64 } from "@/utils/fileHelper";
import { injectStrict, SCHOOLS_MODULE_KEY, TERMS_OF_USE_MODULE_KEY } from "@/utils/inject";
import { notifySuccess } from "@data-app";
import { mdiAlert } from "@icons/material";
import { WarningAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

defineProps<{
	isOpen: boolean;
}>();

const emit = defineEmits<{
	(event: "close"): void;
}>();

const { t } = useI18n();
const termsOfUseModule = injectStrict(TERMS_OF_USE_MODULE_KEY);
const schoolsModule = injectStrict(SCHOOLS_MODULE_KEY);

const termsForm = ref<File[]>([]);
const isFormValid = ref(false);
const isFormTouched = ref(false);
const file = ref<File | null>(null);

const school = computed(() => schoolsModule.getSchool);

const maxFileUploadSizeInKb = 4194304;
const rules = {
	required: (value: File | null) => !!value || t("common.validation.required"),
	mustBePdf: (value: File | null) =>
		value?.type === "application/pdf" || t("pages.administration.school.index.termsOfUse.validation.notPdf"),
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

const onCancel = () => {
	resetForm();
	emit("close");
};

const onConfirm = async () => {
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

		notifySuccess("pages.administration.school.index.termsOfUse.success");
		resetForm();
	}
};
</script>

<style scoped>
:deep(.truncate-file-input .v-field__input) {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	display: block;
	max-width: 100%;
}
</style>
