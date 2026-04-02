<template>
	<SvsDialog
		:model-value="hasNewReleaseNotes"
		title="pages.dashboard.new.features.available"
		@cancel="setReleasePreferences"
	>
		<template #content>
			<div class="text-md">
				{{ t("pages.dashboard.new.features", { instanceTitle: envConfig.SC_TITLE }) }}
				{{ t("pages.dashboard.new.features.forward") }}
			</div>
			<VImg class="w-75 d-block mx-auto" src="@/assets/img/surprise.svg" alt="" role="presentation" max-width="360" />
		</template>
		<template #actions>
			<VBtn
				class="w-100"
				color="primary"
				variant="flat"
				:text="t('common.labels.moreInfo')"
				href="/system/releases"
				@click="setReleasePreferences"
			/>
		</template>
	</SvsDialog>
</template>

<script lang="ts" setup>
import { useSafeAxiosRunner, useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { $axios } from "@/utils/api";
import { MeApiFactory, ReleaseApiFactory } from "@api-server";
import { useAppStoreRefs } from "@data-app";
import { useEnvConfig } from "@data-env";
import { SvsDialog } from "@ui-dialog";
import { computed, watch } from "vue";
import { useI18n } from "vue-i18n";

const envConfig = useEnvConfig();
const { userPreferences } = useAppStoreRefs();
const { t } = useI18n();

const { execute: setPreference } = useSafeAxiosTask();

const meApi = MeApiFactory(undefined, "/v3", $axios);
const releasesApi = ReleaseApiFactory(undefined, "/v3", $axios);

const { data: releasesResponse } = useSafeAxiosRunner(() => releasesApi.releaseControllerGetReleases(0, 1));
const latestRelease = computed(() => releasesResponse.value?.data.data?.[0]);

// New users should not see release notes on first login. Thus it is not shown when no preference is set.
const hasNewReleaseNotes = computed(() => {
	const publishedAt = latestRelease.value?.publishedAt;
	const lastSeenDate = userPreferences.value?.releaseDate;

	if (!publishedAt || !lastSeenDate) return false;

	return new Date(lastSeenDate) < new Date(publishedAt);
});

const setReleasePreferences = () => {
	if (!latestRelease.value) return;

	setPreference(() =>
		meApi.meControllerUpdateMePreferences({
			releaseDate: latestRelease.value!.publishedAt,
		})
	);
};

watch(
	latestRelease,
	(release) => {
		if (release && !userPreferences.value?.releaseDate) {
			setReleasePreferences();
		}
	},
	{ once: true }
);
</script>
