<template>
	<v-container class="v-container">
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
		this.$store.dispatch("homeworks/getHomeworksDashboard");
	},
	head() {
		return {
			title: this.$t("pages.homeworks.title"),
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";

.v-container {
	max-width: var(--size-content-width-max);
}
</style>
