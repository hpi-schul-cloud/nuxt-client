<template>
	<div>
		<div>
			<h5 v-if="title">{{ title }}</h5>
			<p v-if="variable">Variable: {{ variable }}</p>
			<p v-if="styling">Style: {{ styling }}</p>
				<div class="state-value"
				:style="{
					...handleSquares,
					'box-shadow': `var(${variable})`}"
				></div>
		</div>

	</div>
</template>

<script>
export default {
	props: {
  variable: {
			type: String,
			default: "",
		},
	title: {
		type: String,
		default: "",
	},
	styling: {
		type: String,
		default: "",
	}
},


};
</script>

<style lang="scss" scoped>

.state-value {
	width: 50px;
	height: 50px;
	margin-bottom: var(--space-md);
}
</style>
