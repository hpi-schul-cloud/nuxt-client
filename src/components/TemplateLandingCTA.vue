<template>
	<div class="landing">
		<img class="landing-image" src="" />
		<h2 class="center medium-emphasis title">{{ title }}</h2>
		<h3 class="center medium-emphasis subtitle">{{ subtitle }}</h3>
		<div class="center">
			<BaseButton class="cta-button btn-primary btn-large">
				{{ ctaText }}
			</BaseButton>
		</div>
	</div>
</template>

<script>
import "../styles/base.scss";
import BaseButton from "./ui/BaseButton.vue";
export default {
	name: "LandingCTA",
	components: {
		BaseButton,
	},
	props: {
		subtitle: String,
		title: String,
		ctaText: String,
	},
	data() {
		return {};
	},
	methods: {
		onClick() {
			this.$emit("click");
		},
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
	margin-bottom: 30px;
}

.cta-button {
	margin-bottom: 30px;
}

.landing-image {
	display: block;
	width: 35%;
	margin-top: 30px;
	margin-right: auto;
	margin-bottom: 30px;
	margin-left: auto;
}

@media only screen and (max-width: 600px) {
	.cta-button {
		width: 90%;
	}
}
</style>
