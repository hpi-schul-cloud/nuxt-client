<template>
	<v-container>
		<base-image
			:img-src="image"
			:img-height="imgHeight"
			fill="var(--color-primary)"
			role="presentation"
			class="text-center"
		/>
		<h1 class="h4 text-center mt-8" data-testid="emptyTaskMessage">
			{{ title }}
		</h1>
		<h2 v-if="subtitle" class="h4 text-center mt-3">{{ subtitle }}</h2>
	</v-container>
</template>

<script>
import BaseImage from "@basecomponents/BaseImage";

export default {
	components: { BaseImage },
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
		imgHeight: {
			type: String,
			required: false,
			default: () => "300px",
		},
	},
};
</script>
