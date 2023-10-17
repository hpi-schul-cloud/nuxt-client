<template>
	<default-wireframe
		:headline="$t('pages.administration.school.index.title')"
		:breadcrumbs="breadcrumbs"
		:full-width="false"
	>
		<v-alert v-if="schoolError" light prominent variant="text" type="error">
			{{ $t(schoolError.translationKey) }}
		</v-alert>
		<img
			v-if="schoolError"
			class="school-error-image"
			role="presentation"
			alt=""
			src="@/assets/img/pc_repair.png"
		/>
		<div v-if="!schoolError" class="no-school-error">
			<v-alert light prominent variant="text" type="info">
				{{ $t("pages.administration.school.index.info") }}
				<a href="/administration/school/">
					{{ $t("pages.administration.school.index.back") }}
				</a>
			</v-alert>
			<h2 class="text-h4">
				{{ currentSchoolYear }}
			</h2>
			<v-divider class="my-sm-6 my-md-3"></v-divider>
			<v-row>
				<v-col>
					<general-settings />
					<school-policy v-if="schoolPolicyEnabled" />
					<school-terms-of-use v-if="schoolTermsOfUseEnabled" />
					<admin-migration-section v-if="true" />
					<template v-if="loading">
						<v-skeleton-loader type="table-thead, table-row, table-row" />
					</template>
					<auth-systems v-else :systems="systems" />
					<external-tools-section />
				</v-col>
			</v-row>
		</div>
	</default-wireframe>
</template>

<script>
import { envConfigModule, schoolsModule } from "@/store";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import GeneralSettings from "@/components/organisms/administration/GeneralSettings";
import SchoolPolicy from "@/components/organisms/administration/SchoolPolicy.vue";
import AuthSystems from "@/components/organisms/administration/AuthSystems";
import AdminMigrationSection from "@/components/administration/AdminMigrationSection";
import ExternalToolsSection from "@/components/administration/ExternalToolSection";
import { buildPageTitle } from "@/utils/pageTitle";
import SchoolTermsOfUse from "@/components/organisms/administration/SchoolTerms.vue";

export default {
	components: {
		ExternalToolsSection,
		AdminMigrationSection,
		GeneralSettings,
		SchoolPolicy,
		SchoolTermsOfUse,
		AuthSystems,
		DefaultWireframe,
	},
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
			return schoolsModule.getSystems;
		},
		loading() {
			return schoolsModule.getLoading;
		},
		school() {
			return schoolsModule.getSchool;
		},
		schoolError() {
			return schoolsModule.getError;
		},
		schoolPolicyEnabled: () => envConfigModule.getSchoolPolicyEnabled,
		schoolTermsOfUseEnabled: () => envConfigModule.getSchoolTermsOfUseEnabled,
		isOauthMigrationEnabled: () =>
			envConfigModule.getFeatureSchoolSanisUserMigrationEnabled,
		currentSchoolYear() {
			return `${this.$t("common.words.schoolYear")} ${
				schoolsModule.getCurrentYear.name
			}`;
		},
	},
	watch: {
		school: {
			handler: function (newSchool, oldSchool) {
				// fetch school year and systems when the school is loaded
				// if the school object gets a new reference (e.g. after updating it) do not reload the year or systems
				if (
					!schoolsModule.getFederalState ||
					!schoolsModule.getFederalState._id ||
					!schoolsModule.systems ||
					!schoolsModule.systems.length ||
					(newSchool && newSchool.id && (!oldSchool || !oldSchool.id))
				) {
					schoolsModule.fetchSystems();
					schoolsModule.fetchFederalState();
				}
			},
			immediate: true,
		},
	},
	mounted() {
		document.title = buildPageTitle(
			this.$t("pages.administration.school.index.title")
		);
	},
};
</script>
