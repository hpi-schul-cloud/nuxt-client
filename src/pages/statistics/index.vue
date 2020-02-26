<template>
	<div>
		<h1 class="h1">Statistiken</h1>
		<tabs>
			<single-tab name="Meine Schule" :selected="true">
				<BaseGrid :column-width="columnWidth">
					<insights-card title="Kurse" :data="{ current: 22, last: 11 }" />
					<insights-card
						title="Schüler:Innen"
						:data="{ current: 33, last: 11 }"
					/>
					<insights-card title="Lehrkräfte" :data="{ current: 44, last: 11 }" />
					<insights-card title="Themen" :data="{ current: 44, last: 11 }" />
					<insights-card title="Aufgaben" :data="{ current: 44, last: 11 }" />
					<insights-card title="Teams" :data="{ current: 44, last: 11 }" />
				</BaseGrid>
			</single-tab>
			<single-tab name="Global">
				<BaseGrid :column-width="columnWidth">
					<insights-card title="Nutzer:Innen" :data="{ current: globalCount.users }" />
					<insights-card title="Kurse" :data="{ current: globalCount.courses }" />
					<insights-card title="Schüler:Innen" :data="{ current: globalCount.students }" />
					<insights-card title="Lehrkräfte" :data="{ current: globalCount.teachers }" />
					<insights-card title="Themen" :data="{ current: globalCount.lessons }" />
					<insights-card title="Aufgaben" :data="{ current: globalCount.homework }" />
					<insights-card title="Teams" :data="{ current: globalCount.teams }" />
				</BaseGrid>
			</single-tab>
			<single-tab name="Meine Nutzung"
				>Hier sind dann meine k-p-i-s zu finden
			</single-tab>
		</tabs>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import InsightsCard from "@components/molecules/InsightsCard";
import Tabs from "@components/organisms/Tabs/Tabs";
import SingleTab from "@components/atoms/Tab";

// import InsightsCharts from "~/components/molecules/InsightsCharts";

export default {
	components: {
		InsightsCard,
		Tabs,
		SingleTab,
		// InsightsCharts,
	},
	async asyncData({ store }) {
		return Promise.all([store.dispatch("statistics/getGlobalStats")]);
	},
	computed: {
		...mapGetters("statistics", {
			globalCount: "globalCount",
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
</style>
