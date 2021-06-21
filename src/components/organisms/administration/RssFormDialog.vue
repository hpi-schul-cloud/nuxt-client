<template>
	<v-dialog
		v-model="isOpen"
		max-width="480"
		@click:outside="$emit('dialog-closed')"
	>
		<v-card ripple="false">
			<v-card-title>
				<h2 class="text-h4">RSS-Feed hinzufügen</h2>
			</v-card-title>
			<v-divider></v-divider>
			<v-card-text class="pa-6 d-flex justify-center">
				<v-form>
					<v-row>
						<v-col>
							<v-text-field
								v-model="url"
								label="URL des RSS-Feeds"
								dense
								required
								:error-messages="urlErrors"
								@input="$v.url.$touch"
								@blur="$v.url.$touch"
							></v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<v-text-field
								v-model="description"
								label="Kurzbeschreibung (optional)"
								dense
							></v-text-field>
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
import { required, url } from "vuelidate/lib/validators";

export default {
	mixins: [validationMixin],
	validations: {
		url: { required, url },
	},
	props: {
		isOpen: {
			type: Boolean,
			required: true,
		},
	},
	data() {
		return {
			url: "",
			description: "",
		};
	},
	computed: {
		...mapState("auth", { school: "school" }),
		...mapState("schools", { requestSuccessful: "requestSuccessful" }),
		urlErrors() {
			const errors = [];
			if (!this.$v.url.$dirty) return errors;
			!this.$v.url.required && errors.push("Url is required");
			!this.$v.url.url && errors.push("Must be valid url");
			return errors;
		},
	},
	methods: {
		...mapActions("schools", ["update"]),
		submit() {
			this.$v.$touch();

			if (!this.$v.$invalid) {
				const { rssFeeds } = this.school;
				const newRssFeed = { url: this.url, description: this.description };
				const updatedRssFeedList = rssFeeds ? [...rssFeeds, newRssFeed] : [newRssFeed];

				this.update({
					id: this.school.id,
					rssFeeds: updatedRssFeedList,
				}).then(() => {
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
			this.$emit("dialog-closed");
		},
		clear() {
			this.$v.$reset();
			this.url = "";
			this.description = "";
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
