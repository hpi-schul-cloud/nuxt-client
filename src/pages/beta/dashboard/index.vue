<template>
	<v-container>
		<h1 class="h4">{{ $t("pages.dashboard.title") }}</h1>
		<h2 class="h5">Subheader</h2>
		<homeworks-list />
	</v-container>
</template>

<script>
import HomeworksList from "@components/templates/HomeworksList";

export default {
	components: { HomeworksList },
	layout: "defaultVuetify",
	created() {
		this.find();
	},
	methods: {
		find() {
			this.$store.dispatch("homeworks/find", {
				query: {
					$sort: {
						dueDate: -1,
					},
				},
			});
		},
	},
	head() {
		return {
			title: this.$t("pages.homeworks.title"),
		};
	},
};
</script>
