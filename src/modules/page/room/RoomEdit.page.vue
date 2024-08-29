<template>
	<DefaultWireframe max-width="short" :breadcrumbs="breadcrumbs">
		<template #header>
			<h1 class="text-h3 py-2 mb-4">Edit Room [TODO translation]</h1>
		</template>

		<div>
			<RoomColorPicker
				:selected-color="roomColor"
				@update:selected-color="onColorSelect($event)"
			/>
			Hallo
		</div>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import RoomColorPicker from "@/modules/ui/room/RoomColorPicker.vue";
import { RoomColorEnum } from "@/modules/ui/room/types";
// import { useI18n } from "vue-i18n";

// const { t } = useI18n();

const breadcrumbs: Breadcrumb[] = [
	{
		title: "Räume",
		to: "/rooms/courses-overview",
	},
	{
		title: "<Raumtitel>",
		to: "/rooms/courses-overview",
	},
	{
		title: "Raum bearbeiten",
		to: "/rooms/courses-overview",
		disabled: true,
	},
];

const roomColor = ref(RoomColorEnum.BLUE_GREY);

const onColorSelect = (color: RoomColorEnum) => {
	console.log(color);
	roomColor.value = color;
};
</script>
