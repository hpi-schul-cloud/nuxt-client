<template>
	<div class="container">
		<span class="percent">{{ percent }}%</span>
		<svg
			class="progress-circle"
			viewBox="0 0 106 106"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
		>
			<g
				id="Page-1"
				stroke="none"
				stroke-width="1"
				fill="none"
				fill-rule="evenodd"
			>
				<g id="ProgressBar" transform="translate(-17.000000, -17.000000)">
					<circle id="oval" cx="70" cy="70" r="50"></circle>
					<path
						id="oval-copy"
						class="path"
						:stroke-dasharray="circle"
						d="M70,120 C97.6142375,120 120,97.6142375 120,70 C120,42.3857625 97.6142375,20 70,20 C42.3857625,20 20,42.3857625 20,70 C20,97.6142375 42.3857625,120 70,120 Z"
						fill-rule="nonzero"
						transform="translate(70.000000, 70.000000) rotate(-125.000000) translate(-70.000000, -70.000000) "
					></path>
				</g>
			</g>
		</svg>
	</div>
</template>
<script>
export default {
	props: {
		percent: {
			type: Number,
			default: 0,
			isComplete: false,
		},
	},
	computed: {
		circle() {
			return (this.percent / 100) * 100 * Math.PI + ",9999";
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

$color-done: var(--color-primary);
$color-todo: var(--color-gray);
$color-complete: var(--color-success);

#oval {
	fill-rule: nonzero;
	stroke: $color-todo;
	stroke-width: 5;
}

#oval-copy {
	stroke: $color-done;
	stroke-width: 5;
}

.progress-circle {
	width: 100%;
	max-width: 70px;
	max-height: 70px;
	color: $color-todo;
	transform: scaleX(-1) rotate(-55deg);
}

.percent {
	position: absolute;
	top: 50%;
	left: 50%;
	font-size: var(--text-lg);
	transform: translate(-50%, -50%);
}

.container {
	position: relative;
	display: inline-block;
}

.path {
	transition: 0.5s ease-in-out all;
}
</style>
