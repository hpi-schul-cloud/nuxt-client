<template>
	<VBtn
		class="color-swatch rounded-circle elevation-3 ma-1 d-flex justify-center align-items-center cursor-pointer"
		:class="`room-color--${color}`"
		:data-testid="`color-swatch-${color}`"
		role="radio"
		:aria-label="`color-${color}`"
		@click="() => $emit('update:color', color)"
	>
		<VIcon v-if="isSelected" :icon="mdiCheckCircleOutline" color="white" />
	</VBtn>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { RoomColorEnum } from "./types";
import { mdiCheckCircleOutline } from "@icons/material";

defineProps({
	color: {
		type: String as PropType<RoomColorEnum>,
		default: RoomColorEnum.BLUE_GREY,
	},
	isSelected: {
		type: Boolean,
	},
});

defineEmits(["update:color"]);
</script>

<style scoped>
.color-swatch {
	width: 40px;
	min-width: 40px;
	height: 40px;
}
</style>
