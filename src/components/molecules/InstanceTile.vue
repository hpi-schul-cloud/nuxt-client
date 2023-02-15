<template>
	<base-link :href="tile.url">
		<component :is="instanceComponent" />
	</base-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	props: {
		tile: {
			type: Object,
			default: () => {
				return {
					icon: "",
					url: "",
				};
			},
		},
	},
	setup(props) {
		const instanceComponent = () =>
			import(`@/components/icons/custom/${props.tile.icon}`);
		return {
			instanceComponent,
		};
	},
});
</script>

<style lang="scss" scoped>
.icon {
	width: 100% !important;
	height: 100% !important;
}
</style>
