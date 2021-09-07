<template>
	<default-wireframe
		:headline="$t('pages.administration.school.index.title')"
		:breadcrumbs="breadcrumbs"
		:full-width="false"
	>
		<v-alert v-if="schoolError" light prominent text type="error">
			{{ $t("pages.administration.school.index.error") }}
		</v-alert>
		<img
			v-if="schoolError"
			role="presentation"
			alt=""
			src="@assets/img/pc_repair.png"
		/>
		<div v-if="!schoolError">
			<v-alert light prominent text type="info">
				{{ $t("pages.administration.school.index.beta.info") }}
				<a href="/help/contact">{{
					$t("pages.administration.school.index.beta.feedback")
				}}</a
				><br />
				<a href="/administration/school/">{{
					$t("pages.administration.school.index.beta.back")
				}}</a>
			</v-alert>
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
		</div>
	</default-wireframe>
</template>

<script>
import EnvConfigModule from "@store/env-config";
import { mapGetters } from "vuex";
import DefaultWireframe from "@components/molecules/DefaultWireframe.vue";
import GeneralSettings from "@components/organisms/administration/GeneralSettings";
import SchoolPolicies from "@components/organisms/administration/SchoolPolicies";
import AuthSystems from "@components/organisms/administration/AuthSystems";

export default {
	components: {
		GeneralSettings,
		SchoolPolicies,
		AuthSystems,
		DefaultWireframe,
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
			schoolError: "getError",
		}),
		schoolPolicyEnabled: () => EnvConfigModule.getSchoolPolicyEnabled,
		currentSchoolYear() {
			return `${this.$t("common.words.schoolYear")} ${this.currentYear.name}`;
		},
	},
	watch: {
		schoolError: (error) => {
			console.error("school could not be loaded", error);
		},
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
