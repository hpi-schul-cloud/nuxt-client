<template>
	<v-container class="v-container">
		<h1 v-if="homeworks.length > 0" class="h4">{{ $t("pages.homeworks.title") }}</h1>
		<homeworks-list v-if="homeworks.length > 0" :homeworks="homeworks"/>
		<tasks-empty-state 
			v-if="homeworks.length === 0" 
			:image="image"
			:title="$t('pages.homeworks.emptyState.title')" 
			:subtitle="$t('pages.homeworks.emptyState.subtitle')" 
		/>
	</v-container>
</template>

<script>
import HomeworksList from "@components/organisms/HomeworksList";
import TasksEmptyState from "@components/molecules/TasksEmptyState";
import { mapGetters } from "vuex";

export default {
	components: { HomeworksList, TasksEmptyState },
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
