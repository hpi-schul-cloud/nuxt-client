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
		<ImportCardDialog v-if="showImportCardDialog" :is-dialog-open="showImportCardDialog" :token="importToken!" />
		<ImportFlow
			:is-active="showGenericImportDialog"
			:token="importToken"
			:destinations="importFlowDestinations"
			:destination-type="BoardExternalReferenceType.Room"
			@success="onImportSuccess"
		/>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import ImportFlow from "@/components/share/ImportFlow.vue";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { BoardExternalReferenceType, ShareTokenBodyParamsParentTypeEnum } from "@/serverApi/v3";
import { buildPageTitle } from "@/utils/pageTitle";
import { notifySuccess } from "@data-app";
import { useRoomAuthorization, useRoomStore } from "@data-room";
import { ImportCardDialog } from "@feature-board";
import { RoomGrid, RoomsWelcomeInfo } from "@feature-room";
import { mdiPlus } from "@icons/material";
import { EmptyState, RoomsEmptyStateSvg } from "@ui-empty-state";
import { useTitle } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { rooms, isLoading, isEmpty } = storeToRefs(useRoomStore());

const { fetchRooms } = useRoomStore();
const { canCreateRoom } = useRoomAuthorization();

const pageTitle = computed(() => buildPageTitle(t("pages.rooms.title")));
useTitle(pageTitle);

const fabAction = computed(() => {
	if (!canCreateRoom.value) return;

	return [
		{
			icon: mdiPlus,
			label: t("pages.rooms.fab.title"),
			to: "/rooms/new",
			dataTestId: "fab-add-room",
		},
	];
});

const importedType = ref<string>();
const importToken = ref<string>();

watch(
	() => route.query.import,
	() => {
		if (route.query.import) {
			importedType.value = route.query.importedType as string;
			importToken.value = route.query.import as string;
		} else {
			importToken.value = undefined;
		}
	},
	{ immediate: true }
);

const showImportCardDialog = computed(
	() => importToken.value && importedType.value === ShareTokenBodyParamsParentTypeEnum.Card
);
const showGenericImportDialog = computed(
	() => !!importToken.value && importedType.value !== ShareTokenBodyParamsParentTypeEnum.Card
);

onMounted(() => {
	fetchRooms();
});

const importFlowDestinations = computed(() => rooms.value.filter((room) => !room.isLocked));

const onImportSuccess = (newName: string, destinationId?: string) => {
	notifySuccess(
		t("components.molecules.import.options.success", {
			name: newName,
		})
	);

	if (destinationId) {
		router.replace({ name: "room-details", params: { id: destinationId } });
	} else {
		router.replace({ name: "rooms" });
		fetchRooms();
		importToken.value = undefined;
	}
};
</script>
