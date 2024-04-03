<template>
	<v-list-group ref="fucker" :value="item.title">
		<template v-slot:activator="{ props }">
			<SidebarItem v-bind="props" :item="item" />
		</template>
		<template v-for="child in item.children" :key="child.title">
			<SidebarItem :item="child" type="child" />
		</template>
	</v-list-group>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { VListGroup } from "vuetify/components/VList";
import { CategoryData } from "@/utils/sidebar-base-items";
import SidebarItem from "./SidebarItem.vue";

defineProps({
	item: {
		type: Object as PropType<CategoryData>,
		required: true,
	},
});
</script>

<style lang="scss">
.v-icon {
	opacity: 1 !important;
}

.v-list-group__items .v-list-item {
	padding-inline-start: 56px !important;
}
</style>
