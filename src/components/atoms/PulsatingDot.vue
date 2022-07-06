<template>
	<div class="ring-container">
		<div class="ringring" :style="{ 'border-color': color }"></div>
		<div class="circle" :style="{ 'background-color': color }"></div>
	</div>
</template>

<script>
export default {
	props: {
		color: {
			type: String,
			default: "var(--color-danger)",
		},
	},
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@styles";

.ring-container {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 1em;
	height: 1em;
}

.circle {
	position: absolute;
	width: 0.5em;
	height: 0.5em;
	border-radius: var(--radius-round);
}

.ringring {
	align-self: center;
	width: 1em;
	height: 1em;
	border: 1px solid;
	border-radius: var(--radius-round);
	opacity: 0;
	animation: pulsate var(--duration-transition-slow) ease-out;
	animation-iteration-count: infinite;
}

@keyframes pulsate {
	0% {
		opacity: 0;
		transform: scale(0.1);
	}

	50% {
		opacity: 1;
	}

	100% {
		opacity: 0;
		transform: scale(1.1);
	}
}
</style>
