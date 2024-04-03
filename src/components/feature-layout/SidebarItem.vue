<template>
	<v-list-item
		:href="(item as ItemData).href"
		:to="(item as ItemData).to"
		color="primary"
		base-color="secondary"
		:data-testid="item.testId"
		height="var(--sidebar-item-height-2)"
	>
		<template #prepend v-if="hasIcon(item)">
			<v-icon :icon="(item as ItemData).icon" class="mr-2" />
		</template>
		<v-list-item-title>
			{{ $t(item.title) }}
		</v-list-item-title>
	</v-list-item>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { ItemData, CategoryData, ChildData } from "@/utils/sidebar-base-items";

defineProps({
	item: {
		type: Object as PropType<ItemData | CategoryData | ChildData>,
		required: true,
	},
	type: {
		type: String as PropType<"child" | "category" | "simple">,
		default: "simple",
	},
});

const hasIcon = (item: ItemData | CategoryData | ChildData) => {
	return (
		(item as ItemData).icon !== undefined ||
		(item as CategoryData).icon !== undefined
	);
};
</script>

<style lang="scss">
.v-icon {
	opacity: 1 !important;
}
</style>
