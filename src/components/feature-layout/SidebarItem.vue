<template>
	<v-list-item
		:href="item.href"
		:to="item.to"
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

<script setup lang="ts">
import { PropType } from "vue";
import { SidebarItemData } from "@/utils/sidebar-base-items";

defineProps({
	item: {
		type: Object as PropType<SidebarItemData>,
		required: true,
	},
});
</script>

<style lang="scss">
.v-icon {
	opacity: 1 !important;
}
</style>
