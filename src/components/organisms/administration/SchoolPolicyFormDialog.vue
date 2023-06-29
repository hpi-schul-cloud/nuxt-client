<template>
	<v-custom-dialog :is-open="isOpen" :size="450" @dialog-closed="cancel">
		<h4 class="text-h4 mt-0" slot="title">
			{{ $t("common.words.privacyPolicy") }}
		</h4>
		<template slot="content">
			<v-form>
				<v-alert light text type="info" class="mb-10">
					<div class="replace-alert-text">
						{{
							$t(
								"pages.administration.school.index.schoolPolicy.longText.willReplaceAndSendConsent"
							)
						}}
					</div>
				</v-alert>
				<v-file-input
					class="input-file mb-2"
					v-model="file"
					dense
					accept="application/pdf"
					truncate-length="60"
					:label="
						$t(
							'pages.administration.school.index.schoolPolicy.labels.uploadFile'
						)
					"
					:hint="
						$t(
							'pages.administration.school.index.schoolPolicy.hints.uploadFile'
						)
					"
					:persistent-hint="true"
					:error-messages="fileErrors"
					@change="$v.file.$touch"
				>
					<template v-slot:append>
						<v-icon v-if="$v.$error" color="var(--v-error-base)">
							{{ mdiAlert }}
						</v-icon>
					</template>
				</v-file-input>
				<v-card-actions>
					<v-spacer></v-spacer>
					<div class="button-section button-right">
						<v-btn class="dialog-closed" depressed text @click="cancel">
							{{ $t("pages.administration.school.index.schoolPolicy.cancel") }}
						</v-btn>
						<v-btn
							class="icon-button dialog-confirmed px-6"
							color="primary"
							depressed
							:disabled="!file || $v.$error"
							@click.prevent="submit"
						>
							<v-icon dense class="mr-1">{{ mdiFileReplaceOutline }}</v-icon>
							{{ $t("pages.administration.school.index.schoolPolicy.replace") }}
						</v-btn>
					</div>
				</v-card-actions>
			</v-form>
		</template>
	</v-custom-dialog>
</template>

<script>
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { schoolsModule, notifierModule, privacyPolicyModule } from "@/store";
import { required } from "vuelidate/lib/validators";
import { maxSize, mustBePdf } from "@/utils/fileUploadValidators";
import { currentDate } from "@/plugins/datetime";
import { toBase64 } from "@/utils/fileHelper.ts";
import { mdiAlert, mdiFileReplaceOutline } from "@mdi/js";

export default {
	components: {
		vCustomDialog,
	},
	model: {
		prop: "isOpen",
		event: "dialog-closed",
	},
	props: {
		isOpen: {
			type: Boolean,
			required: true,
		},
	},
	validations: {
		file: { required, mustBePdf, maxSize: maxSize(4194304) },
	},
	data() {
		return {
			file: null,
			mdiAlert,
			mdiFileReplaceOutline,
		};
	},
	computed: {
		school: () => schoolsModule.getSchool,
		fileErrors() {
			const errors = [];
			if (!this.$v.file.$dirty) return errors;
			!this.$v.file.required &&
				errors.push(this.$t("common.validation.required"));
			!this.$v.file.mustBePdf &&
				errors.push(
					this.$t(
						"pages.administration.school.index.schoolPolicy.validation.notPdf"
					)
				);
			!this.$v.file.maxSize &&
				errors.push(
					this.$t(
						"pages.administration.school.index.schoolPolicy.validation.fileTooBig"
					)
				);

			return errors;
		},
	},
	methods: {
		currentDate,
		toBase64,
		resetForm() {
			this.$v.$reset();
			this.file = null;
		},
		cancel() {
			this.resetForm();
			this.$emit("dialog-closed", false);
		},
		async submit() {
			this.$v.$touch();

			if (!this.$v.$error) {
				const newConsentVersion = {
					schoolId: this.school.id,
					title: this.$tc(
						"pages.administration.school.index.schoolPolicy.fileName"
					),
					consentText: "",
					consentTypes: ["privacy"],
					publishedAt: currentDate(),
					consentData: await toBase64(this.file),
				};

				this.$emit("dialog-closed", false);
				await privacyPolicyModule.createPrivacyPolicy(newConsentVersion);

				notifierModule.show({
					text: this.$tc(
						"pages.administration.school.index.schoolPolicy.success"
					),
					status: "success",
					timeout: 10000,
				});

				this.resetForm();
			}
		},
	},
};
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
