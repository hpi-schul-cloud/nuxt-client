<template>
	<v-list-item
		:href="item.href"
		:to="item.to"
		active-color="primary"
		:data-testid="item.testId"
		height="var(--sidebar-item-height)"
	>
		<template #prepend>
			<v-icon :icon="item.icon" class="mr-n2"></v-icon>
		</template>
		<v-list-item-title v-if="!isTablet" class="text-uppercase">
			{{ $t(item.title) }}
		</v-list-item-title>
	</v-list-item>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { SidebarItem, SidebarCategoryItem } from "@/utils/sidebar-base-items";

const props = defineProps({
	item: {
		type: Object as PropType<SidebarItem | SidebarCategoryItem>,
	},
	isTablet: {
		type: Boolean,
	},
});

// eslint-disable-next-line vue/no-setup-props-reactivity-loss
console.log(props.item);
</script>
<style lang=""></style>
