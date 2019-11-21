<template>
	<div class="landing">
		<img class="landing-image" src="" />
		<h2 class="center medium-emphasis title">{{ title }}</h2>
		<h3 class="h4 center medium-emphasis subtitle">{{ subtitle }}</h3>
		<div class="center">
			<base-button design="hero-cta" size="large">
				{{ ctaText }}
			</base-button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		subtitle: { type: String, required: true },
		title: { type: String, required: true },
		ctaText: { type: String, required: true },
	},
};
</script>

<style scoped>
.center {
	display: flex;
	justify-content: center;
}

.title {
	margin-bottom: 0;
}

.subtitle {
	margin-bottom: var(--space-lg);
}

.cta-button {
	margin-bottom: var(--space-lg);
}

.landing-image {
	display: block;
	width: 35%;
	margin-top: var(--space-lg);
	margin-right: auto;
	margin-bottom: var(--space-lg);
	margin-left: auto;
}

@media only screen and (max-width: 600px) {
	.cta-button {
		width: 90%;
	}
}
</style>
