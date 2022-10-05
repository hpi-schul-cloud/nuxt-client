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
				:class="`menu-action menu-action-${item.name.split(' ').join('-')}`"
				:data-testid="item.dataTestId || ''"
				@click.stop="handleClick(item)"
			>
				<v-icon class="menu-action-icon mr-1">
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
	min-height: var(--space-lg);
	text-align: left;
}

.menu-action-icon {
	width: var(--space-md);
	height: var(--space-md);
	margin-top: calc(-0.5 + var(--space-base-vuetify));
	font-size: var(--space-md);
	color: var(--v-gray-darken1);
}
</style>
