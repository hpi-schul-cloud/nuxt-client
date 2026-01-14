<template>
	<DefaultWireframe ref="main" max-width="full">
		<template #header>
			<h1 aria-level="1" class="mt-0 me-auto" data-testid="fwu-title">
				{{ t("pages.fwu-media.title") }}
			</h1>
		</template>

		<template #default>
			<VTextField
				v-model="searchQuery"
				data-testid="fwu-search"
				class="mt-4 mb-8"
				variant="filled"
				:label="t('common.labels.search')"
				:prepend-inner-icon="mdiMagnify"
				clearable
				hide-details
			/>

			<TransitionGroup name="fwu-grid" tag="div" class="fwu-grid-container">
				<VCard
					v-for="item in filteredFwuList"
					:key="item.id"
					:href="item.target_url"
					target="_blank"
					rel="noopener noreferrer"
					hover
					class="fwu-card"
				>
					<VImg :src="item.thumbnail_url" height="200" cover />
					<VCardTitle class="fwu-card-title text-wrap">
						{{ item.title }}
					</VCardTitle>
				</VCard>
			</TransitionGroup>
		</template>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { FwuApiFactory } from "@/generated/fwu-api/v3";
import { $axios } from "@/utils/api";
import { buildPageTitle } from "@/utils/pageTitle";
import { mdiMagnify } from "@icons/material";
import { DefaultWireframe } from "@ui-layout";
import { refDebounced, useTitle, useUrlSearchParams } from "@vueuse/core";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

useTitle(buildPageTitle(t("pages.fwu-media.title")));

const params = useUrlSearchParams("history");
const searchQuery = computed({
	get: () => (params.q ?? "") as string,
	set: (val) => {
		params.q = val ?? undefined;
	},
});
const debouncedSearch = refDebounced(searchQuery, 300);

interface IFwuList {
	id: string;
	title: string;
	thumbnail: string; // (url || bytes)
	targetUrl: string;
}

const fwuList = ref<IFwuList[]>([]);

const fwuApi = FwuApiFactory(undefined, "/v3", $axios);

const { execute, isRunning } = useSafeAxiosTask();
onMounted(async () => {
	const { result } = await execute(() => fwuApi.fwuLearningContentsControllerGetList());
	fwuList.value = result?.data;
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
