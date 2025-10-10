<template>
	<default-wireframe :headline="headline" max-width="nativ">
		<v-alert v-if="error" type="error" :icon="mdiAlertCircle" data-testid="error-alert">
			<div class="alert-text">
				{{ $t(error.translationKey) }}
			</div>
		</v-alert>
		<div data-testid="no-error">
			<v-alert type="info" class="mb-12">
				<div class="alert-text" data-testid="institute-title">
					{{ $t("pages.administration.school.index.info", { instituteTitle }) }}
				</div>
			</v-alert>

			<v-expansion-panels multiple class="pb-9" :model-value="openedPanels">
				<v-expansion-panel data-testid="general-settings-panel" value="general">
					<v-expansion-panel-title>
						<h2 class="ma-0">
							{{ $t("pages.administration.school.index.generalSettings") }}
						</h2>
						<template #actions="{ expanded }">
							<div class="v-expansion-panel-header__icon">
								<v-icon :icon="expanded ? mdiMinus : mdiPlus" />
							</div>
						</template>
					</v-expansion-panel-title>
					<v-expansion-panel-text eager>
						<general-settings class="mt-4" />
					</v-expansion-panel-text>
				</v-expansion-panel>

				<v-expansion-panel v-if="isFeatureSchoolPolicyEnabled" data-testid="policy-panel" value="privacy">
					<v-expansion-panel-title>
						<h2 class="ma-0">
							{{ $t("common.words.privacyPolicy") }}
						</h2>
						<template #actions="{ expanded }">
							<div class="v-expansion-panel-header__icon">
								<v-icon :icon="expanded ? mdiMinus : mdiPlus" />
							</div>
						</template>
					</v-expansion-panel-title>
					<v-expansion-panel-text eager>
						<school-policy />
					</v-expansion-panel-text>
				</v-expansion-panel>

				<v-expansion-panel v-if="isFeatureSchoolTermsOfUseEnabled" data-testid="terms-panel" value="terms">
					<v-expansion-panel-title>
						<h2 class="ma-0">
							{{ $t("common.words.termsOfUse") }}
						</h2>
						<template #actions="{ expanded }">
							<div class="v-expansion-panel-header__icon">
								<v-icon :icon="expanded ? mdiMinus : mdiPlus" />
							</div>
						</template>
					</v-expansion-panel-title>
					<v-expansion-panel-text eager>
						<school-terms-of-use />
					</v-expansion-panel-text>
				</v-expansion-panel>

				<v-expansion-panel v-if="schoolUsesLdap" data-testid="school-year-change-panel">
					<v-expansion-panel-title>
						<h2 class="ma-0">
							{{ $t("components.administration.schoolYearChangeSection.headers") }}
						</h2>
						<template #actions="{ expanded }">
							<div class="v-expansion-panel-header__icon">
								<v-icon :icon="expanded ? mdiMinus : mdiPlus" />
							</div>
						</template>
					</v-expansion-panel-title>
					<v-expansion-panel-text eager>
						<school-year-change-section />
					</v-expansion-panel-text>
				</v-expansion-panel>

				<v-expansion-panel v-if="isFeatureOauthMigrationEnabled" data-testid="migration-panel" value="migration">
					<v-expansion-panel-title>
						<h2 class="ma-0">
							{{ $t("components.administration.adminMigrationSection.headers") }}
						</h2>
						<template #actions="{ expanded }">
							<div class="v-expansion-panel-header__icon">
								<v-icon :icon="expanded ? mdiMinus : mdiPlus" />
							</div>
						</template>
					</v-expansion-panel-title>
					<v-expansion-panel-text eager>
						<admin-migration-section />
					</v-expansion-panel-text>
				</v-expansion-panel>

				<v-expansion-panel data-testid="systems-panel" value="authentication">
					<v-expansion-panel-title>
						<h2 class="ma-0">
							{{ $t("pages.administration.school.index.authSystems.title") }}
						</h2>
						<template #actions="{ expanded }">
							<div class="v-expansion-panel-header__icon">
								<v-icon :icon="expanded ? mdiMinus : mdiPlus" />
							</div>
						</template>
					</v-expansion-panel-title>
					<v-expansion-panel-text eager>
						<template v-if="isLoading">
							<v-skeleton-loader type="table-thead, table-row, table-row" data-testid="systems-panel-skeleton" />
						</template>
						<auth-systems v-else :systems="systems" />
					</v-expansion-panel-text>
				</v-expansion-panel>

				<v-expansion-panel data-testid="tools-panel" value="tools">
					<v-expansion-panel-title>
						<h2 class="ma-0">
							{{ $t("components.administration.externalToolsSection.header") }}
						</h2>
						<template #actions="{ expanded }">
							<div class="v-expansion-panel-header__icon">
								<v-icon :icon="expanded ? mdiMinus : mdiPlus" />
							</div>
						</template>
					</v-expansion-panel-title>
					<v-expansion-panel-text eager>
						<external-tools-section />
					</v-expansion-panel-text>
				</v-expansion-panel>
			</v-expansion-panels>
		</div>
	</default-wireframe>
</template>

<script lang="ts">
import AdminMigrationSection from "@/components/administration/AdminMigrationSection.vue";
import ExternalToolsSection from "@/components/administration/ExternalToolSection.vue";
import SchoolYearChangeSection from "@/components/administration/SchoolYearChangeSection.vue";
import AuthSystems from "@/components/organisms/administration/AuthSystems.vue";
import GeneralSettings from "@/components/organisms/administration/GeneralSettings.vue";
import SchoolPolicy from "@/components/organisms/administration/SchoolPolicy.vue";
import SchoolTermsOfUse from "@/components/organisms/administration/SchoolTerms.vue";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { SchoolSystemResponse } from "@/serverApi/v3";
import { ApplicationError } from "@/store/types/application-error";
import { School } from "@/store/types/schools";
import { injectStrict, SCHOOLS_MODULE_KEY } from "@/utils/inject";
import { buildPageTitle } from "@/utils/pageTitle";
import { useEnvConfig, useEnvStore } from "@data-env";
import { useSharedSchoolYearChange } from "@data-school";
import { mdiAlertCircle, mdiMinus, mdiPlus } from "@icons/material";
import { useTitle } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { computed, ComputedRef, defineComponent, onMounted, Ref, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

export default defineComponent({
	name: "SchoolSettings",
	components: {
		DefaultWireframe,
		ExternalToolsSection,
		SchoolYearChangeSection,
		AdminMigrationSection,
		GeneralSettings,
		SchoolPolicy,
		SchoolTermsOfUse,
		AuthSystems,
	},
	setup() {
		const { t } = useI18n();
		const schoolsModule = injectStrict(SCHOOLS_MODULE_KEY);
		const route = useRoute();

		const headline: Ref<string> = ref(t("pages.administration.school.index.title"));
		const pageTitle = buildPageTitle(headline.value);
		useTitle(pageTitle);
		const { fetchSchoolYearStatus, maintenanceStatus } = useSharedSchoolYearChange();

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
		const systems: ComputedRef<SchoolSystemResponse[]> = computed(() => schoolsModule.getSystems);
		const isLoading: ComputedRef<boolean> = computed(() => schoolsModule.getLoading);
		const error: ComputedRef<ApplicationError | null> = computed(() => schoolsModule.getError);
		const isFeatureOauthMigrationEnabled: ComputedRef<boolean | undefined> = computed(
			() => useEnvConfig().value.FEATURE_USER_LOGIN_MIGRATION_ENABLED
		);
		const isFeatureSchoolPolicyEnabled: ComputedRef<boolean | undefined> = computed(
			() => useEnvConfig().value.FEATURE_SCHOOL_POLICY_ENABLED_NEW
		);
		const isFeatureSchoolTermsOfUseEnabled: ComputedRef<boolean | undefined> = computed(
			() => useEnvConfig().value.FEATURE_SCHOOL_TERMS_OF_USE_ENABLED
		);

		const { instituteTitle } = storeToRefs(useEnvStore());

		onMounted(async () => {
			if (school.value?.id) {
				await fetchSchoolYearStatus(school.value.id);
			}
		});

		const schoolUsesLdap: ComputedRef<boolean> = computed(() => !!maintenanceStatus.value?.schoolUsesLdap);

		return {
			headline,
			openedPanels,
			school,
			systems,
			isLoading,
			error,
			isFeatureOauthMigrationEnabled,
			isFeatureSchoolPolicyEnabled,
			isFeatureSchoolTermsOfUseEnabled,
			instituteTitle,
			schoolUsesLdap,
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
