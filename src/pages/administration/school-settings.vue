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
			class="school-error-image"
			role="presentation"
			alt=""
			src="@assets/img/pc_repair.png"
		/>
		<div v-if="!schoolError" class="no-school-error">
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
					<school-policies
						v-if="schoolPolicyEnabled && hasSchoolEditPermission"
					></school-policies>
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
import SchoolsModule from "@/store/schools";
import AuthModule from "@/store/auth";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
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
		systems() {
			return SchoolsModule.getSystems;
		},
		currentYear() {
			return SchoolsModule.getCurrentYear;
		},
		loading() {
			return SchoolsModule.getLoading;
		},
		school() {
			return SchoolsModule.getSchool;
		},
		schoolError() {
			return SchoolsModule.getError;
		},
		schoolPolicyEnabled: () => EnvConfigModule.getSchoolPolicyEnabled,
		currentSchoolYear() {
			return `${this.$t("common.words.schoolYear")} ${this.currentYear.name}`;
		},
		hasSchoolEditPermission: () => {
			return AuthModule.getUserPermissions.includes("school_edit");
		},
	},
	watch: {
		schoolError: (error) => {
			console.error("school could not be loaded", error);
		},
		school: {
			handler: function (newSchool, oldSchool) {
				// fetch school year and systems when the school is loaded
				// if the school object gets a new reference (e.g. after updating it) do not reload the year or systems
				if (
					!SchoolsModule.getFederalState ||
					!SchoolsModule.getFederalState._id ||
					!SchoolsModule.currentYear ||
					!SchoolsModule.currentYear._id ||
					!SchoolsModule.systems ||
					!SchoolsModule.systems.length ||
					(newSchool && newSchool.id && (!oldSchool || !oldSchool.id))
				) {
					SchoolsModule.fetchCurrentYear();
					SchoolsModule.fetchSystems();
					SchoolsModule.fetchFederalState();
				}
			},
			immediate: true,
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
