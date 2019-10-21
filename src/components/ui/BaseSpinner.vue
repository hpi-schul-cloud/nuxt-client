
<template>
	<svg
		class="spinner"
		:height="diameter"
		:width="diameter"
		viewBox="0 0 30 30"
		xmlns="http://www.w3.org/2000/svg"
		:tabindex="-1"
		role="img"
		:aria-label="label"
	>
		<circle
			class="circle"
			:stroke="color"
			:stroke-width="strokeWidth"
			fill="none"
			:r="14"
			:cx="15"
			:cy="15"
		/>
	</svg>
</template>

<script>
export default {
	props: {
		label: {
			type: String,
			default: 'Loading',
		},
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
	data: function() {
		return {
			sizeToDiameter: {
				small: 15,
				medium: 30,
				large: 60,
				xlarge: 120,
			},
			sizeToStrokeWidth: {
				small: 2,
				medium: 1,
				large: 0.5,
				xlarge: 0.25,
			},
		};
	},
	computed: {
		diameter () {
			return this.sizeToDiameter[this.size];
		},
		strokeWidth () {
			return this.sizeToStrokeWidth[this.size];
		},
	}
}
</script>

<style lang="scss" scoped>
@import '@styles';

.spinner {
	--spinner-circumference: 88;
	--spinner-quarter-circumference: 22;
	--spinner-duration: 1.4s;

	animation: rotate var(--spinner-duration) linear infinite;

	.circle {
		stroke-dasharray: var(--spinner-circumference);
		stroke-dashoffset: 0;
		stroke-linecap: round;
		transform-origin: center;
		animation: move-dash var(--spinner-duration) ease-in-out infinite;
	}

	@keyframes rotate {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(270deg); }
	}

	@keyframes move-dash {
		0% { stroke-dashoffset: var(--spinner-circumference); }
		50% {
			stroke-dashoffset: var(--spinner-quarter-circumference);
			transform:rotate(135deg);
		}
		100% {
			stroke-dashoffset: var(--spinner-circumference);
			transform:rotate(450deg);
		}
	}
}
</style>
