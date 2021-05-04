<template>
	<v-container fluid>
		<h1 class="text-h2">{{ $t("pages.dashboard.title") }}</h1>
		<p>Lorem Ipsum, normaler Text.</p>
		<homeworks-list />
	</v-container>
</template>

<script>
import HomeworksList from "@components/templates/HomeworksList";

export default {
	components: { HomeworksList },
	layout: "defaultVuetify",

	head() {
		return {
			title: this.$t("pages.homeworks.title"),
		};
	},
};
</script>
