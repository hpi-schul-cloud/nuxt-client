<template>
	<v-dialog v-model="isOpen" max-width="600">
		<v-card ripple="false">
			<v-card-title>
				<h2 class="text-h4">RSS-Feed hinzufügen</h2>
			</v-card-title>
			<v-divider></v-divider>
			<v-card-text class="pa-6">
				<v-form>
					<v-row>
						<v-col>
							<v-text-field
								v-model="url"
								label="URL des RSS-Feeds"
								dense
								required
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
				<v-btn depressed outlined @click="isOpen = false">Abbrechen</v-btn>
				<v-btn color="primary" depressed @click="addRssFeed">Hinzufügen</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
	components: {},
	data() {
		return {
			isOpen: false,
			url: "",
			description: "",
		};
	},
	computed: {
		...mapState("auth", { school: "school" }),
		...mapState("schools", { requestSuccessful: "requestSuccessful" }),
	},
	methods: {
		...mapActions("schools", ["update"]),
		addRssFeed() {
			const { rssFeeds } = this.school;
			const newRssFeed = { url: this.url, description: this.description };
			console.log(rssFeeds, newRssFeed);
			const updatedRssFeedList = [...rssFeeds, newRssFeed];

			this.update({
				id: this.school.id,
				rssFeeds: updatedRssFeedList,
			}).then(() => {
				if (this.requestSuccessful) this.isOpen = false;
			});
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
