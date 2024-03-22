<template>
	<default-wireframe
		:headline="headline"
		:breadcrumbs="breadcrumbs"
		:full-width="false"
	>
		<v-alert
			v-if="error"
			type="error"
			:icon="mdiAlertCircle"
			data-testid="error-alert"
		>
			<div class="alert-text">
				{{ $t(error.translationKey) }}
			</div>
		</v-alert>
		<div data-testid="no-error">
			<v-alert type="info" class="mb-4">
				<div class="alert-text">
					{{ $t("pages.administration.school.index.back") }}
					<a href="/administration/school/">
						{{ $t("pages.administration.school.index.backLink") }}</a
					>.
				</div>
			</v-alert>
			<v-alert type="info" class="mb-12">
				<div class="alert-text">
					{{ $t("pages.administration.school.index.info", { instituteTitle }) }}
				</div>
			</v-alert>

			<v-expansion-panels multiple class="mb-9" :model-value="openedPanels">
				<v-expansion-panel data-testid="general-settings-panel" value="general">
					<v-expansion-panel-title>
						<div class="text-h4">
							{{ $t("pages.administration.school.index.generalSettings") }}
						</div>
						<template v-slot:actions="{ expanded }">
							<div class="v-expansion-panel-header__icon">
								<v-icon :icon="expanded ? mdiMinus : mdiPlus" />
							</div>
						</template>
					</v-expansion-panel-title>
					<v-expansion-panel-text eager>
						<general-settings class="mt-9" />
					</v-expansion-panel-text>
				</v-expansion-panel>

				<v-expansion-panel
					v-if="isFeatureSchoolPolicyEnabled"
					data-testid="policy-panel"
					value="privacy"
				>
					<v-expansion-panel-title>
						<div class="text-h4">
							{{ $t("common.words.privacyPolicy") }}
						</div>
						<template v-slot:actions="{ expanded }">
							<div class="v-expansion-panel-header__icon">
								<v-icon :icon="expanded ? mdiMinus : mdiPlus" />
							</div>
						</template>
					</v-expansion-panel-title>
					<v-expansion-panel-text eager>
						<school-policy class="mt-9" />
					</v-expansion-panel-text>
				</v-expansion-panel>

				<v-expansion-panel
					v-if="isFeatureSchoolTermsOfUseEnabled"
					data-testid="terms-panel"
					value="terms"
				>
					<v-expansion-panel-title>
						<div class="text-h4">
							{{ $t("common.words.termsOfUse") }}
						</div>
						<template v-slot:actions="{ expanded }">
							<div class="v-expansion-panel-header__icon">
								<v-icon :icon="expanded ? mdiMinus : mdiPlus" />
							</div>
						</template>
					</v-expansion-panel-title>
					<v-expansion-panel-text eager>
						<school-terms-of-use class="mt-9" />
					</v-expansion-panel-text>
				</v-expansion-panel>

				<v-expansion-panel
					v-if="isFeatureOauthMigrationEnabled"
					data-testid="migration-panel"
					value="migration"
				>
					<v-expansion-panel-title>
						<div class="text-h4">
							{{
								$t("components.administration.adminMigrationSection.headers")
							}}
						</div>
						<template v-slot:actions="{ expanded }">
							<div class="v-expansion-panel-header__icon">
								<v-icon :icon="expanded ? mdiMinus : mdiPlus" />
							</div>
						</template>
					</v-expansion-panel-title>
					<v-expansion-panel-text eager>
						<admin-migration-section class="mt-9" />
					</v-expansion-panel-text>
				</v-expansion-panel>

				<v-expansion-panel data-testid="systems-panel" value="authentication">
					<v-expansion-panel-title>
						<div class="text-h4">
							{{ $t("pages.administration.school.index.authSystems.title") }}
						</div>
						<template v-slot:actions="{ expanded }">
							<div class="v-expansion-panel-header__icon">
								<v-icon :icon="expanded ? mdiMinus : mdiPlus" />
							</div>
						</template>
					</v-expansion-panel-title>
					<v-expansion-panel-text eager>
						<template v-if="isLoading">
							<v-skeleton-loader
								class="mt-9"
								type="table-thead, table-row, table-row"
								data-testid="systems-panel-skeleton"
							/>
						</template>
						<auth-systems class="mt-9" v-else :systems="systems" />
					</v-expansion-panel-text>
				</v-expansion-panel>

				<v-expansion-panel data-testid="tools-panel" value="tools">
					<v-expansion-panel-title>
						<div class="text-h4">
							{{ $t("components.administration.externalToolsSection.header") }}
						</div>
						<template v-slot:actions="{ expanded }">
							<div class="v-expansion-panel-header__icon">
								<v-icon :icon="expanded ? mdiMinus : mdiPlus" />
							</div>
						</template>
					</v-expansion-panel-title>
					<v-expansion-panel-text eager>
						<external-tools-section class="mt-9" />
					</v-expansion-panel-text>
				</v-expansion-panel>
			</v-expansion-panels>
		</div>
	</default-wireframe>
</template>

<script lang="ts">
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import GeneralSettings from "@/components/organisms/administration/GeneralSettings.vue";
import SchoolPolicy from "@/components/organisms/administration/SchoolPolicy.vue";
import AuthSystems from "@/components/organisms/administration/AuthSystems.vue";
import AdminMigrationSection from "@/components/administration/AdminMigrationSection.vue";
import ExternalToolsSection from "@/components/administration/ExternalToolSection.vue";
import SchoolTermsOfUse from "@/components/organisms/administration/SchoolTerms.vue";
import { useI18n } from "vue-i18n";
import { School } from "@/store/types/schools";
import { useTitle } from "@vueuse/core";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import { ApplicationError } from "@/store/types/application-error";
import { buildPageTitle } from "@/utils/pageTitle";
import {
	injectStrict,
	ENV_CONFIG_MODULE_KEY,
	SCHOOLS_MODULE_KEY,
} from "@/utils/inject";
import { computed, ComputedRef, defineComponent, ref, Ref, watch } from "vue";
import { useRoute } from "vue-router";
import { mdiAlertCircle, mdiPlus, mdiMinus } from "@/components/icons/material";

export default defineComponent({
	name: "SchoolSettings",
	components: {
		DefaultWireframe,
		ExternalToolsSection,
		AdminMigrationSection,
		GeneralSettings,
		SchoolPolicy,
		SchoolTermsOfUse,
		AuthSystems,
	},
	setup() {
		const { t } = useI18n();
		const schoolsModule = injectStrict(SCHOOLS_MODULE_KEY);
		const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
		const route = useRoute();

		const headline: Ref<string> = ref(
			t("pages.administration.school.index.title")
		);
		const pageTitle = buildPageTitle(headline.value);
		useTitle(pageTitle);

		const breadcrumbs: Ref<Breadcrumb[]> = ref([
			{
				title: t("pages.administration.index.title"),
				href: "/administration/",
			},
			{
				title: t("pages.administration.school.index.title"),
				disabled: true,
			},
		]);

		const school: ComputedRef<School> = computed(() => schoolsModule.getSchool);

		watch(
			school,
			(newSchool, oldSchool) => {
				// fetch systems when the school is loaded
				// if the school object gets a new reference (e.g. after updating it) do not reload the year or systems
				if (
					!schoolsModule.systems ||
					!schoolsModule.systems.length ||
					(newSchool && newSchool.id && (!oldSchool || !oldSchool.id))
				) {
					schoolsModule.fetchSystems();
				}
			},
			{ immediate: true }
		);

		const openedPanels: ComputedRef<string[]> = computed(() =>
			route.query.openPanels ? route.query.openPanels.toString().split(",") : []
		);
		const systems: ComputedRef<any[]> = computed(
			() => schoolsModule.getSystems
		);
		const isLoading: ComputedRef<boolean> = computed(
			() => schoolsModule.getLoading
		);
		const error: ComputedRef<ApplicationError | null> = computed(
			() => schoolsModule.getError
		);
		const isFeatureOauthMigrationEnabled: ComputedRef<boolean | undefined> =
			computed(() => envConfigModule.getFeatureSchoolSanisUserMigrationEnabled);
		const isFeatureSchoolPolicyEnabled: ComputedRef<boolean | undefined> =
			computed(() => envConfigModule.getSchoolPolicyEnabled);
		const isFeatureSchoolTermsOfUseEnabled: ComputedRef<boolean | undefined> =
			computed(() => envConfigModule.getSchoolTermsOfUseEnabled);
		const instituteTitle: ComputedRef<string> = computed(() => {
			switch (envConfigModule.getTheme) {
				case "n21":
					return "Landesinitiative n-21: Schulen in Niedersachsen online e.V.";
				case "thr":
					return "Thüringer Institut für Lehrerfortbildung, Lehrplanentwicklung und Medien";
				case "brb":
					return "Dataport";
				default:
					return "Dataport";
			}
		});

		return {
			headline,
			breadcrumbs,
			openedPanels,
			school,
			systems,
			isLoading,
			error,
			isFeatureOauthMigrationEnabled,
			isFeatureSchoolPolicyEnabled,
			isFeatureSchoolTermsOfUseEnabled,
			instituteTitle,
			mdiAlertCircle,
			mdiPlus,
			mdiMinus,
		};
	},
});
</script>

<style lang="scss" scoped>
.alert-text {
	color: rgba(var(--v-theme-on-background)) !important;
	line-height: var(--line-height-lg) !important;
}
</style>
