<template>
	<label id="room-color-label" class="d-flex mb-2">Farbe</label>
	<div
		class="d-flex flex-wrap"
		role="radiogroup"
		aria-labelledby="room-color-label"
	>
		<template v-for="color in RoomColorEnum" :key="color">
			<RoomColorPickerSwatch
				:color="color"
				:is-selected="isSelected(color)"
				@update:color="onUpdateColor($event)"
			/>
		</template>
	</div>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import { PropType } from "vue";
import RoomColorPickerSwatch from "./RoomColorPickerSwatch.vue";
import { RoomColorEnum } from "./types";

const props = defineProps({
	selectedColor: {
		type: String as PropType<RoomColorEnum>,
		default: RoomColorEnum.BLUE_GREY,
	},
});

const emit = defineEmits(["update:selectedColor"]);

const currentColor = useVModel(props, "selectedColor", emit);

const isSelected = (color: RoomColorEnum) => {
	return color === currentColor.value;
};

const onUpdateColor = (color: RoomColorEnum) => {
	currentColor.value = color;
	emit("update:selectedColor", color);
};
</script>
