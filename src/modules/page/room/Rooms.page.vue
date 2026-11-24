<template>
	<DefaultWireframe max-width="full" :fab-items="fabAction" main-with-bottom-padding>
		<template #header>
			<div class="d-flex align-center">
				<h1>{{ t("pages.rooms.title") }}</h1>
				<KebabMenu
					v-if="isRoomArchiveFeatureEnabled || isRoomGroupingEnabled"
					class="mx-2"
					:aria-label="t('pages.rooms.menu.ariaLabel')"
					data-testid="rooms-menu"
				>
					<KebabMenuAction
						v-if="isRoomGroupingEnabled"
						:icon="mdiPlus"
						:disabled="!isArrangementReady"
						data-testid="rooms-menu-add-group"
						@click="groupedOverview?.openCreateDialog(roomsMenuSelector)"
					>
						{{ t("pages.rooms.groups.add") }}
					</KebabMenuAction>
					<KebabMenuAction
						v-if="isRoomSelectionAvailable"
						:icon="mdiCheckboxOutline"
						data-testid="rooms-menu-select-rooms"
						@click="groupedOverview?.startSelection()"
					>
						{{ t("pages.rooms.groups.selection.start") }}
					</KebabMenuAction>
					<KebabMenuAction
						v-if="isCollapseAllVisible"
						:icon="mdiArrowCollapseUp"
						data-testid="rooms-menu-collapse-all-groups"
						@click="setAllGroupsCollapsed(true)"
					>
						{{ t("pages.rooms.menu.collapseAllGroups") }}
					</KebabMenuAction>
					<KebabMenuAction
						v-if="isExpandAllVisible"
						:icon="mdiArrowExpandDown"
						data-testid="rooms-menu-expand-all-groups"
						@click="setAllGroupsCollapsed(false)"
					>
						{{ t("pages.rooms.menu.expandAllGroups") }}
					</KebabMenuAction>
					<KebabMenuAction
						v-if="isRoomArchiveFeatureEnabled"
						:icon="mdiArchiveOutline"
						data-testid="rooms-menu-archived-rooms"
						@click="router.push({ name: 'rooms-archive' })"
					>
						{{ t("pages.rooms.archived.title") }}
					</KebabMenuAction>
					<KebabMenuAction
						v-if="isRestoreGroupDeleteConfirmationVisible"
						:icon="mdiAlertCircleOutline"
						data-testid="rooms-menu-restore-group-delete-confirmation"
						@click="restoreGroupDeleteConfirmation"
					>
						{{ t("pages.rooms.menu.restoreGroupDeleteConfirmation") }}
					</KebabMenuAction>
				</KebabMenu>
				<VBtn
					v-if="isRoomSelectionAvailable && !isSelectingRooms"
					variant="text"
					height="40"
					:icon="xs ? mdiCheckboxOutline : undefined"
					:prepend-icon="xs ? undefined : mdiCheckboxOutline"
					:aria-label="xs ? t('pages.rooms.groups.selection.start') : undefined"
					data-testid="room-selection-start"
					@click="groupedOverview?.startSelection()"
				>
					<template v-if="!xs">{{ t("pages.rooms.groups.selection.start") }}</template>
				</VBtn>
			</div>
		</template>
		<RoomsWelcomeInfo class="mt-8" />
		<template v-if="isRoomGroupingEnabled">
			<VContainer v-if="isArrangementInitialLoading" class="loader">
				<VSkeletonLoader ref="skeleton-loader" type="date-picker-days" class="mt-6" />
			</VContainer>
			<template v-else>
				<EmptyState v-if="isArrangementEmpty" :title="t('pages.rooms.emptyState')">
					<template #media>
						<RoomsEmptyStateSvg />
					</template>
				</EmptyState>
				<RoomGroupedOverview
					ref="groupedOverview"
					:reserve-fab-space="fabAction !== undefined"
					@selection-change="isSelectingRooms = $event"
				/>
			</template>
		</template>
		<template v-else>
			<VContainer v-if="isLoading && isEmpty" class="loader">
				<VSkeletonLoader ref="skeleton-loader" type="date-picker-days" class="mt-6" />
			</VContainer>
			<EmptyState v-else-if="isEmpty" :title="t('pages.rooms.emptyState')">
				<template #media>
					<RoomsEmptyStateSvg />
				</template>
			</EmptyState>
			<RoomGrid v-else :rooms />
		</template>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { useAriaLiveNotifier } from "@/composables/ariaLiveNotifier";
import { buildPageTitle } from "@/utils/pageTitle";
import { Permission } from "@api-server";
import { notifySuccess, useAppStore } from "@data-app";
import { useEnvConfig } from "@data-env";
import { useRoomArrangementStore, useRoomStore } from "@data-room";
import { useImportFlow } from "@feature-import";
import { RoomGrid, RoomGroupedOverview, RoomsWelcomeInfo } from "@feature-room";
import {
	mdiAlertCircleOutline,
	mdiArchiveOutline,
	mdiArrowCollapseUp,
	mdiArrowExpandDown,
	mdiCheckboxOutline,
	mdiPlus,
} from "@icons/material";
import { EmptyState, RoomsEmptyStateSvg } from "@ui-empty-state";
import { KebabMenu, KebabMenuAction } from "@ui-kebab-menu";
import { DefaultWireframe } from "@ui-layout";
import { useTitle } from "@vueuse/core";
import { sortBy } from "lodash-es";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, toValue, useTemplateRef, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { useDisplay } from "vuetify";

const { t } = useI18n();
const { xs } = useDisplay();
const route = useRoute();
const router = useRouter();
const { rooms, isLoading, isEmpty } = storeToRefs(useRoomStore());

const { fetchRooms } = useRoomStore();

const arrangementStore = useRoomArrangementStore();
const groupedOverview = useTemplateRef("groupedOverview");
const {
	isInitialLoading: isArrangementInitialLoading,
	isEmpty: isArrangementEmpty,
	isReady: isArrangementReady,
	confirmGroupDeletion,
	groups: arrangementGroups,
} = storeToRefs(arrangementStore);
const { notifyOnScreenReader } = useAriaLiveNotifier();

const pageTitle = computed(() => buildPageTitle(t("pages.rooms.title")));
useTitle(pageTitle);

const isRoomArchiveFeatureEnabled = computed(() => useEnvConfig().value.FEATURE_ROOM_ARCHIVE_ENABLED);
const isRoomGroupingEnabled = computed(() => useEnvConfig().value.FEATURE_ROOM_GROUPING_ENABLED);

const isRestoreGroupDeleteConfirmationVisible = computed(
	() => isRoomGroupingEnabled.value && isArrangementReady.value && !confirmGroupDeletion.value
);

const isRoomSelectionAvailable = computed(
	() =>
		isRoomGroupingEnabled.value &&
		isArrangementReady.value &&
		arrangementGroups.value.length > 0 &&
		rooms.value.some((room) => room.allowedOperations?.arrangeRooms === true)
);
const isCollapseAllVisible = computed(
	() => isRoomGroupingEnabled.value && isArrangementReady.value && arrangementGroups.value.some((g) => !g.collapsed)
);
const isExpandAllVisible = computed(
	() => isRoomGroupingEnabled.value && isArrangementReady.value && arrangementGroups.value.some((g) => g.collapsed)
);

const setAllGroupsCollapsed = async (collapsed: boolean) => {
	const isApplied = await arrangementStore.setAllGroupsCollapsed(collapsed);
	if (isApplied) {
		notifyOnScreenReader(
			t(collapsed ? "pages.rooms.groups.announce.allCollapsed" : "pages.rooms.groups.announce.allExpanded")
		);
	}
};

const restoreGroupDeleteConfirmation = async () => {
	const result = await arrangementStore.setConfirmGroupDeletion(true);
	if (result.success) {
		notifySuccess(t("pages.rooms.groups.confirmationRestored"));
	}
};

const loadRooms = () => (isRoomGroupingEnabled.value ? arrangementStore.loadOverview() : fetchRooms());

const isSelectingRooms = ref(false);
// The create dialog returns focus to the page menu trigger when it was opened from there.
const roomsMenuSelector = "[data-testid='rooms-menu']";

// While rooms are selected, the button would cover the selection bar at the bottom of the viewport.
const fabAction = computed(() => {
	if (isSelectingRooms.value) return;
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
		loadRooms();
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
	loadRooms();
});
</script>
