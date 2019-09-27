<template>
	<div>
		<div>
			<h5 v-if="title">{{ title }}</h5>
			<span v-if="color" class="color-value"
				>Color: {{ color }} <br />
				Variable: {{ variable }}
			</span>
			<div class="color-value" :style="{ backgroundColor: color }"></div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		color: {
			type: String,
			default: "",
		},
		variable: {
			type: String,
			default: "",
		},
	},
};
</script>
<style lang="scss" scoped>
.color-value {
	width: 100px;
	height: 30px;
	margin-bottom: var(--space-md);
}
</style>
