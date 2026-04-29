<template>
	<DefaultWireframe :headline="headline" max-width="native">
		<ErrorAlert v-if="schoolApiError" data-testid="error-alert">
			{{ t("pages.administration.school.index.error") }}
		</ErrorAlert>
		<div data-testid="no-error">
			<InfoAlert class="mb-12" data-testid="institute-title">
				{{ t("pages.administration.school.index.info", { instituteTitle }) }}
			</InfoAlert>

			<VExpansionPanels multiple class="pb-9" :model-value="openedPanels">
				<VExpansionPanel data-testid="general-settings-panel" value="general">
					<VExpansionPanelTitle>
						<h2 class="ma-0">
							{{ t("pages.administration.school.index.generalSettings") }}
						</h2>
						<template #actions="{ expanded }">
							<div class="v-expansion-panel-header__icon">
								<VIcon :icon="expanded ? mdiMinus : mdiPlus" />
							</div>
						</template>
					</VExpansionPanelTitle>
					<VExpansionPanelText eager>
						<GeneralSettings class="mt-4" />
					</VExpansionPanelText>
				</VExpansionPanel>

				<VExpansionPanel v-if="isFeatureSchoolPolicyEnabled" data-testid="policy-panel" value="privacy">
					<VExpansionPanelTitle>
						<h2 class="ma-0">
							{{ t("common.words.privacyPolicy") }}
						</h2>
						<template #actions="{ expanded }">
							<div class="v-expansion-panel-header__icon">
								<VIcon :icon="expanded ? mdiMinus : mdiPlus" />
							</div>
						</template>
					</VExpansionPanelTitle>
					<VExpansionPanelText eager>
						<SchoolPolicy />
					</VExpansionPanelText>
				</VExpansionPanel>

				<VExpansionPanel v-if="isFeatureSchoolTermsOfUseEnabled" data-testid="terms-panel" value="terms">
					<VExpansionPanelTitle>
						<h2 class="ma-0">
							{{ t("common.words.termsOfUse") }}
						</h2>
						<template #actions="{ expanded }">
							<div class="v-expansion-panel-header__icon">
								<VIcon :icon="expanded ? mdiMinus : mdiPlus" />
							</div>
						</template>
					</VExpansionPanelTitle>
					<VExpansionPanelText eager>
						<SchoolTermsOfUse />
					</VExpansionPanelText>
				</VExpansionPanel>

				<VExpansionPanel v-if="schoolUsesLdap" data-testid="school-year-change-panel">
					<VExpansionPanelTitle>
						<h2 class="ma-0">
							{{ t("components.administration.schoolYearChangeSection.headers") }}
						</h2>
						<template #actions="{ expanded }">
							<div class="v-expansion-panel-header__icon">
								<VIcon :icon="expanded ? mdiMinus : mdiPlus" />
							</div>
						</template>
					</VExpansionPanelTitle>
					<VExpansionPanelText eager>
						<SchoolYearChangeSection />
					</VExpansionPanelText>
				</VExpansionPanel>

				<VExpansionPanel v-if="isFeatureOauthMigrationEnabled" data-testid="migration-panel" value="migration">
					<VExpansionPanelTitle>
						<h2 class="ma-0">
							{{ t("components.administration.adminMigrationSection.headers") }}
						</h2>
						<template #actions="{ expanded }">
							<div class="v-expansion-panel-header__icon">
								<VIcon :icon="expanded ? mdiMinus : mdiPlus" />
							</div>
						</template>
					</VExpansionPanelTitle>
					<VExpansionPanelText eager>
						<SchoolAdminMigrationSection />
					</VExpansionPanelText>
				</VExpansionPanel>

				<VExpansionPanel data-testid="systems-panel" value="authentication">
					<VExpansionPanelTitle>
						<h2 class="ma-0">
							{{ t("pages.administration.school.index.authSystems.title") }}
						</h2>
						<template #actions="{ expanded }">
							<div class="v-expansion-panel-header__icon">
								<VIcon :icon="expanded ? mdiMinus : mdiPlus" />
							</div>
						</template>
					</VExpansionPanelTitle>
					<VExpansionPanelText eager>
						<template v-if="isLoadingSchoolData">
							<VSkeletonLoader type="table-thead, table-row, table-row" data-testid="systems-panel-skeleton" />
						</template>
						<AuthSystems v-else :systems="schoolSystems" />
					</VExpansionPanelText>
				</VExpansionPanel>

				<VExpansionPanel data-testid="tools-panel" value="tools">
					<VExpansionPanelTitle>
						<h2 class="ma-0">
							{{ t("components.administration.externalToolsSection.header") }}
						</h2>
						<template #actions="{ expanded }">
							<div class="v-expansion-panel-header__icon">
								<VIcon :icon="expanded ? mdiMinus : mdiPlus" />
							</div>
						</template>
					</VExpansionPanelTitle>
					<VExpansionPanelText eager>
						<ExternalToolsSection />
					</VExpansionPanelText>
				</VExpansionPanel>
			</VExpansionPanels>
		</div>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import AuthSystems from "@/components/administration/school-settings/AuthSystems.vue";
import ExternalToolsSection from "@/components/administration/school-settings/ExternalToolSection.vue";
import GeneralSettings from "@/components/administration/school-settings/GeneralSettings.vue";
import SchoolAdminMigrationSection from "@/components/administration/school-settings/SchoolAdminMigrationSection.vue";
import SchoolPolicy from "@/components/administration/school-settings/SchoolPolicy.vue";
import SchoolTermsOfUse from "@/components/administration/school-settings/SchoolTerms.vue";
import SchoolYearChangeSection from "@/components/administration/school-settings/SchoolYearChangeSection.vue";
import { buildPageTitle } from "@/utils/pageTitle";
import { useSchoolStore, useSchoolStoreRefs } from "@data-app";
import { useEnvConfig, useEnvStore } from "@data-env";
import { mdiMinus, mdiPlus } from "@icons/material";
import { ErrorAlert, InfoAlert } from "@ui-alert";
import { DefaultWireframe } from "@ui-layout";
import { useTitle } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

const { t } = useI18n();
const route = useRoute();

const { fetchSchoolSystems, fetchMaintenanceStatus } = useSchoolStore();
const { schoolDetails, schoolSystems, isLoadingSchoolData, schoolApiError, schoolMaintenanceStatus } =
	useSchoolStoreRefs();

const headline = ref(t("pages.administration.school.index.title"));
const pageTitle = buildPageTitle(headline.value);
useTitle(pageTitle);

const { instituteTitle } = storeToRefs(useEnvStore());

const openedPanels = computed(() => (route.query.openPanels ? route.query.openPanels.toString().split(",") : []));
const isFeatureOauthMigrationEnabled = computed(() => useEnvConfig().value.FEATURE_USER_LOGIN_MIGRATION_ENABLED);
const isFeatureSchoolPolicyEnabled = computed(() => useEnvConfig().value.FEATURE_SCHOOL_POLICY_ENABLED_NEW);
const isFeatureSchoolTermsOfUseEnabled = computed(() => useEnvConfig().value.FEATURE_SCHOOL_TERMS_OF_USE_ENABLED);
const schoolUsesLdap = computed(() => schoolMaintenanceStatus.value?.schoolUsesLdap === true);

watch(
	schoolDetails,
	(newSchool, oldSchool) => {
		// fetch systems when the school is loaded
		// if the school object gets a new reference (e.g. after updating it) do not reload the year or systems
		if (
			!schoolSystems.value ||
			!schoolSystems.value.length ||
			(newSchool && newSchool.id && (!oldSchool || !oldSchool.id))
		) {
			fetchSchoolSystems(newSchool.id);
		}
	},
	{ immediate: true }
);

onMounted(async () => {
	await fetchMaintenanceStatus(schoolDetails.value.id);
});
</script>
