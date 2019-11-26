<template>
	<div class="hero-image" :style="{ 'background-image': `url(${image})` }">
		<div class="container">
			<h1>{{ heading }}</h1>
			<h4>{{ teaser }}</h4>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		image: {
			type: String,
			default: undefined,
		},
		heading: {
			type: String,
			required: true,
		},
		teaser: {
			type: String,
			default: "",
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";

.hero-image {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 30rem;
	padding: var(--space-xl);
	-webkit-filter: grayscale(45%);
	-webkit-filter: opacity(0.8);
	filter: grayscale(45%);
	filter: opacity(0.8);
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
}

h1 {
	color: var(--color-white);
}
h4 {
	color: var(--color-white);
}
</style>
