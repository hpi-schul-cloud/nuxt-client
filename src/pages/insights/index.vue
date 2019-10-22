<template>
	<div>
		<div class="card-grid-container mb--lg mt--xl">
			<insights-card title="MONTHLY ACTIVE USERS" :data="monthlyUsers" />
			<insights-card title="WEEKLY ACTIVE USERS" :data="weeklyUsers" />
			<insights-card title="DAU OVER MAU" :data="dau" />
		</div>
		<insights-charts :data="{activityByRole, weeklyActivity, weeklyActiveUsers, uniquePageCount, avgPageLoaded, avgInteractTime}"/>
	</div>
</template>


<script>
import { mapGetters } from "vuex";
import InsightsCard from "@components/molecules/InsightsCard";
import InsightsCharts from "~/components/molecules/InsightsCharts";


export default {
	components: {
		InsightsCard,
		InsightsCharts,
	},
	computed: {
		...mapGetters("insights", {
			monthlyUsers: 'monthlyUsers',
			weeklyUsers: 'weeklyUsers',
			dau: 'dau',
			activityByRole: 'activityByRole',
			weeklyActivity: 'weeklyActivity',
			weeklyActiveUsers: 'weeklyActiveUsers',
			uniquePageCount: 'uniquePageCount',
			avgPageLoaded: 'avgPageLoaded',
			avgInteractTime: 'avgInteractTime',
		})
	},
	async asyncData({ store }) {
		return Promise.all([store.dispatch('insights/getMonthlyUsers'),
		store.dispatch('insights/getWeeklyUsers'),
		store.dispatch('insights/getDau'),
		store.dispatch('insights/getActivityByRole'),
		store.dispatch('insights/getWeeklyActivity'),
		store.dispatch('insights/getWeeklyActiveUsers'),
		store.dispatch('insights/getUniquePageCount'),
		store.dispatch('insights/getAvgPageLoaded'),
		store.dispatch('insights/getAvgInteractTime')]);
	},
}
</script>

<style lang="scss" scoped>
	.card-grid-container {
		display: flex;
		align-items: center;
		justify-content: space-evenly;
	}
</style>
