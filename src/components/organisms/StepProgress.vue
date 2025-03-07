<template>
	<div class="wrapper">
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
				<span v-show="index < currentStep">
					<v-icon class="material-icon" :icon="mdiCheck" />
				</span>
			</li>
		</ul>
	</div>
</template>

<script>
import { mdiCheck } from "@icons/material";
import { Logger } from "@util-logger";

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
			validator: function (value) {
				const isValid = value.length <= 7;
				if (!isValid) {
					Logger.error("You shoudn't use more than 7 steps.");
				}
				return isValid;
			},
		},
		currentStep: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {
			mdiCheck,
		};
	},
	computed: {
		stepWidth: function () {
			return 100 / this.steps.length + "%";
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/styles/settings.scss";

.wrapper {
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
		content: counter(step);
		counter-increment: step;
		background: rgba(var(--v-theme-white));
		border-color: map-get($grey, darken-3);
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
		background: map-get($grey, base);
	}
}

.progressbar li.active {
	&::after {
		background: map-get($grey, base);
	}

	&::before {
		color: map-get($grey, base);
		text-decoration: underline;
		background: rgba(var(--v-theme-white));
		border-color: rgba(var(--v-theme-primary));
		border-style: solid;
	}
}

.progressbar li.done {
	&::before {
		color: rgba(var(--v-theme-white));
		background: rgba(var(--v-theme-success));
		border-color: rgba(var(--v-theme-success));
		border-style: solid;
		border-radius: var(--radius-round);
	}

	&::after {
		color: rgba(var(--v-theme-white));
		background: map-get($grey, base);
	}
}

.progressbar li:first-child::after {
	content: none;
}
</style>
