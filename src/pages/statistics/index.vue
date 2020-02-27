<template>
	<div>
		<h1 class="h1">Statistiken</h1>
		<tabs>
			<single-tab name="Global" permission="VIEW_GLOBAL_STATS">
				<BaseGrid>
					<insights-card
						title="Nutzer:Innen"
						:data="{ current: globalCount.users }"
					/>
					<insights-card
						title="Kurse"
						:data="{ current: globalCount.courses }"
					/>
					<insights-card
						title="Schüler:Innen"
						:data="{ current: globalCount.students }"
					/>
					<insights-card
						title="Lehrkräfte"
						:data="{ current: globalCount.teachers }"
					/>
					<insights-card
						title="Themen"
						:data="{ current: globalCount.lessons }"
					/>
					<insights-card
						title="Aufgaben"
						:data="{ current: globalCount.homework }"
					/>
					<insights-card title="Teams" :data="{ current: globalCount.teams }" />
				</BaseGrid>
			</single-tab>
			<single-tab name="Dateien" permission="VIEW_GLOBAL_STATS">
				TODO: DAteien nach Typ und Filesize (Global)
				//{"files/types":[{"_id":"image/png","total_files_per_type":4},{"_id":null,"total_files_per_type":1}],"homework":29,"teachers":2,"teams":2,"users":10,"comments":0,"files/sizes":[{"_id":{"min":null,"max":19188},"count":1},{"_id":{"min":19188,"max":728117},"count":1},{"_id":{"min":728117,"max":2252137},"count":1},{"_id":{"min":2252137,"max":2287260},"count":1},{"_id":{"min":2287260,"max":2287260},"count":1}],"classes":1,"schools":4,"files/directories":5,"submissions":26,"students":3,"lessons":10,"courses":6,"accounts":10}
			</single-tab>
			<single-tab
				name="Meine Schule"
				:selected="true"
				permission="VIEW_MYSCHOOL_STATS"
			>
				<BaseGrid>
					<insights-card
						title="Nutzer:Innen"
						:data="{ current: schoolCount.users }"
					/>
					<insights-card
						title="Kurse"
						:data="{ current: schoolCount.courses }"
					/>
					<insights-card
						title="Schüler:Innen"
						:data="{ current: schoolCount.students }"
					/>
					<insights-card
						title="Lehrkräfte"
						:data="{ current: schoolCount.teachers }"
					/>
					<insights-card
						title="Aufgaben"
						:data="{ current: schoolCount.homework }"
					/>
					<insights-card title="Teams" :data="{ current: schoolCount.teams }" />
				</BaseGrid>
			</single-tab>
		</tabs>
		<h2 class="h2">Entwicklung über die Zeit</h2>

		<tabs>
			<single-tab name="Nutzer:Innen (global)" permission="VIEW_GLOBAL_STATS">
				<v-chart :options="chartOptionsForAccounts" :autoresize="true" />
			</single-tab>
			<single-tab name="Kurse (global)" permission="VIEW_GLOBAL_STATS">
				<v-chart :options="chartOptionsForCourses" :autoresize="true" />
			</single-tab>
		</tabs>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import InsightsCard from "@components/molecules/InsightsCard";
import Tabs from "@components/organisms/Tabs/Tabs";
import SingleTab from "@components/atoms/Tab";
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
		InsightsCard,
		Tabs,
		SingleTab,
		"v-chart": ECharts,
	},

	async asyncData({ store }) {
		return Promise.all([
			store.dispatch("statistics/getAccountStats"),
			store.dispatch("statistics/getStudentsStats"),
			store.dispatch("statistics/getTeachersStats"),
			store.dispatch("statistics/getCoursesStats"),
			store.dispatch("statistics/getGlobalStats"),
			store.dispatch("statistics/getSchoolStats"),
		]);
	},
	computed: {
		chartOptionsForAccounts() {
			const options = {
				xAxis: {
					type: "time",
				},
				yAxis: {
					type: "value",
				},
				legend: {
					data: ["Lehrkräfte", "Schüler:Innen"],
				},
				toolbox: {
					feature: {
						saveAsImage: {},
					},
					show: true,
				},
				series: [
					{
						data: this.teachers,
						type: "line",
						areaStyle: {},
						stack: "accounts",
					},
					{
						data: this.students,
						type: "line",
						areaStyle: {},
						stack: "accounts",
					},
					,
					{
						data: this.accounts,
						type: "line",
					},
				],
			};
			return options;
		},
		chartOptionsForCourses() {
			const options = {
				xAxis: {
					type: "time",
				},
				yAxis: {
					type: "value",
				},
				toolbox: {
					feature: {
						saveAsImage: {},
					},
				},
				series: [
					{
						data: this.courses,
						type: "line",
						areaStyle: {},
					},
				],
			};
			return options;
		},
		...mapGetters("statistics", {
			globalCount: "globalCount",
			schoolCount: "schoolCount",
			accounts: "accounts",
			teachers: "teachers",
			students: "students",
			courses: "courses",
		}),
	},
};
</script>

<style lang="scss" scoped>
.card-grid-container {
	display: flex;
	align-items: center;
	justify-content: space-evenly;
}
.echarts {
	width: 100%;
}
</style>
