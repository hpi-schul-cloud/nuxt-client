<template>
	<v-dialog
		v-model="isOpen"
		max-width="550"
		@click:outside="$emit('dialog-closed')"
	>
		<v-card ripple="false">
			<v-card-title>
				<h2 class="text-h4">Datenschutzerklärung hinzufügen</h2>
			</v-card-title>
			<v-divider></v-divider>
			<v-card-text class="py-10 d-flex justify-center">
				<v-form>
					<v-row>
						<v-col>
							<v-text-field
								v-model="title"
								label="Titel"
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
								label="Beschreibung"
								dense
								required
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
								label="Datei hochladen (nur PDF, max. 4MB)"
								dense
								prepend-icon=""
								accept=".pdf"
							></v-file-input>
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<v-sheet class="px-4 py-1" color="orange lighten-4" rounded>
								<h2 class="text-h6">Wichtig:</h2>
								<p>
									Wenn eine neue Datenschutzerklärung hochgeladen wird, wird sie
									allen Nutzer:innen aus dieser Schule zur Zustimmung gegeben.
								</p>
							</v-sheet>
						</v-col>
					</v-row>
				</v-form>
			</v-card-text>
			<v-card-actions class="pb-3">
				<v-spacer></v-spacer>
				<v-btn depressed outlined @click="cancel">Abbrechen</v-btn>
				<v-btn color="primary" depressed @click="submit">Hinzufügen</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { currentDate } from "@plugins/datetime";
import { toBase64 } from "@utils/fileHelper.ts";

export default {
	mixins: [validationMixin],
	validations: {
		description: { required },
	},
	props: {
		isOpen: {
			type: Boolean,
			required: true,
		},
	},
	data() {
		return {
			title: "Datenschutzerklärung der Schule",
			description: "",
			file: null,
		};
	},
	computed: {
		...mapState("auth", { school: "school" }),
		...mapState("consent-versions", { requestSuccessful: "requestSuccessful" }),
		descriptionErrors() {
			const errors = [];
			if (!this.$v.description.$dirty) return errors;
			!this.$v.description.required && errors.push("Description is required");

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

				this.addConsentVersion(newConsentVersion).then(() => {
					if (this.requestSuccessful) {
						this.$v.$reset();
						this.$emit("dialog-closed");
					} else {
						// TODO - show error InfoMessage
					}
				});
			}
		},
		cancel() {
			this.clear();
			this.$emit("dialog-closed"); // can this be named the same for all dialogs?
		},
		clear() {
			this.$v.$reset();
			this.description = "";
			this.file = null;
		},
	},
};
</script>

<style scoped>
h2 {
	margin-top: var(--space-sm);
}

form {
	width: 80%;
}
</style>
