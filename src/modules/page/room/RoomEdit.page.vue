<template>
	<DefaultWireframe max-width="short" :breadcrumbs="breadcrumbs">
		<template #header>
			<h1 class="text-h3 py-2 mb-4">
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
import { computed, ComputedRef, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useRoomDetailsStore, useRoomsState } from "@data-room";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { RoomForm } from "@feature-room";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { RoomUpdateParams } from "@/types/room/Room";
import { RoomColor } from "@/serverApi/v3";

const { t } = useI18n();

const route = useRoute();
const router = useRouter();
const roomDetailsStore = useRoomDetailsStore();
const { isLoading, room } = storeToRefs(roomDetailsStore);
const { fetchRoom } = roomDetailsStore;
const { updateRoom } = useRoomsState();

const roomData = ref<RoomUpdateParams>({
	name: "",
	color: RoomColor.BlueGrey,
});

watch(
	() => route.params.id,
	async () => {
		await fetchRoom(route.params.id as string);
		if (room.value) {
			roomData.value = {
				name: room.value.name,
				color: room.value.color,
				startDate: room.value.startDate,
				endDate: room.value.endDate,
			};
		} else {
			// handle error
		}
	},
	{ immediate: true }
);

const onSave = async (roomData: RoomUpdateParams) => {
	await updateRoom(room.value!.id, roomData);
	router.push({ name: "room-details", params: { id: room.value!.id } });
};

const onCancel = () => {
	// TODO use useConfirmationDialog here, when it's refactored
	router.go(-1);
};

const breadcrumbs: ComputedRef<Breadcrumb[]> = computed(() => {
	if (room.value !== undefined) {
		return [
			{
				title: t("pages.rooms.title"),
				to: "/rooms",
			},
			{
				title: room.value.name,
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
