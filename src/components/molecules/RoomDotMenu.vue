<template>
	<v-menu v-if="menuItems.length > 0" location="bottom end">
		<template v-slot:activator="{ props }">
			<v-btn
				v-bind="props"
				:icon="mdiDotsVertical"
				variant="text"
				density="comfortable"
				class="three-dot-button"
				data-testid="room-tool-three-dot-button"
				:aria-label="ariaLabel"
				@keydown.space.stop
			/>
		</template>
		<v-list role="menu">
			<v-list-item
				v-for="(item, i) in menuItems"
				:key="i"
				:data-testid="item.dataTestId || ''"
				@click="handleClick(item)"
				density="comfortable"
				class="dotmenu-action"
				role="menuitem"
			>
				<v-list-item-title>
					<v-icon :icon="item.icon" class="dotmenu-action-icon" />
					{{ item.name }}
				</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-menu>
</template>

<script setup>
import { mdiDotsVertical } from "@mdi/js";

defineProps({
	menuItems: {
		type: Array,
		required: true,
	},
	ariaLabel: {
		type: String,
		required: true,
	},
});

const handleClick = (menuItem) => {
	menuItem.action();
};
</script>

<style lang="scss" scoped>
// stylelint-disable sh-waqar/declaration-use-variable
.dotmenu-action {
	min-height: 25px !important;
}

.dotmenu-action-icon {
	width: 1rem;
	height: 1rem;
	margin-top: -2px;
	margin-right: 4px;
	font-size: 1rem;
}
</style>
