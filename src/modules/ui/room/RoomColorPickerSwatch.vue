<template>
	<div
		class="color-swatch rounded-circle elevation-3 ma-1"
		:class="`color-swatch--color-${color}`"
		:data-testid="`color-swatch-${color}`"
	/>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { RoomColorEnum } from "./types";

defineProps({
	color: {
		type: String as PropType<RoomColorEnum>,
		default: RoomColorEnum.BLUE_GREY,
	},
});
</script>

<style scoped>
.color-swatch {
	width: 32px;
	height: 32px;
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
