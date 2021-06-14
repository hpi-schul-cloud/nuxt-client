<template>
	<v-dialog v-model="isOpen" max-width="600">
		<v-card ripple="false">
			<v-card-title>
				<h2 class="text-h4">Datenschutzerklärung hinzufügen</h2>
			</v-card-title>
			<v-divider></v-divider>
			<v-card-text class="pa-6">
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
							<h2 class="text-h6">Wichtig:</h2>
							<p>Wenn eine neue Datenschutzerklärung hochgeladen wird, wird sie allen Nutzer:innen aus dieser Schule zur Zustimmung gegeben.</p>
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

export default {
	mixins: [validationMixin],
	validations: {
		description: { required },
	},
	data() {
		return {
			isOpen: false,
			title: "Datenschutzerklärung der Schule",
			description: "",
			file: null,
		};
	},
	computed: {
		...mapState("auth", { school: "school" }),
		...mapState("schools", { requestSuccessful: "requestSuccessful" }),
		descriptionErrors() {
			const errors = [];
			if (!this.$v.description.$dirty) return errors;
			!this.$v.url.required && errors.push("Url is required");

			return errors;
		},
	},
	methods: {
		...mapActions("schools", ["update"]),
		submit() {
			this.$v.$touch();
			console.log("hi")

			/* if (!this.$v.$invalid) {
				const { rssFeeds } = this.school;
				const newRssFeed = { url: this.url, description: this.description };
				const updatedRssFeedList = [...rssFeeds, newRssFeed];

				this.update({
					id: this.school.id,
					rssFeeds: updatedRssFeedList,
				}).then(() => {
					if (this.requestSuccessful) {
						this.$v.$reset();
						this.isOpen = false;
					} else {
						// TODO - show error InfoMessage
					}
				});
			} */
		},
		cancel() {
			this.$v.$reset();
			this.isOpen = false;
		},
	},
};
</script>

<style scoped>
h2 {
	width: 100%;
	margin-top: var(--space-sm);
}

form {
	width: 60%;
}
</style>
