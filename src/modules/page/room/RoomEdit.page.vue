<template>
	<DefaultWireframe max-width="short" :breadcrumbs="breadcrumbs">
		<template #header>
			<h1 class="text-h3 py-2 mb-4">Edit Room [TODO translation]</h1>
		</template>
		<div v-if="isLoading" />
		<RoomForm v-else :room="room" @update:room="onUpdateRoom($event)" />
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useRoute } from "vue-router";
import { useRoomDetailsState } from "@data-room";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { RoomForm } from "@feature-room";
import { Room } from "@/types/room/Room";
// import { useI18n } from "vue-i18n";

// const { t } = useI18n();

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

const breadcrumbs: Breadcrumb[] = [
	{
		title: "Räume",
		to: "/rooms/courses-overview",
	},
	{
		title: "<Raumtitel>",
		to: "/rooms/courses-overview",
	},
	{
		title: "Raum bearbeiten",
		to: "/rooms/courses-overview",
		disabled: true,
	},
];
</script>
