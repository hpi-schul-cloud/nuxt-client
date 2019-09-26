<template>
	<div>
		<div>
			<h5 v-if="title">{{ title }}</h5>
		 <span>Gradient:	{{ colorStart }} => {{ colorEnd }}</span>
		 	<p v-if="variable">Variable: {{variable}}</p>
     	<div :style="{...handleGradient,}" :class="{'color-value': handleGradient,}"></div>
		</div>
	</div>
</template>

<script>
export default {
	props: {


		colorStart: {
			type: String,
			default: "",
		},
		colorEnd: {
			type: String,
			default: "",
		},
		title: {
			type: String,
			default: "",
		},

		variable: {
			type: String,
			default: "",
		}

	},

	computed: {
		handleGradient() {
			return !this.colorStart || !this.colorEnd
				? { "background-color": this.color }
				: {
						"background-image":
							"linear-gradient(45deg, " +
							this.colorStart +
							" 0%, " +
							this.colorEnd +
							" 100%)",
				  };
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
