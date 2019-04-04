<template>
	<div class="ring-container">
		<div class="ringring"></div>
		<div class="circle"></div>
	</div>
</template>

<script>
export default {
	name: "PulsatingDot",
	components: {},
	props: {},
	computed: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@variables";

.ring-container {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 25px;
	height: 25px;
}

.circle {
	position: absolute;
	width: 9px;
	height: 9px;
	background-color: #d00;
	border-radius: 50%;
}

.ringring {
	align-self: center;
	width: 15px;
	height: 15px;
	border: 1px solid #d00;
	border-radius: 30px;
	opacity: 0;
	animation: pulsate $duration-animation-slow ease-out;
	animation-iteration-count: infinite;
}

@keyframes pulsate {
	0% {
		opacity: 0;
		transform: scale(0.1, 0.1);
	}
	50% {
		opacity: 1;
	}
	100% {
		opacity: 0;
		transform: scale(1.2, 1.2);
	}
}
</style>
