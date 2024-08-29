<template>
	<VBtn
		class="color-swatch rounded-circle elevation-3 ma-1 d-flex justify-center align-items-center cursor-pointer"
		:class="`color-swatch--color-${color}`"
		:data-testid="`color-swatch-${color}`"
		@click="() => $emit('update:color', color)"
	>
		<VIcon v-if="isSelected" :icon="mdiCheckCircleOutline" color="white" />
	</VBtn>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { RoomColorEnum } from "./types";
import { mdiCheckCircleOutline } from "@/components/icons/material";

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

.color-swatch--color-blue-grey {
	background-color: #455b6a;
}

.color-swatch--color-pink {
	background-color: #ec407a;
}

.color-swatch--color-red {
	background-color: #d50000;
}

.color-swatch--color-orange {
	background-color: #ef6c00;
}

.color-swatch--color-olive {
	background-color: #827717;
}

.color-swatch--color-green {
	background-color: #689f38;
}

.color-swatch--color-turquoise {
	background-color: #009688;
}

.color-swatch--color-light-blue {
	background-color: #0091ea;
}

.color-swatch--color-blue {
	background-color: #304ffe;
}

.color-swatch--color-magenta {
	background-color: #d500f9;
}

.color-swatch--color-purple {
	background-color: #9c27b0;
}

.color-swatch--color-brown {
	background-color: #795548;
}
</style>
