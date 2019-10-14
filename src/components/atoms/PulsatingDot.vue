<template>
	<div class="ring-container">
		<div class="ringring"></div>
		<div class="circle"></div>
	</div>
</template>

<script>
export default {};
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
	background-color: var(--color-danger);
	border-radius: var(--radius-round);
}

.ringring {
	align-self: center;
	width: 1em;
	height: 1em;
	border: 1px solid var(--color-danger);
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
