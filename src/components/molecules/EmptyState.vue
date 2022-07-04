<template>
	<div class="base">
		<div class="wrapper">
			<div class="img-container">
				<base-image
					:img-src="image"
					:img-alt="alt"
					:img-height="imageHeight"
					role="presentation"
				/>
			</div>
			<h2 v-if="title" class="h4 title">{{ title }}</h2>
			<div class="description">
				<slot name="description" />
			</div>
		</div>
	</div>
</template>
<script>
import BaseImage from "@basecomponents/BaseImage";
export default {
	components: { BaseImage },
	props: {
		title: {
			type: String,
			default: "",
		},
		image: {
			type: String,
			default: "img/empty-state/emptystate-graph.svg",
		},
		imageHeight: {
			type: String,
			default: "200px",
		},
		alt: {
			type: String,
			default: "",
		},
	},
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.img-container {
	text-align: center;
}

.base {
	display: flex;
	justify-content: center;
}

.wrapper {
	width: calc(2 * var(--size-content-width-min));
}

.title {
	margin-bottom: var(--space-xl-3);
	text-align: center;
}

.description {
	margin-top: var(--space-md);
	font-size: var(--text-sm);
	color: var(--color-secondary-light);
	text-align: center;
}
</style>
