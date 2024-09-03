<template>
	<div>
		<VTextField v-model="roomTitle" label="Name des Raumes" class="mb-8" />
		<div class="mb-8">
			Farbe
			<RoomColorPicker
				:selected-color="roomColor"
				@update:selected-color="onColorSelect($event)"
			/>
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
			<VBtn variant="flat" color="primary">
				{{ $t("common.actions.save") }}
			</VBtn>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RoomColorEnum } from "./RoomColorPicker/types";
import RoomColorPicker from "./RoomColorPicker/RoomColorPicker.vue";
import { DatePicker } from "@ui-date-time-picker";

const roomTitle = ref("");
const roomColor = ref(RoomColorEnum.BLUE_GREY);

const onColorSelect = (color: RoomColorEnum) => {
	console.log(color);
	roomColor.value = color;
};
</script>

<style lang=""></style>
