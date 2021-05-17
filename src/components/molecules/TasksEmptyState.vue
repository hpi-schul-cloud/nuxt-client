<template>
    <v-container class="v-container">
		<base-image
			:img-src="image"
			:img-height="imgHeight"
			fill="var(--color-primary)"
			role="presentation"
		/>
		<h2 class="h4 text-center mt-8">{{ title }}</h2>
		<h3 class="h4 text-center mt-3">{{ subtitle }}</h3>
    </v-container>
</template>

<script>
import tasksEmptyState from "@assets/img/empty-state/Task_Empty_State.svg";
import BaseImage from "@basecomponents/BaseImage";

export default {
	components: { BaseImage },
	layout: "defaultVuetify",
	props: {
		image: {
			type: String,
			default: () => tasksEmptyState,
		},
		title: {
			type: String,
			default: () => "",
		},
		subtitle: {
			type: String,
			default: () => "",
		},
	},
	data: () => ({
		imgHeight: "400px"
	}),
};
</script>

