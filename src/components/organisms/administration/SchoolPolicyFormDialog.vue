<template>
	<v-custom-dialog
		:is-open="isOpen"
		:size="425"
		@dialog-canceled="cancel"
		has-buttons
		confirm-btn-title-key="pages.administration.school.index.schoolPolicy.replace"
		:confirm-btn-icon="mdiFileReplaceOutline"
		:confirm-btn-disabled="!isValid"
		@dialog-confirmed="submit"
	>
		<template #title>
			<h4 class="text-h4 mt-0">
				{{ t("common.words.privacyPolicy") }}
			</h4>
		</template>
		<template #content>
			<v-form ref="policyForm" v-model="isValid">
				<v-alert type="warning" class="mb-10" :icon="mdiAlert">
					<div class="alert-text">
						{{
							t(
								"pages.administration.school.index.schoolPolicy.longText.willReplaceAndSendConsent"
							)
						}}
					</div>
				</v-alert>
				<v-file-input
					v-model="file"
					ref="input-file"
					class="input-file mb-2"
					data-testid="input-file"
					density="compact"
					accept="application/pdf"
					truncate-length="30"
					:label="
						t(
							'pages.administration.school.index.schoolPolicy.labels.uploadFile'
						)
					"
					:hint="
						t('pages.administration.school.index.schoolPolicy.hints.uploadFile')
					"
					:persistent-hint="true"
					:rules="[rules.required, rules.mustBePdf, rules.maxSize]"
					@blur="onBlur"
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
import { currentDate } from "@/plugins/datetime";
import { CreateConsentVersionPayload } from "@/store/types/consent-version";
import { School } from "@/store/types/schools";
import { toBase64 } from "@/utils/fileHelper";
import {
	injectStrict,
	NOTIFIER_MODULE_KEY,
	PRIVACY_POLICY_MODULE_KEY,
	SCHOOLS_MODULE_KEY,
} from "@/utils/inject";
import { mdiAlert, mdiFileReplaceOutline } from "@icons/material";
import { computed, ComputedRef, defineComponent, ref, Ref } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
	name: "SchoolPolicyFormDialog",
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
		const privacyPolicyModule = injectStrict(PRIVACY_POLICY_MODULE_KEY);
		const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
		const schoolsModule = injectStrict(SCHOOLS_MODULE_KEY);

		const policyForm: Ref<File[]> = ref([]);
		const isValid: Ref<boolean> = ref(false);
		const isTouched: Ref<boolean> = ref(false);
		const file: Ref<File | null> = ref(null);

		const school: ComputedRef<School> = computed(() => schoolsModule.getSchool);

		const maxFileUploadSizeInKb = 4194304;
		const rules = {
			required: (value: File | null) =>
				!!value || t("common.validation.required"),
			mustBePdf: (value: File | null) =>
				value?.type === "application/pdf" ||
				t("pages.administration.school.index.schoolPolicy.validation.notPdf"),
			maxSize: (value: File | null) =>
				(!!value && value.size <= maxFileUploadSizeInKb) ||
				t(
					"pages.administration.school.index.schoolPolicy.validation.fileTooBig"
				),
		};

		const onBlur = () => {
			isTouched.value = true;
		};

		const resetForm = () => {
			policyForm.value = [];
			isValid.value = false;
			isTouched.value = false;
			file.value = null;
		};

		const cancel = () => {
			resetForm();
			emit("close");
		};

		const submit = async () => {
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
				await privacyPolicyModule.createPrivacyPolicy(newConsentVersion);

				notifierModule.show({
					text: t("pages.administration.school.index.schoolPolicy.success"),
					status: "success",
					timeout: 5000,
				});

				resetForm();
			}
		};

		return {
			t,
			rules,
			cancel,
			submit,
			onBlur,
			isValid,
			isTouched,
			policyForm,
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
