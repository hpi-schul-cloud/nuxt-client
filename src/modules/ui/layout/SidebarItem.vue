<template>
	<v-list-item
		:href="item.href"
		:to="item.to"
		:target="item.target"
		:rel="item.rel"
		color="primary"
		base-color="secondary"
		:density="density"
		tabindex="0"
		:data-testid="item.testId"
	>
		<template #prepend>
			<v-icon v-if="hasIcon(item)" :icon="item.icon" class="mr-2" />
		</template>
		<v-list-item-title>
			{{ $t(item.title) }}
		</v-list-item-title>
	</v-list-item>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { SidebarSingleItem } from "./types";

const props = defineProps({
	item: {
		type: Object as PropType<SidebarSingleItem>,
		required: true,
	},
});

const density = (props.item as SidebarSingleItem).icon ? "default" : "compact";

const hasIcon = (item: SidebarSingleItem) => {
	return item.icon !== undefined && item.icon !== "";
};
</script>

<style lang="scss" scoped>
.v-icon {
	opacity: 1 !important;
}
</style>
