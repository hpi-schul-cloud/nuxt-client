<template>
	<v-container fluid>
		<v-custom-breadcrumbs :breadcrumbs="breadcrumbs"></v-custom-breadcrumbs>
		<v-container class="container-max-width">
			<h1 class="text-h3">
				{{ $t("pages.administration.school.index.title") }}
			</h1>
			<h2 class="text-h4">
				{{ currentSchoolYear }}
			</h2>
			<p>
				{{
					$t(
						"pages.administration.school.index.longText.provideStudentsAndTheirParents"
					)
				}}
			</p>
			<v-divider class="my-sm-6 my-md-8"></v-divider>
			<v-row>
				<v-col>
					<general-settings></general-settings>
					<school-policies v-if="schoolPolicyEnabled"></school-policies>
					<template v-if="loading">
						<v-skeleton-loader type="table-thead, table-row, table-row" />
					</template>
					<auth-systems v-else :systems="systems"></auth-systems>
				</v-col>
			</v-row>
		</v-container>
	</v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vCustomBreadcrumbs from "@components/molecules/vCustomBreadcrumbs";
import GeneralSettings from "@components/organisms/administration/GeneralSettings";
import SchoolPolicies from "@components/organisms/administration/SchoolPolicies";
import AuthSystems from "@components/organisms/administration/AuthSystems";

export default {
	components: {
		vCustomBreadcrumbs,
		GeneralSettings,
		SchoolPolicies,
		AuthSystems,
	},
	layout: "defaultVuetify",
	data() {
		return {
			breadcrumbs: [
				{
					text: this.$t("pages.administration.index.title"),
					href: "/administration/",
				},
				{
					text: this.$t("pages.administration.school.index.title"),
					disabled: true,
				},
			],
		};
	},
	computed: {
		...mapGetters("schools", {
			systems: "getSystems",
			currentYear: "getCurrentYear",
			loading: "getLoading",
		}),
		...mapGetters("env-config", {
			schoolPolicyEnabled: "getSchoolPolicyEnabled",
		}),
		currentSchoolYear() {
			return `${this.$t("common.words.schoolYear")} ${this.currentYear.name}`;
		},
	},
	methods: {
		...mapActions("schools", ["fetchFileStorageTotal"]),
	},
	head() {
		return {
			title: `${this.$t("pages.administration.school.index.title")} - ${
				this.$theme.short_name
			}`,
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.container-max-width {
	max-width: var(--size-content-width-max);
}
</style>
