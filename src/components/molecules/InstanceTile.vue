<template>
	<div class="boxes">
		<div
			v-for="(window, index) in windows"
			:key="index"
			class="box"
			:class="isMobile ? 'box-mobile' : ''"
		>
			<base-link :href="window.url">
				<base-icon source="custom" :icon="window.icon" />
			</base-link>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		windows: {
			type: Array,
			default: Array,
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
.boxes {
	display: flex;
	flex-flow: row wrap;
	width: 360px;
}
.box {
	width: calc(3 * var(--topbar-height));
	height: calc(3 * var(--topbar-height));
	margin: calc(15 * var(--border-width));
}
.box-mobile {
	margin: calc(12 * var(--border-width));
}
.icon {
	width: 100% !important;
	height: 100% !important;
}
</style>
