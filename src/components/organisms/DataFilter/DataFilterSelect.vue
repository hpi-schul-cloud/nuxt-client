<template>
	<div v-if="options.length > 0" v-outside-click="hideMenu" class="menu">
		<v-btn
			text
			color="secondary"
			data-testid="add_filter_button"
			@click="showMenu"
		>
			<v-icon class="filter-icon mr-2">$mdiTune</v-icon>
			<span class="filter-btn mr-2"> {{ labelAdd }} </span>
			<v-icon class="filter-icon">$mdiMenuDown</v-icon>
		</v-btn>
		<context-menu
			:show.sync="visible"
			anchor="top-left"
			:actions="contextOptions"
			@click="handleClick"
		/>
	</div>
</template>

<script>
import ContextMenu from "@/components/molecules/ContextMenu";
import { decode } from "html-entities";

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
				text: decode(option.title),
				event: "click",
				arguments: option.id,
				dataTestid: option.dataTestid,
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
	color: var(--v-secondary-base);
}

.filter-icon {
	font-size: var(--text-lg);
}

.button.is-medium.is-text {
	color: var(--v-secondary-base);
}
</style>
