<template>
	<div class="flex">
		<div>
			<span v-if="color">Color: {{ color }}</span>
			<span v-else-if="borderThickness">Border: {{ borderThickness }}px</span>
			<span v-else-if="borderColor"></span>
			<span v-else-if="blur">Elevation: ({{ x }}px {{ y }}px {{ blur }}px {{ spread }}px), ({{ xB }}px {{ xB }}px {{ blurB }}px {{ spreadC }}px), ({{ xC }}px {{ yC }}px {{ blurC }}px {{ spreadC }}px)</span>
			<span v-else>
				Gradient:
				{{ gradient1 }}
				{{ gradient2 }}
			</span>
			<div
				v-if="state"
				:style="{
					...handleSquares,
					border: `${borderThickness}px solid ${borderColor}`,
					'background-color': color,
					'box-shadow': `${x}px ${y}px ${blur}px ${spread}px rgba(0,0,0,0.14) , ${xB}px ${yB}px ${blurB}px ${spreadB}px rgba(0,0,0,0.12), ${xC}px ${yC}px ${blurC}px ${spreadC}px rgba(0,0,0,0.20)`
				}"
				:class="{ 'state-value': state, border: border }"
			></div>

			<div
				v-else
				:style="{
					...handleGradient,
				}"
				:class="{
					'color-value': handleGradient,
					'state-value': state,
					border: border,
				}"
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
			default: "",
		},
		gradient1: {
			type: String,
			default: "",
		},
		gradient2: {
			type: String,
			default: "",
		},
		title: {
			type: String,
			default: "",
		},
		state: {
			type: String,
			default: "",
		},
		borderColor: {
			type: String,
			default: "",
		},
		borderThickness: {
			type: Number,
			default: null,
		},
		blur: {
			type: Number,
			default: null,
		},
		x: {
			type: Number,
			default: null,
		},
		y: {
			type: Number,
			default: null,
		},
		spread: {
			type: Number,
			default: null,
		},
		blurB: {
			type: Number,
			default: null,
		},
		xB: {
			type: Number,
			default: null,
		},
		yB: {
			type: Number,
			default: null,
		},
		spreadB: {
			type: Number,
			default: null,
		},
		blurC: {
			type: Number,
			default: null,
		},
		xC: {
			type: Number,
			default: null,
		},
		yC: {
			type: Number,
			default: null,
		},
		spreadC: {
			type: Number,
			default: null,
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
							"linear-gradient(45deg, " +
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
