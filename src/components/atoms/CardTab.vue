<template>
	<div class="tab" :style="backgroundStyle">
		<div class="tab-label truncate"><slot /></div>
	</div>
</template>

<script>
export default {
	props: {
		backgroundStyle: {
			type: String,
			default: "background-color: #fff",
		},
	},
};
</script>
<style lang="scss" scoped>
@import "@styles";

.tab {
	position: absolute;
	width: 80%;
	height: 100%;
	border-top-right-radius: var(--radius-sm);
	transform: skewX(25deg);
	transform-origin: bottom left;

	&::before {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		content: "";
		background: var(--color-overlay);
		border-top-right-radius: var(--radius-sm);
	}

	.tab-label {
		display: inline-block;
		width: 100%;
		padding: var(--space-xs-2) var(--space-sm);
		font-family: var(--font-accent);
		font-size: var(--text-md);
		color: var(--color-white);
		transform: skewX(-25deg);
		transform-origin: bottom left;
	}
}
</style>
