<template>
	<v-menu
		v-if="menuItems.length"
		v-model="showMenu"
		bottom
		left
		offset-y
		attach
		:nudge-right="nudgeRight"
	>
		<template #activator="{ on, attrs }">
			<v-btn
				v-show="show"
				v-bind="attrs"
				class="three-dot-button"
				icon
				v-on="on"
				@keydown.space.stop
			>
				<v-icon>{{ mdiDotsVertical }}</v-icon>
			</v-btn>
		</template>
		<v-list v-if="menuItems.length">
			<v-list-item
				v-for="(item, i) in menuItems"
				:key="i"
				class="menu-action"
				:data-testid="item.dataTestId || ''"
				@click.stop="handleClick(item)"
			>
				<v-icon class="menu-action-icon">
					{{ item.icon }}
				</v-icon>
				<v-list-item-title class="pl-1">
					{{ item.name }}
				</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-menu>
</template>

<script>
import { mdiDotsVertical } from "@mdi/js";

export default {
	components: {},
	props: {
		menuItems: {
			type: Array,
			required: true,
		},
		show: {
			type: Boolean,
			required: true,
		},
		nudgeRight: {
			type: String,
			default: "0",
		},
	},
	data() {
		return {
			mdiDotsVertical,
			showMenu: false,
		};
	},
	methods: {
		handleClick(menuItem) {
			this.showMenu = false;
			menuItem.action();
		},
	},
};
</script>

<style lang="scss" scoped>
.menu-action {
	min-height: 32px !important;
	min-width: 12rem;
	text-align: left;
}

.menu-action-icon {
	width: 1.1rem;
	height: 1.1rem;
	margin: -3px 8px 0 0;
	font-size: var(--space-md);
	color: var(--v-grey-darken3);
}
</style>
