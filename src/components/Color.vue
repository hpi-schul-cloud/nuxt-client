<template>
	<div class="flex">
		<div>
			<span v-if="color">Color: {{ color }}</span>
			<span v-else-if="borderThickness">Border: {{borderThickness}}px</span>
			<span v-else-if="borderColor"></span>
			<span v-else-if="shadow">Shadow: {{shadow}}px</span>
			<span v-else>
				Gradient:
				{{gradient1}}
				{{gradient2}}
			</span>
			<div
				v-if="state"
				:style="{...handleSquares,
			'border': `${borderThickness}px solid ${borderColor}`,
			'background-color': color,
			'box-shadow': `0px 2px ${shadow}px rgba(157, 157, 157, 0.9)`}"
				:class="{'state-value': state, 'border': border,}"
			></div>

			<div
				v-else
				:style="{
					...handleGradient,
					 }"
				:class="{'color-value': handleGradient, 'state-value': state, 'border': border}"
			></div>
		</div>
		<h5 v-if="title">{{ title }}</h5>
	</div>
</template>

<script>
export default {
	props: {
		color: {
			type: String,
		},
		gradient1: {
			type: String,
		},
		gradient2: {
			type: String,
		},
		title: {
			type: String,
		},
		state: {
			type: String,
		},
		borderColor: {
			type: String,
		},
		borderThickness: {
			type: Number,
		},
		shadow: {
			type: Number,
		},
	},
	data() {
		return {};
	},
	computed: {
		handleGradient() {
			return !this.gradient1 || !this.gradient2
				? { "background-color": this.color }
				: {
						"background-image":
							"linear-gradient(-225deg, " +
							this.gradient1 +
							" 0%, " +
							this.gradient2 +
							" 100%)",
				  };
		},

		handleSquares() {
			return this.state
				? { width: "50px", height: "50px" }
				: { width: "100px", height: "50px" };
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
.flex {
	display: flex;
	flex-direction: row;
	align-items: center;
}
.state-value {
	width: 50px;
	height: 50px;
	margin-bottom: var(--space-md);
}
</style>
 


