<template>
	<v-list-group>
		<template v-slot:activator="{ props }">
			<SidebarItem v-bind="props" :item="item" />
		</template>
		<template v-for="child in item.children" :key="child.title">
			<SidebarItem :item="child" />
		</template>
	</v-list-group>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { SidebarItemData } from "@/utils/sidebar-base-items";
import SidebarItem from "./SidebarItem.vue";

defineProps({
	item: {
		type: Object as PropType<SidebarItemData>,
		required: true,
	},
});
</script>

<style lang="scss">
$prepend-width: 20px;

.v-icon {
	opacity: 1 !important;
}

.v-list-group__items .v-list-item {
	padding-inline-start: 56px !important;
}
</style>
