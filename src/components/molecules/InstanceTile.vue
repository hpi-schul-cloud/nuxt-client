<template>
	<base-link :href="tile.url">
		<base-icon source="custom" :icon="tile.icon" />
	</base-link>
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
};
</script>

<style lang="scss" scoped>
@import "@styles";

.icon {
	width: 100% !important;
	height: 100% !important;
}
</style>
