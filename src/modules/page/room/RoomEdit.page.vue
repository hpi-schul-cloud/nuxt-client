<template>
	<DefaultWireframe max-width="short" :breadcrumbs="breadcrumbs">
		<template #header>
			<h1 class="text-h3 py-2 mb-4">
				{{ $t("pages.roomDetails.ariaLabels.menu.action.edit") }}
			</h1>
		</template>
		<div v-if="isLoading" />
		<RoomForm v-else :room="room" @update:room="onUpdateRoom($event)" />
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { computed, ComputedRef, watch } from "vue";
import { useRoute } from "vue-router";
import { useRoomDetailsState } from "@data-room";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { RoomForm } from "@feature-room";
import { Room } from "@/types/room/Room";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const route = useRoute();
const { fetchRoom, isLoading, room } = useRoomDetailsState();

watch(
	() => route.params.id,
	async () => {
		await fetchRoom(route.params.id as string);
	},
	{ immediate: true }
);

const onUpdateRoom = (room: Room) => {
	console.log(room);
};

const breadcrumbs: ComputedRef<Breadcrumb[]> = computed(() => {
	if (room.value !== undefined) {
		return [
			{
				title: t("pages.rooms.title"),
				to: "/rooms",
			},
			{
				title: room.value.title,
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
