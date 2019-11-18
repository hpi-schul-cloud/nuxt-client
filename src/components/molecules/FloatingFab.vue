<template>
	<div :style="[pos]" class="fab">
		<base-button design="hero-cta icon" v-on="$listeners">
			<base-icon source="material" :icon="icon" />
		</base-button>
	</div>
</template>
<script>
export default {
	props: {
		fabActions: {
			type: Array,
			default: () => [],
		},
		icon: {
			type: String,
			default: "add",
		},
		position: {
			type: String,
			default: "bottom-right",
		},
	},
	data() {
		return {
			pos: {},
		};
	},
	created() {
		this.setPosition();
	},
	methods: {
		setPosition() {
			this.pos = {};
			switch (this.position) {
				case "bottom-right":
					this.pos.right = "5vw";
					this.pos.bottom = "4vh";
					break;
				case "bottom-left":
					this.pos.left = "5vw";
					this.pos.bottom = "4vh";
					break;
				case "top-left":
					this.pos.left = "5vw";
					this.pos.top = "4vh";
					break;
				case "top-right":
					this.pos.right = "5vw";
					this.pos.top = "4vh";
					break;
				default:
					this.pos.right = "5vw";
					this.pos.bottom = "4vh";
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
.fab {
	position: fixed;
	right: 5vw;
	bottom: 4vh;
	z-index: var(--layer-fab);
	cursor: pointer;
}
</style>
