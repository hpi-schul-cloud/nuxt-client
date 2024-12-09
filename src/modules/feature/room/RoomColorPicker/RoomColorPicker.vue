<template>
	<label id="room-color-label" class="d-flex mb-2">{{ $t(label) }}</label>
	<div
		class="d-flex flex-wrap"
		role="radiogroup"
		aria-labelledby="room-color-label"
	>
		<template v-for="swatchColor in RoomColorEnum" :key="swatchColor">
			<RoomColorPickerSwatch
				:color="swatchColor"
				:is-selected="isSelected(swatchColor)"
				@update:color="onUpdateColor($event)"
			/>
		</template>
	</div>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import { PropType } from "vue";
import RoomColorPickerSwatch from "./RoomColorPickerSwatch.vue";
import { RoomColorEnum } from "@/types/room/Room";

const props = defineProps({
	color: {
		type: String as PropType<RoomColorEnum>,
		default: RoomColorEnum.BlueGrey,
	},
	label: {
		type: String,
		default: "common.words.color",
	},
});

const emit = defineEmits(["update:color"]);

const currentColor = useVModel(props, "color", emit);

const isSelected = (color: RoomColorEnum) => {
	return color === currentColor.value;
};

const onUpdateColor = (color: RoomColorEnum) => {
	emit("update:color", color);
};
</script>
