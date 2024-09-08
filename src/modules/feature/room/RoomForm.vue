<template>
	<div>
		<VTextField v-model="roomData.title" label="Name des Raumes" class="mb-8" />
		<div class="mb-8">
			<RoomColorPicker v-model:selected-color="roomData.displayColor" />
		</div>
		<div class="mb-8">
			Zeitraum
			<div class="d-flex flex-fill">
				<DatePicker class="flex-1-1 mr-4" />
				<DatePicker class="flex-1-1 ml-4" />
			</div>
		</div>
		<div class="d-flex">
			<VSpacer />
			<VBtn variant="text" class="mr-4">{{ $t("common.actions.cancel") }}</VBtn>
			<VBtn variant="flat" color="primary" @click="onSave">
				{{ $t("common.actions.save") }}
			</VBtn>
		</div>
	</div>
</template>

<script setup lang="ts">
import { PropType, ref, watch, watchEffect } from "vue";
import { RoomColorEnum } from "./RoomColorPicker/types";
import RoomColorPicker from "./RoomColorPicker/RoomColorPicker.vue";
import { DatePicker } from "@ui-date-time-picker";
import { Room } from "@/types/room/Room";

const props = defineProps({
	room: {
		type: Object as PropType<Room | undefined>,
	},
});

const roomData = ref<Partial<Room>>({
	title: "",
	shortTitle: "",
	displayColor: RoomColorEnum.BLUE_GREY,
});

watchEffect(() => {
	if (props.room) {
		roomData.value = props.room;
	}

	console.log(roomData.value);
});

watch(roomData.value, () => {
	console.log("mmhhh", roomData.value);
});

const onSave = () => {
	console.log(roomData.value);
};
</script>

<style lang=""></style>
