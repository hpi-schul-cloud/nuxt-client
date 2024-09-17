<template>
	<div>
		<VTextField v-model="roomData.title" label="Name des Raumes" class="mb-8" />
		<div class="mb-8">
			<RoomColorPicker v-model:selected-color="roomData.displayColor" />
		</div>
		<div class="mb-8">
			Zeitraum
			<div class="d-flex flex-fill">
				<DatePicker
					:date="roomData.startDate"
					class="flex-1-1 mr-4"
					@update:date="onUpdateStartDate"
				/>
				<DatePicker
					:date="roomData.endDate"
					class="flex-1-1 ml-4"
					@update:date="onUpdateEndDate"
				/>
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
import { computed, PropType, ref, watchEffect } from "vue";
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
	startDate: "",
	endDate: "",
});

watchEffect(() => {
	if (props.room) {
		roomData.value = props.room;
	}
});

const shortTitle = computed(() => {
	return roomData.value.title?.slice(0, 2);
});

const onUpdateStartDate = (newDate: string) => {
	roomData.value.startDate = newDate;
};

const onUpdateEndDate = (newDate: string) => {
	roomData.value.endDate = newDate;
};

const onSave = () => {
	roomData.value.shortTitle = shortTitle.value;
	console.log(roomData.value);
};
</script>

<style lang=""></style>
