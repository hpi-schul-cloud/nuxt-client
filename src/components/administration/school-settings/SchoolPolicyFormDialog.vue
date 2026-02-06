<template>
	<SvsDialog
		:model-value="isOpen"
		:title="t('common.words.privacyPolicy')"
		:confirm-btn-lang-key="'pages.administration.school.index.schoolPolicy.replace'"
		:confirm-btn-disabled="!isValid"
		@cancel="onCancel"
		@confirm="onSubmit"
	>
		<template #content>
			<v-form ref="policyForm" v-model="isValid">
				<WarningAlert class="mb-5">
					{{ t("pages.administration.school.index.schoolPolicy.longText.willReplaceAndSendConsent") }}
				</WarningAlert>
				<VFileInput
					ref="input-file"
					v-model="file"
					class="input-file mb-2 truncate-file-input"
					data-testid="input-file"
					accept="application/pdf"
					:label="t('pages.administration.school.index.schoolPolicy.labels.uploadFile')"
					:hint="t('pages.administration.school.index.schoolPolicy.hints.uploadFile')"
					:persistent-hint="true"
					:rules="[rules.required, rules.mustBePdf, rules.maxSize]"
				/>
			</v-form>
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import { currentDate } from "@/plugins/datetime";
import { CreateConsentVersionPayload } from "@/store/types/consent-version";
import { School } from "@/store/types/schools";
import { toBase64 } from "@/utils/fileHelper";
import { injectStrict, SCHOOLS_MODULE_KEY } from "@/utils/inject";
import { WarningAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { computed, ComputedRef, Ref, ref } from "vue";
import { useI18n } from "vue-i18n";

type Props = {
	isOpen: boolean;
};
defineProps<Props>();
const emit = defineEmits<{
	(e: "close"): void;
	(e: "confirm", newConsentVersion: CreateConsentVersionPayload): void;
}>();

const { t } = useI18n();

const schoolsModule = injectStrict(SCHOOLS_MODULE_KEY);
const policyForm: Ref<File[]> = ref([]);
const isValid: Ref<boolean> = ref(false);
const file: Ref<File | null> = ref(null);
const school: ComputedRef<School> = computed(() => schoolsModule.getSchool);

const maxFileUploadSizeInKb = 4194304;
const rules = {
	required: (value: File | null) => !!value || t("common.validation.required"),
	mustBePdf: (value: File | null) =>
		value?.type === "application/pdf" || t("pages.administration.school.index.schoolPolicy.validation.notPdf"),
	maxSize: (value: File | null) =>
		(!!value && value.size <= maxFileUploadSizeInKb) ||
		t("pages.administration.school.index.schoolPolicy.validation.fileTooBig"),
};

const resetForm = () => {
	policyForm.value = [];
	isValid.value = false;
	file.value = null;
};

const onCancel = () => {
	resetForm();
	emit("close");
};

const onSubmit = async () => {
	if (isValid.value && file.value) {
		const newConsentVersion: CreateConsentVersionPayload = {
			schoolId: school.value.id,
			title: t("pages.administration.school.index.schoolPolicy.fileName"),
			consentText: "",
			consentTypes: ["privacy"],
			publishedAt: currentDate().toString(),
			consentData: (await toBase64(file.value)) as string,
		};

		emit("close");
		emit("confirm", newConsentVersion);

		resetForm();
	}
};
</script>

<style lang="scss" scoped>
:deep(.truncate-file-input .v-field__input) {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	display: block;
	max-width: 100%;
}
</style>
