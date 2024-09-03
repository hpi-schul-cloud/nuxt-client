<template>
	<DefaultWireframe max-width="short" :breadcrumbs="breadcrumbs">
		<template #header>
			<h1 class="text-h3 py-2 mb-4">Edit Room [TODO translation]</h1>
		</template>
		<RoomForm />
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { RoomForm } from "@feature-room";
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
</script>
