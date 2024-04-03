<template>
	<v-list-group ref="fucker" :value="item.title">
		<template v-slot:activator="{ props }">
			<v-list-item
				v-bind="props"
				color="primary"
				base-color="secondary"
				:data-testid="item.testId"
				height="var(--sidebar-item-height-2)"
			>
				<template #prepend>
					<v-icon :icon="item.icon" class="mr-2" />
				</template>
				<v-list-item-title>
					{{ $t(item.title) }}
				</v-list-item-title>
			</v-list-item>
		</template>
		<template v-for="child in item.children" :key="child.title">
			<SidebarItem :item="child" />
		</template>
	</v-list-group>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { CategoryData } from "./types";
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
