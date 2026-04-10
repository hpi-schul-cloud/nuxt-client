<template>
	<KebabMenu v-if="menuItems.length > 0" v-bind.attr="$attrs" class="three-dot-button">
		<v-list-item
			v-for="(item, i) in menuItems"
			:key="i"
			:data-testid="item.dataTestId || ''"
			density="comfortable"
			class="dotmenu-action"
			role="menuitem"
			@click="onClick(item)"
		>
			<v-list-item-title>
				<v-icon :icon="item.icon" class="dotmenu-action-icon" />
				{{ item.name }}
			</v-list-item-title>
		</v-list-item>
	</KebabMenu>
</template>

<script setup lang="ts">
import { MenuItem } from "./types";
import { KebabMenu } from "@ui-kebab-menu";
import { PropType } from "vue";

defineOptions({
	inheritAttrs: false,
});

defineProps({
	menuItems: {
		type: Array as PropType<MenuItem[]>,
		required: true,
	},
});

const onClick = (menuItem: MenuItem) => {
	menuItem.action();
};
</script>

<style lang="scss" scoped>
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
