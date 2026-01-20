<template>
	<DefaultWireframe ref="main" :breadcrumbs max-width="full">
		<template #header>
			<h1 aria-level="1" class="my-4" data-testid="fwu-title">
				{{ t("pages.fwu-media.title") }}
			</h1>
		</template>

		<template #default>
			<div v-if="debouncedIsLoading" class="d-flex mt-10 justify-center align-center">
				<VProgressCircular indeterminate size="115" />
			</div>
			<template v-else>
				<VTextField
					v-model="searchQuery"
					data-testid="fwu-search"
					class="mt-4 mb-8"
					variant="filled"
					:label="t('common.labels.search')"
					:prepend-inner-icon="mdiMagnify"
					clearable
				/>

				<TransitionGroup name="fwu-grid" tag="div" class="fwu-grid-container">
					<VCard
						v-for="item in filteredFwuList"
						:key="item.id"
						:href="item.targetUrl"
						target="_blank"
						rel="noopener noreferrer"
						hover
						class="fwu-card"
					>
						<VImg :src="item.thumbnailUrl" height="200" cover />
						<VCardTitle class="font-weight-bold text-body-1 text-wrap">
							{{ item.title }}
						</VCardTitle>
					</VCard>
				</TransitionGroup>
			</template>
		</template>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { FwuApiFactory, FwuItemResponse } from "@/generated/fwu-api/v3";
import { $axios } from "@/utils/api";
import { buildPageTitle } from "@/utils/pageTitle";
import { mdiMagnify } from "@icons/material";
import { Breadcrumb, DefaultWireframe } from "@ui-layout";
import { refDebounced, useTitle, useUrlSearchParams } from "@vueuse/core";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const fwuList = ref<FwuItemResponse[]>([]);
const fwuApi = FwuApiFactory(undefined, "/v3", $axios);
const { execute, status } = useSafeAxiosTask();

const isLoadingFwuContent = computed(() => status.value === "" || status.value === "pending");
const { t } = useI18n();
const PLURAL_COUNT = 2;

const pageTitle = buildPageTitle(t("pages.fwu-media.title"));
useTitle(pageTitle);

const breadcrumbs = computed<Breadcrumb[]>(() => [
	{
		title: t("feature.media-shelf.title"),
		to: "/media-shelf",
	},
	{
		title: pageTitle,
		disabled: true,
	},
]);

const params = useUrlSearchParams("history");
const searchQuery = computed({
	get: () => (params.q ?? "") as string,
	set: (val) => {
		params.q = val ?? undefined;
	},
});
const debouncedSearch = refDebounced(searchQuery, 300);
const debouncedIsLoading = refDebounced(isLoadingFwuContent, 200);

onMounted(async () => {
	const { result } = await execute(
		() => fwuApi.fwuLearningContentsControllerGetList(),
		t(
			"common.notifications.errors.notLoaded",
			{
				type: t("pages.fwu-media.items"),
			},
			PLURAL_COUNT
		)
	);
	fwuList.value = result?.data?.data ?? [];
});

const filteredFwuList = computed(() => {
	if (!debouncedSearch.value || debouncedSearch.value.trim() === "") {
		return fwuList.value;
	}

	const query = debouncedSearch.value.toLowerCase().trim();

	return fwuList.value.filter((item) => item.title.toLowerCase().includes(query));
});
</script>

<style scoped lang="scss">
.fwu-grid-container {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
	gap: 1.5rem;
}

.fwu-card:hover {
	text-decoration: underline;
}

.fwu-grid {
	&-move {
		transition: all 0.5s ease;
	}

	&-enter-from {
		opacity: 0;
		transform: translateY(30px);
	}

	&-enter-active {
		transition: all 1s ease;
	}

	&-enter-to {
		opacity: 1;
	}

	&-leave-active {
		display: none;
	}
}
</style>
