<template>
	<v-custom-dialog :is-open="isOpen" :size="450" @dialog-closed="cancel">
		<h4 class="text-h4 mt-0" slot="title">
			{{ t("common.words.termsOfUse") }}
		</h4>
		<template slot="content">
			<v-form ref="termsForm" v-model="isValid">
				<v-alert light text type="warning" class="mb-10" :icon="mdiAlert">
					<div class="replace-alert-text">
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
					v-model="file"
					dense
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
				>
					<template v-slot:append>
						<v-icon
							v-if="!isValid && isTouched"
							color="var(--v-error-base)"
							data-testid="warning-icon"
						>
							{{ mdiAlert }}
						</v-icon>
					</template>
				</v-file-input>
				<v-card-actions>
					<v-spacer></v-spacer>
					<div class="button-section button-right">
						<v-btn
							class="dialog-closed"
							depressed
							text
							@click="cancel"
							data-testid="cancel-button"
						>
							{{ t("pages.administration.school.index.termsOfUse.cancel") }}
						</v-btn>
						<v-btn
							class="icon-button dialog-confirmed px-6"
							type="submit"
							color="primary"
							depressed
							:disabled="!isValid"
							@click.prevent="submit"
							data-testid="submit-button"
						>
							<v-icon dense class="mr-1">{{ mdiFileReplaceOutline }}</v-icon>
							{{ t("pages.administration.school.index.termsOfUse.replace") }}
						</v-btn>
					</div>
				</v-card-actions>
			</v-form>
		</template>
	</v-custom-dialog>
</template>

<script lang="ts">
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { computed, ComputedRef, defineComponent, inject, ref, Ref } from "vue";
import SchoolsModule from "@/store/schools";
import TermsOfUseModule from "@/store/terms-of-use";
import { I18N_KEY, injectStrict, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import VueI18n from "vue-i18n";
import { mdiAlert, mdiFileReplaceOutline } from "@mdi/js";
import { School } from "@/store/types/schools";
import { currentDate } from "@/plugins/datetime";
import { toBase64 } from "@/utils/fileHelper";
import { CreateConsentVersionPayload } from "@/store/types/consent-version";

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
		const schoolsModule: SchoolsModule | undefined =
			inject<SchoolsModule>("schoolsModule");
		const termsOfUseModule: TermsOfUseModule | undefined =
			inject<TermsOfUseModule>("termsOfUseModule");
		const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
		const i18n = injectStrict(I18N_KEY);

		if (!notifierModule || !schoolsModule || !termsOfUseModule || !i18n) {
			throw new Error("Injection of dependencies failed");
		}

		const t = (key: string, values?: VueI18n.Values | undefined): string => {
			const translateResult = i18n.t(key, values);
			if (typeof translateResult === "string") {
				return translateResult;
			}
			return "unknown translation-key:" + key;
		};

		const termsForm: Ref = ref(null);
		const isFormValid: Ref<boolean> = ref(false);
		const isFormTouched: Ref<boolean> = ref(false);
		const termsFile: Ref<File | null> = ref(null);

		const school: ComputedRef<School> = computed(() => schoolsModule.getSchool);

		const validationRules = {
			required: (value: string) => !!value || t("common.validation.required"),
			mustBePdf: (value: File) =>
				!value ||
				value.type === "application/pdf" ||
				t("pages.administration.school.index.termsOfUse.validation.notPdf"),
			maxSize: (bytes: number) => (value: File) =>
				!value ||
				value.size <= bytes ||
				t("pages.administration.school.index.termsOfUse.validation.fileTooBig"),
		};

		const onBlur = () => {
			isFormTouched.value = true;
		};

		const resetForm = () => {
			termsForm.value.reset();
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
					consentData: (await toBase64(termsFile.value as File)) as string,
				};

				emit("close");
				await termsOfUseModule.createTermsOfUse(newConsentVersion);

				notifierModule.show({
					text: t("pages.administration.school.index.termsOfUse.success"),
					status: "success",
					timeout: 10000,
				});

				resetForm();
			}
		};

		return {
			t,
			file: termsFile,
			rules: validationRules,
			mdiFileReplaceOutline,
			mdiAlert,
			cancel,
			submit,
			onBlur,
			isValid: isFormValid,
			isTouched: isFormTouched,
			termsForm,
			school,
		};
	},
});
</script>

<style lang="scss" scoped>
.replace-alert-text {
	color: var(--v-black-base) !important;
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
