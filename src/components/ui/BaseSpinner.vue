
<template>
	<svg
		class="spinner"
		height="120"
		width="120"
	>
		<circle
			ref="circle"
			class="progress-ring__circle"
			stroke="var(--color-tertiary)"
			stroke-width="1"
			fill="none"
			r="52"
			cx="60"
			cy="60"
		/>

	</svg>
</template>
<script>
export default {
	props: {
		color: {
			type: String,
			default: 'var(--color-tertiary)',
		},
		size: {
			type: String,
			default: 'medium',
			validator(value) {
				return ['small', 'medium', 'large', 'xlarge'].includes(value);
			},
		},
	},
}
</script>

<style lang="scss" scoped>
@import '@styles';

.progress-ring__circle {
	stroke-dasharray: 330;
	stroke-dashoffset: -200;
	transform: rotate(-90deg);
	transform-origin: 50% 50%;
	animation: spin 2s linear infinite;
}

@keyframes spin {
  0%   {
	  stroke-dashoffset: 330;
	}
  50% {
	  stroke-dashoffset: 0;
  }
  100% {
	  stroke-dashoffset: -330;
  }
}

.loader {
	width: 120px;
	height: 120px;
	border: 10px solid transparent;
	border-top: 10px solid #3498db;
	border-radius: var(--radius-round);
	animation: spin 1s ease-in-out infinite;
}

</style>
