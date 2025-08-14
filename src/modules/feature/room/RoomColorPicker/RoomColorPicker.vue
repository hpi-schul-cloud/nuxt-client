<template>
	<label id="room-color-label" class="d-flex mb-2">
		{{ t("common.words.color") }}
	</label>
	<div
		class="d-flex flex-wrap"
		role="radiogroup"
		aria-labelledby="room-color-label"
	>
		<RoomColorPickerSwatch
			v-for="swatchColor in RoomColor"
			:key="swatchColor"
			:color="swatchColor"
			:is-selected="swatchColor === currentColor"
			@update:color="onUpdateColor(swatchColor)"
		/>
	</div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import RoomColorPickerSwatch from "./RoomColorPickerSwatch.vue";
import { RoomColor } from "@/types/room/Room";
import { useI18n } from "vue-i18n";

const currentColor = defineModel("color", {
	type: String as PropType<RoomColor>,
	default: RoomColor.BlueGrey,
});

const { t } = useI18n();

const onUpdateColor = (color: RoomColor) => {
	currentColor.value = color;
};
</script>
