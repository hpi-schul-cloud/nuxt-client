<template>
	<div class="container">
		<ul class="progressbar">
			<li
				v-for="(s, index) in steps"
				:key="index"
				:style="{ width: stepWidth }"
				:class="[
					index === currentStep ? 'active' : '',
					index < currentStep ? 'done' : '',
				]"
			>
				<span class="description">{{ s.name }} </span>
				<span v-if="index < currentStep">
					<svg
						width="17px"
						height="12px"
						viewBox="0 0 17 12"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
					>
						<g
							id="checkmark-out"
							stroke="none"
							stroke-width="1"
							fill="none"
							fill-rule="evenodd"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<g
								id="checkmark"
								transform="translate(-193.000000, -158.000000)"
								stroke="#1D1D20"
								stroke-width="2"
							>
								<polyline
									id="Path-2"
									points="194 163.510048 199.499439 168.512593 208.573524 158.971793"
								></polyline>
							</g>
						</g>
					</svg>
				</span>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	components: {},
	props: {
		steps: {
			type: Array,
			default: () => [
				{ name: "One" },
				{ name: "Two" },
				{ name: "Three" },
				{ name: "Four" },
				{ name: "Five" },
			],
			validator: function(value) {
				const isValid = value.length <= 7;
				if (!isValid) {
					console.error("You shoudn't use more than 7 steps.");
				}
				return isValid;
			},
		},
		currentStep: {
			type: Number,
			default: 0,
		},
	},
	computed: {
		stepWidth: function() {
			return 100 / this.steps.length + "%";
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.container {
	position: relative;
	width: 100%;
}

ul.progressbar {
	padding-inline-start: 0;
}

.progressbar {
	list-style: none;
	counter-reset: step;
}

.description {
	font-size: var(--text-sm);
}

.progressbar li {
	position: relative;
	float: left;
	text-align: center;
	&::before {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 50px;
		height: 50px;
		margin: 0 auto;
		margin-bottom: var(--space-xs);
		font-weight: var(--font-weight-bold);
		color: var(--color-black);
		content: counter(step);
		counter-increment: step;
		background: var(--color-white);
		border-color: var(--color-gray-dark);
		border-style: dotted;
		border-radius: var(--radius-round);
	}

	&::after {
		position: absolute;
		top: 25px;
		left: -50%;
		z-index: var(--layer-behind);
		width: 100%;
		height: calc(3 * var(--border-width));
		content: "";
		background: var(--color-gray);
	}
}
.progressbar li.active {
	&::after {
		background: var(--color-gray);
	}
	&::before {
		color: var(--color-dark-gray);
		text-decoration: underline;
		background: var(--color-white);
		border-color: var(--color-primary);
		border-style: solid;
	}
}
.progressbar li.done {
	&::before {
		color: var(--color-white);
		background: var(--color-success);
		border-color: var(--color-success);
		border-style: solid;
		border-radius: var(--radius-round);
	}
	&::after {
		color: var(--color-var(--color-white));
		background: var(--color-gray);
	}
}

.progressbar li:first-child::after {
	content: none;
}
</style>
