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
				><div class="description">{{ s.name }}</div>
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

.progressbar li {
	position: relative;
	float: left;
	text-align: center;
}

.description {
	font-size: small;
}

.progressbar li.active::after {
	background: #979797;
}
.progressbar li.active::before {
	color: white;
	background: #b1063a;
	border-color: #b1063a;
}
.progressbar li.done::before {
	color: white;
	background: #3aac5d;
	border-color: #3aac5d;
}
.progressbar li.done::after {
	color: white;
	background: #979797;
}

.progressbar li::before {
	display: block;
	width: 50px;
	height: 50px;
	margin: 0 auto 10px auto;
	font-weight: bold;
	line-height: 50px;
	color: white;
	text-align: center;
	content: counter(step);
	counter-increment: step;
	background: white;
	background: #4a4a4a;
	border: 2px solid #bebebe;
	border-color: #4a4a4a;
	border-radius: 50%;
}

.progressbar li::after {
	position: absolute;
	top: 25px;
	left: -50%;
	z-index: -1;
	width: 100%;
	height: 3px;
	content: "";
	background: #979797;
}

.progressbar li:first-child::after {
	content: none;
}
</style>
