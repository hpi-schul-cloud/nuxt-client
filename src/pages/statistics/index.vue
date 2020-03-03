<template>
	<div>
		<h1 class="h1">{{ $t("pages.statistics.title") }}</h1>
		<tabs>
			<single-tab
				:name="$t('pages.statistics.tab.global')"
				permission="VIEW_GLOBAL_STATS"
			>
				<BaseGrid>
					<insights-card
						:title="$t('pages.statistics.card.users')"
						:data="{ current: globalCount.users }"
					/>
					<insights-card
						:title="$t('pages.statistics.card.courses')"
						:data="{ current: globalCount.courses }"
					/>
					<insights-card
						:title="$t('pages.statistics.card.students')"
						:data="{ current: globalCount.students }"
					/>
					<insights-card
						:title="$t('pages.statistics.card.teachers')"
						:data="{ current: globalCount.teachers }"
					/>
					<insights-card
						:title="$t('pages.statistics.card.lessons')"
						:data="{ current: globalCount.lessons }"
					/>
					<insights-card
						:title="$t('pages.statistics.card.homework')"
						:data="{ current: globalCount.homework }"
					/>
					<insights-card
						:title="$t('pages.statistics.card.teams')"
						:data="{ current: globalCount.teams }"
					/>
				</BaseGrid>
			</single-tab>
			<single-tab
				:name="$t('pages.statistics.tab.data')"
				permission="VIEW_GLOBAL_STATS"
			>
				<BaseGrid column-width="20rem">
					<v-chart :options="chartOptionsForFileSizes" :autoresize="true" />
					<v-chart :options="chartOptionsForFileTypes" :autoresize="true" />
				</BaseGrid>
			</single-tab>
			<single-tab
				:name="$t('pages.statistics.tab.mySchool')"
				:selected="true"
				permission="VIEW_MYSCHOOL_STATS"
			>
				<BaseGrid>
					<insights-card
						:title="$t('pages.statistics.card.users')"
						:data="{ current: schoolCount.users }"
					/>
					<insights-card
						:title="$t('pages.statistics.card.courses')"
						:data="{ current: schoolCount.courses }"
					/>
					<insights-card
						:title="$t('pages.statistics.card.students')"
						:data="{ current: schoolCount.students }"
					/>
					<insights-card
						:title="$t('pages.statistics.card.teachers')"
						:data="{ current: schoolCount.teachers }"
					/>
					<insights-card
						:title="$t('pages.statistics.card.homework')"
						:data="{ current: schoolCount.homework }"
					/>
					<insights-card
						:title="$t('pages.statistics.card.teams')"
						:data="{ current: schoolCount.teams }"
					/>
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
		chartOptionsForFileSizes() {
			const options = {
				title: {
					text: "File-Sizes",
				},
				xAxis: {
					type: "category",
				},
				yAxis: {
					type: "value",
				},
				series: [
					{
						data: this.globalCount.files_sizes,
						type: "bar",
					},
				],
			};
			return options;
		},
		chartOptionsForFileTypes() {
			const options = {
				title: {
					text: "File-Types",
				},
				xAxis: {
					type: "category",
				},
				yAxis: {
					type: "value",
				},
				series: [
					{
						data: this.globalCount.files_types,
						type: "bar",
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
