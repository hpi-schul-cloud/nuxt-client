<template>
	<v-dialog
		v-model="isOpen"
		max-width="550"
		@click:outside="$emit('dialog-closed', false)"
	>
		<v-card :ripple="true">
			<v-card-title>
				<h2 class="text-h4">
					{{
						$t(
							"pages.administration.school.index.schoolPolicies.addPrivacyPolicy"
						)
					}}
				</h2>
			</v-card-title>
			<v-divider></v-divider>
			<v-card-text class="py-10 d-flex justify-center">
				<v-form>
					<v-row>
						<v-col>
							<v-text-field
								v-model="title"
								:label="$t('common.labels.title')"
								dense
								disabled
							></v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<v-textarea
								v-model="description"
								name="input-7-1"
								:label="$t('common.labels.description')"
								dense
								required
								counter="1000"
								:error-messages="descriptionErrors"
								@input="$v.description.$touch"
								@blur="$v.description.$touch"
							></v-textarea>
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<v-file-input
								v-model="file"
								:label="
									$t(
										'pages.administration.school.index.schoolPolicies.uploadPDF'
									)
								"
								dense
								prepend-icon=""
								accept=".pdf"
							></v-file-input>
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<v-sheet class="px-4 py-1" color="blue lighten-4" rounded>
								<h2 class="text-h6">
									{{
										$t(
											"pages.administration.school.index.schoolPolicies.important"
										)
									}}
								</h2>
								<p>
									{{
										$t(
											"pages.administration.school.index.schoolPolicies.longText.whenANewPrivacyPolicyUpdated"
										)
									}}
								</p>
							</v-sheet>
						</v-col>
					</v-row>
				</v-form>
			</v-card-text>
			<v-card-actions class="pb-3">
				<v-spacer></v-spacer>
				<v-btn depressed outlined @click="cancel">{{
					$t("common.actions.cancel")
				}}</v-btn>
				<v-btn color="primary" depressed @click="submit">{{
					$t("common.actions.add")
				}}</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import { currentDate } from "@plugins/datetime";
import { toBase64 } from "@utils/fileHelper.ts";

export default {
	mixins: [validationMixin],
	validations: {
		description: { required, maxLength: maxLength(1000) },
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
	data() {
		return {
			title: this.$t(
				"pages.administration.school.index.schoolPolicies.privacyPolicyTitle"
			),
			description: "",
			file: null,
		};
	},
	computed: {
		...mapGetters("schools", { school: "getSchool" }),
		descriptionErrors() {
			const errors = [];
			if (!this.$v.description.$dirty) return errors;
			!this.$v.description.required &&
				errors.push(this.$t("common.validation.required"));
			!this.$v.description.maxLength &&
				errors.push(this.$t("common.validation.tooLong"));

			return errors;
		},
	},
	methods: {
		currentDate,
		toBase64,
		...mapActions("consent-versions", ["addConsentVersion"]),
		async submit() {
			this.$v.$touch();

			if (!this.$v.$invalid) {
				const newConsentVersion = {
					schoolId: this.school.id,
					title: this.title,
					consentText: this.description,
					consentTypes: ["privacy"],
					publishedAt: currentDate(),
				};

				if (this.file) {
					newConsentVersion.consentData = await toBase64(this.file);
				}

				this.addConsentVersion(newConsentVersion);
				this.$v.$reset();
				this.$emit("dialog-closed", false);
				// TODO - show error InfoMessage
			}
		},
		cancel() {
			this.clear();
			this.$emit("dialog-closed", false);
		},
		clear() {
			this.$v.$reset();
			this.description = "";
			this.file = null;
		},
	},
};
</script>

<style lang="scss" scoped>
h2 {
	margin-top: var(--space-sm);
}

form {
	width: 80%;
}
</style>
