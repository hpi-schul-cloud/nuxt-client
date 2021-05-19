<template>
	<v-container class="v-container">
		<h1 class="h4">{{ $t("pages.homeworks.title") }}</h1>
		<homeworks-list :homeworks="homeworks" />
	</v-container>
</template>

<script>
import HomeworksList from "@components/organisms/HomeworksList";
import { mapGetters } from "vuex";

export default {
	components: { HomeworksList },
	layout: "defaultVuetify",
	computed: {
		...mapGetters("homeworks", {
			homeworks: "list",
		}),
	},
	mounted() {
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
