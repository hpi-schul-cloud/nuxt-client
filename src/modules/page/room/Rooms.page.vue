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
		<RoomGrid v-else :rooms />
		<ImportCardDialog
			v-if="isCardImportDialogOpen"
			:is-dialog-open="isCardImportDialogOpen"
			:share-token-info="shareTokenInfo!"
			:available-destinations="availableDestinations"
			destination-type="column"
			@confirm="onConfirmImport"
			@cancel="onCancelImport"
		/>
		<ImportDialog
			v-if="isGenericImportDialogOpen"
			:is-dialog-open="isGenericImportDialogOpen"
			:share-token-info="shareTokenInfo!"
			:available-destinations="availableDestinations"
			destination-type="room"
			@confirm="onConfirmImport"
			@cancel="onCancelImport"
		/>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { buildPageTitle } from "@/utils/pageTitle";
import { Permission } from "@api-server";
import { useAppStore } from "@data-app";
import { useRoomStore } from "@data-room";
import { ImportCardDialog, useImportFlow } from "@feature-import";
import { ImportDialog } from "@feature-import";
import { RoomGrid, RoomsWelcomeInfo } from "@feature-room";
import { mdiPlus } from "@icons/material";
import { EmptyState, RoomsEmptyStateSvg } from "@ui-empty-state";
import { DefaultWireframe } from "@ui-layout";
import { useTitle } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { computed, onMounted, toValue, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { rooms, isLoading, isEmpty } = storeToRefs(useRoomStore());

const { fetchRooms } = useRoomStore();

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

const availableDestinations = computed(() => rooms.value.filter((room) => !room.isLocked));

const {
	executeImport,
	isGenericImportDialogOpen,
	isCardImportDialogOpen,
	shareTokenInfo,
	onConfirmImport,
	onCancelImport,
} = useImportFlow();

const executeImportFlow = async (token: string) => {
	const { result: importResult } = await executeImport(token);

	if (!importResult) {
		router.push({ name: "rooms" });
		return;
	}

	if (importResult.destination && importResult.destination.type === "room") {
		router.replace({ name: "room-details", params: { id: importResult.destination.id } });
	} else if (importResult.destination && importResult.destination.type === "column") {
		router.replace({ name: "boards-id", params: { id: importResult.destination.boardId } });
	} else {
		router.replace({ name: "rooms" });
		fetchRooms();
	}
};

watch(
	() => route.query.import,
	() => {
		if (route.query.import) {
			const token = route.query.import as string;
			executeImportFlow(token);
		}
	},
	{ immediate: true }
);

onMounted(() => {
	fetchRooms();
});
</script>
