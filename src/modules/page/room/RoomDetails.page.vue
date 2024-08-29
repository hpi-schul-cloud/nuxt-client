<template>
	<DefaultWireframe max-width="short" :breadcrumbs="breadcrumbs">
		<template #header>
			<h1 class="text-h3 py-2 mb-4">Room Details [TODO translation]</h1>
		</template>
		<div>Hallo</div>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";

const breadcrumbs: Breadcrumb[] = [
	{
		title: "Räume",
		to: "/rooms/courses-overview",
	},
	{
		title: "<Raumtitel>",
		to: "/rooms/courses-overview",
		disabled: true,
	},
];
</script>
