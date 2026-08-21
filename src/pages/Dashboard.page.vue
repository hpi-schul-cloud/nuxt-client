<template>
	<DefaultWireframe max-width="full" main-with-bottom-padding>
		<template #header>
			<h1 data-testid="dashboard-title">{{ t("pages.dashboard.title") }}</h1>
		</template>
		<template #default>
			<Announcement class="mt-6" />
			<!-- Teams to Rooms Migration Alert, should completely be deleted after migration -->
			<WarningAlert v-if="!isDbc" class="mt-6" data-testid="teams-to-rooms-migration-alert">
				<span class="font-weight-bold">{{ t("loggedin.text.teamsToRooms") }}</span>

				<ul class="mt-1 pl-5">
					<li>{{ t("loggedin.text.teamsToRooms.possibilities") }}</li>
					<li>{{ t("loggedin.text.teamsToRooms.migration") }}</li>
					<li>
						<i18n-t keypath="loggedin.text.teamsToRooms.helpLink" scope="global">
							<template #helpLink>
								<a :href="helpLink" target="_blank" rel="noopener noreferrer" :aria-label="helpAriaLabel">
									{{ t("loggedin.text.teamsToRooms.helpLink.help") }}
								</a>
							</template>
						</i18n-t>
					</li>
				</ul>
			</WarningAlert>
			<InfoAlert v-if="isDbc && isAdmin" class="mt-6">
				<i18n-t keypath="loggedin.text.backupFeatures" scope="global">
					<template #helpLink>
						<a href="https://dbildungscloud.de/help/confluence/485132545" target="_blank" rel="noopener noreferrer">
							{{ t("loggedin.text.backupFeatures.helpLink") }}
						</a>
					</template>
				</i18n-t>
			</InfoAlert>

			<WarningAlert v-if="inMaintenanceOrMigrationText" class="mt-4" data-testid="maintenance-migration-alert">
				<RenderHTML :html="inMaintenanceOrMigrationText" />
			</WarningAlert>

			<SvsLoading :loading-state="newsLoadingState">
				<h2 class="mb-4">{{ t("pages.news.title") }}</h2>

				<!-- Dashboard news -->
				<EmptyState
					v-if="latestNews.length === 0"
					data-testid="empty-state-news"
					:title="t('pages.dashboard.empty.news')"
				>
					<template #media>
						<SvgNewsEmpty />
					</template>
				</EmptyState>
				<template v-else>
					<NewsGrid class="mb-4" :news-items="latestNews" />

					<VBtn to="/news" data-testid="show-all-news" variant="outlined" :text="t('common.actions.show.all')" />
				</template>
			</SvsLoading>

			<DashboardTasks v-if="isTeacher || isStudent" />

			<DashboardReleaseDialog />
		</template>
	</DefaultWireframe>
</template>

<script lang="ts" setup>
import SvgNewsEmpty from "@/assets/img/SvgNewsEmpty.vue";
import Announcement from "@/components/announcement/Announcement.vue";
import { buildPageTitle } from "@/utils/pageTitle";
import { Permission, SchulcloudTheme } from "@api-server";
import { useNewsList } from "@data-access";
import { useAppStore, useAppStoreRefs, useSchoolStoreRefs } from "@data-app";
import { useEnvConfig } from "@data-env";
import { DashboardReleaseDialog, DashboardTasks } from "@feature-dashboard";
import { NewsGrid } from "@feature-news";
import { RenderHTML } from "@feature-render-html";
import { InfoAlert, WarningAlert } from "@ui-alert";
import { SvsLoading } from "@ui-containers";
import { EmptyState } from "@ui-empty-state";
import { DefaultWireframe } from "@ui-layout";
import { useTitle } from "@vueuse/core";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { isTeacher, isStudent, isAdmin } = useAppStoreRefs();
const NEWS_LIMIT = 4;

useTitle(buildPageTitle(t("pages.dashboard.title")));

const { schoolDetails } = useSchoolStoreRefs();

const isSchoolInMaintenance = computed(() => schoolDetails.value.inMaintenance);
const isSchoolInMigration = computed(() => schoolDetails.value.inUserMigration);
const canSeeImportUsers = useAppStore().hasPermission(Permission.IMPORT_USER_VIEW);

const inMaintenanceOrMigrationText = computed(() => {
	if (isSchoolInMigration.value && canSeeImportUsers.value) {
		return t("loggedin.text.schoolInMigrationModeStarted");
	} else if (isSchoolInMaintenance.value) {
		if (isAdmin.value) {
			return t("loggedin.text.schoolInTransferPhaseStartNew");
		} else if (isTeacher.value) {
			return t("loggedin.text.schoolInTransferPhaseContactAdmin");
		}
	}
	return undefined;
});
const { news: latestNews, newsLoadingState } = useNewsList(NEWS_LIMIT);

const helpAriaLabel = computed(
	() => `${t("pages.rooms.infoAlert.welcome.furtherInformation.help")}, ${t("common.ariaLabel.newTab")}`
);
const helpLink = computed(() => `${window.location.origin}/help/confluence/426313035`);

const isDbc = computed(() => useEnvConfig().value.SC_THEME === SchulcloudTheme.DEFAULT);
</script>
