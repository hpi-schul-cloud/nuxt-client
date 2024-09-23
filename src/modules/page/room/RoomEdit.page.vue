<template>
	<DefaultWireframe max-width="short" :breadcrumbs="breadcrumbs">
		<template #header>
			<h1 class="text-h3 py-2 mb-4">
				{{ $t("pages.roomDetails.ariaLabels.menu.action.edit") }}
			</h1>
		</template>
		<div v-if="isLoading" />
		<div v-else>
			<RoomForm
				:room="roomData"
				@update:color="onUpdateColor($event)"
				@update:name="onUpdateName($event)"
				@update:startDate="onUpdateStartDate($event)"
				@update:endDate="onUpdateEndDate($event)"
			/>
			<div class="d-flex">
				<VSpacer />
				<VBtn variant="text" class="mr-4" @click="onCancel">
					{{ $t("common.actions.cancel") }}
				</VBtn>
				<VBtn variant="flat" color="primary" @click="onSave">
					{{ $t("common.actions.save") }}
				</VBtn>
			</div>
		</div>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { computed, ComputedRef, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useRoomDetailsStore } from "@data-room";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { RoomForm } from "@feature-room";
// import { Room } from "@/types/room/Room";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { RoomColor } from "@/serverApi/v3";

const { t } = useI18n();

const route = useRoute();
const router = useRouter();
const roomDetailsStore = useRoomDetailsStore();
const { isLoading, room } = storeToRefs(roomDetailsStore);
const { fetchRoom } = roomDetailsStore;

watch(
	() => route.params.id,
	async () => {
		await fetchRoom(route.params.id as string);
	},
	{ immediate: true }
);

const roomData = ref({
	id: "",
	name: "",
	color: RoomColor.BlueGrey,
	startDate: "",
	endDate: "",
});

const onSave = async () => {
	// await roomApi.roomControllerPatchRoom(roomData.value.id, roomData.value);
};

const onCancel = () => {
	// TODO use useConfirmationDialog here, when it's refactored
	router.go(-1);
};

const onUpdateColor = (color: RoomColor) => {
	roomData.value.color = color;
};

const onUpdateName = (name: string) => {
	roomData.value.name = name;
};

const onUpdateStartDate = (startDate: string) => {
	roomData.value.startDate = startDate;
};

const onUpdateEndDate = (endDate: string) => {
	roomData.value.endDate = endDate;
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
