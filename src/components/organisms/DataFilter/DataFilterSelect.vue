<template>
	<div
		v-if="options.length > 0"
		v-on-clickout="() => (visible = false)"
		class="menu"
	>
		<base-button design="text" @click="visible = true">
			<base-icon
				source="custom"
				icon="filter"
				style="font-size: var(--text-lg);"
			/>
			{{ labelAdd }}
			<base-icon
				source="material"
				icon="arrow_drop_down"
				style="font-size: var(--text-lg);"
			/>
		</base-button>
		<context-menu
			:show.sync="visible"
			anchor="top-left"
			:actions="contextOptions"
			@click="handleClick"
		/>
	</div>
</template>

<script>
import { directive as onClickout } from "vue-clickout";
import ContextMenu from "@components/molecules/ContextMenu";

export default {
	components: {
		ContextMenu,
	},
	directives: {
		onClickout: onClickout,
	},
	props: {
		labelAdd: {
			type: String,
			default: "Add +",
		},
		options: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			visible: false,
		};
	},
	computed: {
		contextOptions() {
			return this.options.map((option) => ({
				text: option.title,
				event: "click",
				arguments: option.id,
			}));
		},
	},
	methods: {
		handleClick(optionId) {
			this.visible = false;
			this.$emit("openFilter", optionId);
		},
	},
};
</script>

<style lang="scss" scoped>
.menu {
	position: relative;
}
</style>
