<template>
	<DefaultWireframe max-width="nativ" :fab-items="fabAction">
		<template #header>
			<h1>{{ t("pages.rooms.title") }}</h1>
		</template>
		<RoomsWelcomeInfo />
		<RoomGrid :rooms="rooms" :is-loading="isLoading" :is-empty="isEmpty" />
		<ImportFlow
			:is-active="isImportMode"
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
import { BoardExternalReferenceType } from "@/serverApi/v3";
import { buildPageTitle } from "@/utils/pageTitle";
import { notifySuccess } from "@data-app";
import { useRoomAuthorization, useRoomsState } from "@data-room";
import { RoomGrid, RoomsWelcomeInfo } from "@feature-room";
import { mdiPlus } from "@icons/material";
import { useTitle } from "@vueuse/core";
import { computed, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { rooms, fetchRooms, isLoading, isEmpty } = useRoomsState();
const { canCreateRoom } = useRoomAuthorization();

const pageTitle = computed(() => buildPageTitle(t("pages.rooms.title")));
useTitle(pageTitle);

const fabAction = computed(() => {
	if (!canCreateRoom.value) return;

	return {
		icon: mdiPlus,
		title: t("common.actions.create"),
		to: "/rooms/new",
		ariaLabel: t("pages.rooms.fab.title"),
		dataTestId: "fab-add-room",
	};
});

const isImportMode = ref(false);
const importToken = ref<string>();

watch(
	() => route.query.import,
	() => {
		if (route.query.import !== undefined) {
			isImportMode.value = true;
			importToken.value = route.query.import as string;
		} else {
			isImportMode.value = false;
			importToken.value = undefined;
		}
	},
	{ immediate: true }
);

onMounted(() => {
	fetchRooms();
});

const importFlowDestinations = computed(() =>
	rooms.value.filter((room) => !room.isLocked)
);

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
		isImportMode.value = false;
		importToken.value = undefined;
	}
};
</script>
