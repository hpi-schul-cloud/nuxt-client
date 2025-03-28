<template>
	<v-list-group :value="item.title">
		<template #activator="{ props }">
			<v-list-item
				v-bind="props"
				color="primary"
				tabindex="0"
				:data-testid="item.testId"
			>
				<template #prepend>
					<v-icon :icon="item.icon" class="mr-2" />
				</template>
				<v-list-item-title :title="$t(item.title)">
					{{ $t(item.title) }}
				</v-list-item-title>
			</v-list-item>
		</template>
		<template v-for="child in item.children" :key="child.title">
			<SidebarItem :item="child" :draggable="false" />
		</template>
	</v-list-group>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { SidebarGroupItem } from "../types";
import SidebarItem from "./SidebarItem.vue";

defineProps({
	item: {
		type: Object as PropType<SidebarGroupItem>,
		required: true,
	},
});
</script>

<style scoped>
.v-icon {
	opacity: 1 !important;
}

:deep(.v-list-group__items .v-list-item) {
	padding-inline-start: 56px !important;
}
</style>
