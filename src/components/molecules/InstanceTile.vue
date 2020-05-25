<template>
	<div class="box" :class="isMobile ? 'box-mobile' : ''">
		<base-card>
			<base-link :href="tile.url">
				<base-icon source="custom" :icon="tile.icon" />
			</base-link>
		</base-card>
	</div>
</template>

<script>
export default {
	props: {
		tile: {
			type: Object,
			default: Object,
		},
	},
	data() {
		return {};
	},
	computed: {
		isMobile() {
			return this.$mq === "mobile";
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
.box {
	width: calc(3 * var(--topbar-height));
	height: calc(3 * var(--topbar-height));
	margin: calc(15 * var(--border-width));
}
.card {
	height: calc(3 * var(--topbar-height));
}
.box-mobile {
	margin: calc(12 * var(--border-width));
}
.icon {
	width: 100% !important;
	height: 100% !important;
}

@media only screen and (max-width: 350px) {
	.box {
		width: calc(2.5 * var(--topbar-height));
		height: calc(2.5 * var(--topbar-height));
	}
	.card {
		height: calc(2.5 * var(--topbar-height));
	}
}
</style>
