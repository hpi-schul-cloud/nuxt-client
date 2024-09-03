<template lang="">
	<div>
		<RoomColorPicker
			:selected-color="roomColor"
			@update:selected-color="onColorSelect($event)"
		/>
		Hallo
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RoomColorEnum } from "./RoomColorPicker/types";
import RoomColorPicker from "./RoomColorPicker/RoomColorPicker.vue";

const roomColor = ref(RoomColorEnum.BLUE_GREY);

const onColorSelect = (color: RoomColorEnum) => {
	console.log(color);
	roomColor.value = color;
};
</script>

<style lang=""></style>
