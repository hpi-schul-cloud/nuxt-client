<template>
	<DefaultWireframe max-width="full" :fab-items="fabAction" main-with-bottom-padding>
		<template #header>
			<h1>{{ t("pages.rooms.title") }}</h1>
		</template>
		<RoomsWelcomeInfo class="mt-8" />
		<VContainer v-if="isLoading && isEmpty" class="loader">
			<VSkeletonLoader ref="skeleton-loader" type="date-picker-days" class="mt-6" />
		</VContainer>
		<EmptyState v-else-if="isEmpty" :title="t('pages.rooms.emptyState')">
			<template #media>
				<RoomsEmptyStateSvg />
			</template>
		</EmptyState>
		<template v-else>
			<div v-if="isRoomSearchEnabled" class="room-search mt-8">
				<SvsSearchField
					ref="search-field"
					v-model="searchQuery"
					density="default"
					class="px-1"
					:label="t('pages.rooms.search.label')"
					data-testid="room-search"
					@keydown.esc="clearSearch"
				/>
			</div>
			<div v-if="isSearching && filteredRooms.length === 0" class="mt-8" data-testid="room-search-empty">
				<p class="mb-4">{{ t("pages.rooms.search.noResults") }}</p>
				<VBtn variant="outlined" data-testid="room-search-clear" @click="clearSearch">
					{{ t("pages.rooms.search.clear") }}
				</VBtn>
			</div>
			<RoomGrid v-else :rooms="filteredRooms" :is-sortable="!isSearching" />
		</template>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { useAriaLiveNotifier } from "@/composables/ariaLiveNotifier";
import { buildPageTitle } from "@/utils/pageTitle";
import { Permission } from "@api-server";
import { useAppStore } from "@data-app";
import { useEnvConfig } from "@data-env";
import { useRoomStore } from "@data-room";
import { useImportFlow } from "@feature-import";
import { filterRoomsByName, RoomGrid, RoomsWelcomeInfo } from "@feature-room";
import { mdiPlus } from "@icons/material";
import { SvsSearchField } from "@ui-controls";
import { EmptyState, RoomsEmptyStateSvg } from "@ui-empty-state";
import { DefaultWireframe } from "@ui-layout";
import { useDebounceFn, useTitle } from "@vueuse/core";
import { sortBy } from "lodash-es";
import { storeToRefs } from "pinia";
import { type ComponentPublicInstance, computed, onMounted, ref, toValue, useTemplateRef, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { rooms, isLoading, isEmpty } = storeToRefs(useRoomStore());

const { fetchRooms } = useRoomStore();

const isRoomSearchEnabled = computed(() => useEnvConfig().value.FEATURE_ROOM_SEARCH_ENABLED);
const searchQuery = ref("");
const trimmedQuery = computed(() => (searchQuery.value ?? "").trim());
const isSearching = computed(() => isRoomSearchEnabled.value && trimmedQuery.value.length > 0);
const filteredRooms = computed(() =>
	isSearching.value ? filterRoomsByName(rooms.value, trimmedQuery.value) : rooms.value
);

const searchField = useTemplateRef<ComponentPublicInstance>("search-field");

const clearSearch = () => {
	searchQuery.value = "";
	searchField.value?.$el.querySelector("input")?.focus();
};

const { notifyOnScreenReader } = useAriaLiveNotifier();

const announceResults = useDebounceFn(() => {
	if (!isSearching.value) return;

	const count = filteredRooms.value.length;
	notifyOnScreenReader(count === 0 ? t("pages.rooms.search.noResults") : t("pages.rooms.search.results", { count }));
}, 500);

watch(trimmedQuery, () => announceResults());

const pageTitle = computed(() => buildPageTitle(t("pages.rooms.title")));
useTitle(pageTitle);

const fabAction = computed(() => {
	const canCreateRoom = toValue(useAppStore().hasPermission(Permission.SCHOOL_CREATE_ROOM));
	if (!canCreateRoom) return;

	return [
		{
			icon: mdiPlus,
			label: t("pages.rooms.fab.title"),
			to: "/rooms/new",
			dataTestId: "fab-add-room",
		},
	];
});

const availableDestinations = computed(() =>
	sortBy(
		rooms.value.filter((room) => !room.isLocked && (room.allowedOperations?.editContent ?? false)),
		(r) => r.name
	)
);

const { executeImport } = useImportFlow();

const executeImportFlow = async (token: string) => {
	// rooms might not be loaded yet, so we need to fetch them before executing the import
	await fetchRooms();
	const { destinations: importDestinations, success } = await executeImport(token, availableDestinations);

	if (!success) {
		router.push({ name: "rooms" });
		return;
	}

	const destinations = importDestinations ?? [];

	if (destinations.length === 1 && destinations[0].type === "room") {
		router.replace({ name: "room-details", params: { id: destinations[0].id } });
	} else if (destinations.length === 1 && destinations[0].type === "column" && "boardId" in destinations[0]) {
		router.replace({ name: "boards-id", params: { id: destinations[0].boardId } });
	} else if (destinations.length === 1 && destinations[0].type === "board") {
		router.replace({ name: "boards-id", params: { id: destinations[0].id } });
	} else {
		router.replace({ name: "rooms" });
		fetchRooms();
	}
};

watch(
	() => route.query.import,
	(newValue) => {
		if (newValue) {
			const token = newValue as string;
			executeImportFlow(token);
		}
	},
	{ immediate: true }
);

onMounted(() => {
	fetchRooms();
});
</script>

<style scoped>
.room-search {
	max-width: 600px;
	margin-left: auto;
	margin-right: auto;
}
</style>
