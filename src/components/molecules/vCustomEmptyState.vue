<template>
	<v-container>
		<base-image
			:img-src="image"
			:img-height="imgHeight"
			fill="var(--color-primary)"
			role="presentation"
		/>
		<h2 class="h4 text-center mt-8">{{ title }}</h2>
		<h3 v-if="subtitle" class="h4 text-center mt-3">{{ subtitle }}</h3>
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
