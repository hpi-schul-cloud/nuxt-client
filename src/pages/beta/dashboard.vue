<template>
	<v-container class="v-container">
		<h1 v-if="homeworks.length > 0" class="h4">{{ $t("pages.homeworks.title") }}</h1>
		<homeworks-list v-if="homeworks.length > 0" :homeworks="homeworks"/>
		<v-custom-empty-state 
			v-else 
			:image="image"
			:title="$t('pages.homeworks.emptyState.title')" 
			:subtitle="$t('pages.homeworks.emptyState.subtitle')" 
		/>
	</v-container>
</template>

<script>
import HomeworksList from "@components/organisms/HomeworksList";
import vCustomEmptyState from "@components/molecules/vCustomEmptyState";
import tasksEmptyState from "@assets/img/empty-state/Task_Empty_State.svg";
import { mapGetters } from "vuex";

export default {
	components: { HomeworksList, vCustomEmptyState },
	data() {
		return {
			image: tasksEmptyState
		}
	},
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
	}
};
</script>

<style lang="scss" scoped>
@import "@variables";

.v-container {
	max-width: var(--size-content-width-max);
}
</style>
