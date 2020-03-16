<template>
	<div :style="currentPosition" class="fab">
		<icon-fab
			v-bind="$attrs"
			:expand-direction="expandDirection"
			:label-position="labelPosition"
			v-on="$listeners"
		/>
	</div>
</template>
<script>
import IconFab from "@components/molecules/IconFab";

export default {
	components: { IconFab },
	props: {
		position: {
			type: String,
			default: "bottom-right",
			validator: (value) =>
				["top-left", "bottom-left", "top-right", "bottom-right"].includes(
					value
				),
		},
	},
	computed: {
		labelPosition() {
			switch (this.position) {
				case "top-left":
				case "bottom-left":
					return "right";
				case "top-right":
				case "bottom-right":
				default:
					return "left";
			}
		},
		expandDirection() {
			switch (this.position) {
				case "top-left":
				case "top-right":
					return "bottom";
				case "bottom-right":
				case "bottom-left":
				default:
					return "top";
			}
		},
		currentPosition() {
			switch (this.position) {
				case "bottom-right":
					return {
						right: "5vw",
						bottom: "4vh",
					};
				case "bottom-left":
					return {
						left: "5vw",
						bottom: "4vh",
					};
				case "top-left":
					return {
						left: "5vw",
						top: "4vh",
					};
				case "top-right":
					return {
						right: "5vw",
						top: "4vh",
					};
				default:
					return {
						right: "5vw",
						bottom: "4vh",
					};
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
.fab {
	position: fixed;
	z-index: var(--layer-fab);
}
</style>
