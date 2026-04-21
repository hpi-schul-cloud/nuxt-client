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
			v-if="showImportCardDialog"
			:is-dialog-open="showImportCardDialog"
			:share-token-info="shareTokenInfo!"
		/>
		<ImportDialog
			v-if="showGenericImportDialog"
			:is-dialog-open="showGenericImportDialog"
			:share-token-info="shareTokenInfo!"
			:available-destinations="availableDestinations"
			destination-type="room"
			@confirm="importAction.submit"
			@cancel="onCancelImport"
		/>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { useAwaitableAction } from "@/composables/awaitable-action.composable";
import { buildPageTitle } from "@/utils/pageTitle";
import { Permission, ShareTokenInfoResponse, ShareTokenInfoResponseParentType } from "@api-server";
import { useAppStore, useLoadingStore } from "@data-app";
import { useRoomStore } from "@data-room";
import { ImportCardDialog } from "@feature-board";
import { useShareTokenImport } from "@feature-import";
import { ImportDialog } from "@feature-import";
import { RoomGrid, RoomsWelcomeInfo } from "@feature-room";
import { mdiPlus } from "@icons/material";
import { EmptyState, RoomsEmptyStateSvg } from "@ui-empty-state";
import { DefaultWireframe } from "@ui-layout";
import { useTitle } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, toValue, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { rooms, isLoading, isEmpty } = storeToRefs(useRoomStore());
const { withLoadingState } = useLoadingStore();

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

const shareTokenInfo = ref<ShareTokenInfoResponse>();
const availableDestinations = computed(() => rooms.value.filter((room) => !room.isLocked));

const { validateShareToken, importShareToken } = useShareTokenImport();
const importAction = useAwaitableAction<{ newName: string; destinationId?: string }>();

const showImportCardDialog = computed(
	() => !!shareTokenInfo.value && shareTokenInfo.value?.parentType === ShareTokenInfoResponseParentType.CARD
);

const showGenericImportDialog = computed(
	() =>
		importAction.isActive.value &&
		!!shareTokenInfo.value &&
		shareTokenInfo.value?.parentType !== ShareTokenInfoResponseParentType.CARD
);

const onCancelImport = () => {
	importAction.cancel();
};

const executeImport = async (token: string) => {
	const { validationResult } = await validateShareToken(token);

	if (!validationResult) {
		onCancelImport();
		return;
	}

	shareTokenInfo.value = validationResult;

	const { submitted, data } = await importAction.start();
	if (!submitted) return;

	const { importResult } = await withLoadingState(
		() => importShareToken(validationResult, data),
		t("components.molecules.import.options.loadingMessage")
	);

	if (!importResult) {
		onCancelImport();
		return;
	}

	if (importResult.destinationId) {
		router.replace({ name: "room-details", params: { id: importResult.destinationId } });
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
			executeImport(token);
		}
	},
	{ immediate: true }
);

onMounted(() => {
	fetchRooms();
});
</script>
