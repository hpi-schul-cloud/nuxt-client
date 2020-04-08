<template>
	<div v-if="options.length > 0" v-click-outside="hideMenu" class="menu">
		<base-button design="text" @click="showMenu">
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
import ContextMenu from "@components/molecules/ContextMenu";
import { XmlEntities } from "html-entities";
const entities = new XmlEntities();

export default {
	components: {
		ContextMenu,
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
				text: entities.decode(option.title),
				event: "click",
				arguments: option.id,
			}));
		},
	},
	methods: {
		showMenu() {
			this.visible = true;
		},
		hideMenu() {
			this.visible = false;
		},
		handleClick(optionId) {
			this.hideMenu();
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
