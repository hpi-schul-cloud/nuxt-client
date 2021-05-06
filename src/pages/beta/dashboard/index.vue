<template>
	<v-container>
		<h1 class="h4">{{ $t("pages.homeworks.title") }}</h1>
		<homeworks-list />
	</v-container>
</template>

<script>
import HomeworksList from "@components/organisms/HomeworksList";

export default {
	components: { HomeworksList },
	layout: "defaultVuetify",
	created() {
		this.$store.dispatch("homeworks/find", {
			query: {
				$sort: {
					dueDate: -1,
				},
			},
		});
	},
	head() {
		return {
			title: this.$t("pages.homeworks.title"),
		};
	},
};
</script>
