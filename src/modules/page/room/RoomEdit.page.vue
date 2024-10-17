<template>
	<DefaultWireframe max-width="short" :breadcrumbs="breadcrumbs">
		<template #header>
			<h1 class="text-h3 mb-4">
				{{ $t("pages.roomDetails.ariaLabels.menu.action.edit") }}
			</h1>
		</template>
		<div v-if="isLoading" />
		<div v-else>
			<RoomForm :room="roomData" @save="onSave" @cancel="onCancel" />
		</div>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { RoomUpdateParams } from "@/types/room/Room";
import { buildPageTitle } from "@/utils/pageTitle";
import { useRoomEditState } from "@data-room";
import { RoomForm } from "@feature-room";
import { useTitle } from "@vueuse/core";
import { computed, ComputedRef, watch, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

const { t } = useI18n();

const route = useRoute();
const router = useRouter();
const { fetchRoom, isLoading, roomData, updateRoom } = useRoomEditState();

const pageTitle = computed(() =>
	buildPageTitle(`${t("pages.roomEdit.title")}`)
);
useTitle(pageTitle);

const initialRoomName = ref("");

watch(
	() => route.params.id,
	async () => {
		await fetchRoom(route.params.id as string);

		initialRoomName.value = roomData.value.name;
	},
	{ immediate: true }
);

const onSave = async (roomParams: RoomUpdateParams) => {
	await updateRoom(route.params.id as string, roomParams);
	router.push({
		name: "room-details",
		params: { id: route.params.id as string },
	});
};

const onCancel = () => {
	// TODO use useConfirmationDialog here, when it's refactored
	router.go(-1);
};

const breadcrumbs: ComputedRef<Breadcrumb[]> = computed(() => {
	if (roomData.value !== undefined) {
		return [
			{
				title: t("pages.rooms.title"),
				to: "/rooms",
			},
			{
				title: initialRoomName.value,
				to: `/rooms/${route.params.id}`,
			},
			{
				title: t("pages.roomDetails.ariaLabels.menu.action.edit"),
				disabled: true,
			},
		];
	}

	return [];
});
</script>
