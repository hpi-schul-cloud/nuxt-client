<template>
	<div class="wrapper">
		<div class="hero-image" :style="compressed">
			<div
				class="container"
				:style="{
					width: `100%`,
					float: `right`,
					'z-index': `var(--layer-dropdown)`,
				}"
			>
				<base-content-container :style="{ float: `left` }">
					<h3 class="custom-heading-style">{{ heading }}</h3>
					<p class="teaser">{{ teaser }}</p>
				</base-content-container>
			</div>
		</div>
		<div class="overlay"></div>
	</div>
</template>

<script>
export default {
	props: {
		image: {
			type: String,
			default: "",
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

	computed: {
		compressed() {
			return (
				"background-image: url(" +
				this.image.replace("/images/", "/images/size/w2000/") +
				");"
			);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

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
	}
}
.container {
	position: relative;
	z-index: var(--layer-fab);

	@include breakpoint(desktop) {
		padding-left: var(--space-xl);
	}
}

.custom-heading-style {
	color: var(--color-white);
}

p {
	font-size: var(--text-md);
	color: var(--color-white);
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
