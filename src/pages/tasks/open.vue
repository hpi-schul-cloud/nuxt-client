<template>
	<v-container class="v-container">
		<h1 v-if="loading">
			<v-skeleton-loader :type="'text'" :max-width="'30%'" />
		</h1>
		<template v-else>
			<h1 v-if="isListFilled" class="h4">
				{{ $t("pages.homeworks.title") }}
			</h1>
		</template>
		<homeworks-list
			:homeworks="openHomeworks"
			:title="$t('pages.homeworks.subtitleOpen')"
		/>
		<homeworks-list
			:homeworks="overDueHomeworks"
			:title="$t('pages.homeworks.subtitleOverDue')"
		/>
		<v-custom-empty-state
			v-if="isListEmpty"
			:image="image"
			:title="$t('pages.homeworks.emptyState.title')"
			:subtitle="$t('pages.homeworks.emptyState.subtitle')"
			class="mt-16"
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
	layout: "defaultVuetify",
	data() {
		return {
			image: tasksEmptyState,
		};
	},
	computed: {
		...mapGetters("homeworks", {
			homeworks: "getList",
			loading: "getLoading",
			isListEmpty: "isListEmpty",
			isListFilled: "isListFilled",
			openHomeworks: "getOpenHomeworks",
			overDueHomeworks: "getOverDueHomeworks",
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
