<template>
	<div class="base">
		<div class="container">
			<div class="img-container">
				<img
					:src="image"
					role="presentation"
					:alt="imageAlt"
					class="image"
					:style="{ maxHeight: imageHeight }"
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
export default {
	props: {
		title: {
			type: String,
			required: false,
			default: "",
		},
		image: {
			type: String,
			required: false,
			default: "@assets/img/empty-state/emptystate-graph.svg",
		},
		imageAlt: {
			type: String,
			required: false,
			default: "",
		},
		imageHeight: {
			type: String,
			required: false,
			default: "200px",
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

.base {
	display: flex;
	justify-content: center;
}

.container {
	width: 60ch;
}

.img-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.title {
	margin-bottom: var(--space-xl-3);
	text-align: center;
}

.description {
	margin-top: var(--space-md);
	font-size: var(--text-sm);
	color: var(--color-tertiary-light);
	text-align: center;
}
</style>
