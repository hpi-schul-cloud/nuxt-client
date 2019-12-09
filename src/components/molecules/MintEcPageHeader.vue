<template>
	<div class="wrapper">
		<div
			class="hero-image"
			:style="{
				'background-image': `url(${image} )`,
			}"
		>
			<div
				class="container"
				:style="{
					width: `100%`,
					float: `right`,
					'z-index': `var(--layer-dropdown)`,
				}"
			>
				<base-content-container :style="{ float: `left` }">
					<h1 class="heading">{{ heading }}</h1>
					<p class="teaser">{{ teaser }}</p>
				</base-content-container>
			</div>
		</div>
		<div class="overlay"> </div>
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

.wrapper {
	position: relative;
}

.hero-image {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 20rem;
	padding: var(--space-xs);
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;

	@include breakpoint(tablet) {
		height: 30rem;
		padding: var(--space-xl);
	}
}
.container {
	position: relative;
	z-index: var(--layer-fab);

	@include breakpoint(desktop) {
		padding-left: var(--space-xl);
	}
}

.heading {
	font-size: var(--heading-3);
	color: var(--color-white);

	@include breakpoint(tablet) {
		font-size: var(--heading-1);
	}
}

p {
	font-size: var(--text-md);
	color: var(--color-white);

	@include breakpoint(tablet) {
		font-size: var(--text-lg);
	}
}
.overlay {
	position: absolute;
	top: 0;
	z-index: var(--layer-page);
	width: 100%;
	height: 20rem;
	background-color: var(--color-overlay);

	@include breakpoint(tablet) {
		height: 30rem;
	}
}
</style>
