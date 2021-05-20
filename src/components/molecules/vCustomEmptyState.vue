<template>
	<v-container>
		<base-image
			:img-src="image"
			:img-height="imgHeight"
			fill="var(--color-primary)"
			role="presentation"
		/>
		<h1 class="h4 text-center mt-8">{{ title }}</h1>
		<h2 v-if="subtitle" class="h4 text-center mt-3">{{ subtitle }}</h2>
    </v-container>
</template>

<script>
import BaseImage from "@basecomponents/BaseImage";

export default {
	components: { BaseImage },
	layout: "defaultVuetify",
	props: {
		image: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		subtitle: {
			type: String,
			required: false,
			default: () => "",
		},
	},
	data: () => ({
		imgHeight: "300px",
	}),
};
</script>
