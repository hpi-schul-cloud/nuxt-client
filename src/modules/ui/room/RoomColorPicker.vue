<template>
	<div class="d-flex flex-wrap">
		<template v-for="color in RoomColorEnum" :key="color">
			<RoomColorPickerSwatch :color="color" />
		</template>
	</div>
</template>

<script setup lang="ts">
import RoomColorPickerSwatch from "@/modules/ui/room/RoomColorPickerSwatch.vue";
import { RoomColorEnum } from "./types";
</script>

<style lang=""></style>
