<template>
	<div>
		<h1 class="h1">Statistiken</h1>
		<tabs>
			<user-has-permission permission="VIEW_GLOBAL_STATS">
				<single-tab name="Global">
					<BaseGrid :column-width="columnWidth">
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
						<insights-card
							title="Teams"
							:data="{ current: globalCount.teams }"
						/>
					</BaseGrid>
				</single-tab>
			</user-has-permission>
			<user-has-permission permission="VIEW_MYSCHOOL_STATS">
				<single-tab name="Meine Schule" :selected="true">
					<BaseGrid :column-width="columnWidth">
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
						<insights-card
							title="Teams"
							:data="{ current: schoolCount.teams }"
						/>
					</BaseGrid>
				</single-tab>
			</user-has-permission>
		</tabs>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import InsightsCard from "@components/molecules/InsightsCard";
import Tabs from "@components/organisms/Tabs/Tabs";
import SingleTab from "@components/atoms/Tab";
import UserHasPermission from "@components/helpers/UserHasPermission";

// import InsightsCharts from "~/components/molecules/InsightsCharts";

export default {
	components: {
		InsightsCard,
		Tabs,
		SingleTab,
		UserHasPermission,
		// InsightsCharts,
	},
	async asyncData({ store }) {
		return Promise.all([
			store.dispatch("statistics/getGlobalStats"),
			store.dispatch("statistics/getSchoolStats"),
		]);
	},
	computed: {
		...mapGetters("statistics", {
			globalCount: "globalCount",
			schoolCount: "schoolCount",
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
