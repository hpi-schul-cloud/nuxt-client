<template>
	<div class="chart-grid-container">
		<insights-card title="ACTIVITY BY ROLE">
			<template v-slot:content>
				<v-chart :options="activityByRoleChart" autoresize />
			</template>
			<template v-slot:footer> LAST 30 DAYS </template>
		</insights-card>
		<insights-card title="ACTIVITY">
			<template v-slot:content>
				<v-chart :options="weeklyActivityChart" autoresize />
			</template>
			<template v-slot:footer> LAST 30 DAYS </template>
		</insights-card>
		<insights-card title="ACTIVE USERS">
			<template v-slot:content>
				<div>
					<div class="content-subtitles">
						<p>STUDENTS</p>
						<p>TEACHERS</p>
					</div>
					<v-chart
						class="mt--sm chart-position"
						:options="weeklyActiveUsers"
						autoresize
					/>
				</div>
			</template>
			<template v-slot:footer> LAST 30 DAYS </template>
		</insights-card>
		<insights-card title="USER EXPLORATION METRIC">
			<template v-slot:content>
				<v-chart :options="uniquePageCount" autoresize />
			</template>
			<template v-slot:footer> LAST 10 DAYS </template>
		</insights-card>
		<insights-card title="AVG LOAD TIME">
			<template v-slot:content>
				<v-chart :options="avgPageLoaded" autoresize />
			</template>
		</insights-card>
		<insights-card title="AVG INTERACTION TIME">
			<template v-slot:content>
				<v-chart :options="avgInteractTime" autoresize />
			</template>
		</insights-card>
	</div>
</template>

<script>
import InsightsCard from "@components/molecules/InsightsCard";

import getActivityByRoleChart from "@utils/insights/activityByRoleChart";
import getweeklyActivityChart from "@utils/insights/weeklyActivityChart";
import getweeklyActiveUsersChart from "@utils/insights/weeklyActiveUsersChart";
import getUniquePageCountChart from "@utils/insights/uniquePageCountChart";
import getAvgPageLoadedChart from "@utils/insights/avgPageLoadedChart";
import getAvgInteractTime from "@utils/insights/avgInteractTime";

import ECharts from "vue-echarts";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";
import "echarts/lib/component/dataset";

export default {
	components: {
		"v-chart": ECharts,
		InsightsCard,
	},
	props: {
		data: {
			type: Object,
			required: true,
		},
	},
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
	computed: {
		activityByRoleChart() {
			const { activityByRole } = this.data;
			const activityByRoleData = [
				{ value: activityByRole.teachers, name: "Teachers" },
				{ value: activityByRole.students, name: "Students" },
			];

			return getActivityByRoleChart(activityByRoleData);
		},
		weeklyActivityChart() {
			const { weeklyActivity } = this.data;
			const weeklyActivityData = Object.values(weeklyActivity);

			return getweeklyActivityChart(weeklyActivityData);
		},
		weeklyActiveUsers() {
			const { weeklyActiveUsers } = this.data;
			const weeklyActiveUsersData = Object.values(weeklyActiveUsers).map(
				(user) => {
					return [
						{
							value: user.active,
							name: "Active",
						},
						{
							value: user.inactive,
							name: "Inactive",
						},
					];
				}
			);
			return getweeklyActiveUsersChart(weeklyActiveUsersData);
		},
		uniquePageCount() {
			const { uniquePageCount } = this.data;
			const dateLabels = Object.keys(uniquePageCount).map((date) =>
				date.slice(0, 5)
			);
			const studentsUniqueData = Object.values(uniquePageCount).map(
				(el) => el.student
			);
			const teachersUniqueData = Object.values(uniquePageCount).map(
				(el) => el.teacher
			);

			return getUniquePageCountChart(
				dateLabels,
				studentsUniqueData,
				teachersUniqueData
			);
		},
		avgPageLoaded() {
			const { avgPageLoaded } = this.data;
			const timeLabels = avgPageLoaded.map((el) => Object.keys(el)[0]);
			const values = avgPageLoaded.map((el) => Object.values(el)[0]);
			return getAvgPageLoadedChart(timeLabels, values);
		},
		avgInteractTime() {
			const { avgInteractTime } = this.data;
			const timeLabels = avgInteractTime.map((el) => Object.keys(el)[0]);
			const values = avgInteractTime.map((el) => Object.values(el)[0]);
			return getAvgInteractTime(timeLabels, values);
		},
	},
};
</script>

<style lang="scss" scoped>
.chart-grid-container {
	display: flex;
	flex-wrap: wrap;
}
.chart-card {
	width: 100%;
	height: 100%;
}
.echarts {
	width: 40rem;
	height: 20rem;
}
.content-subtitles {
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 100%;
	font-size: var(--text-xs);
	transform: translateY(40px);
}
</style>
