<template>
	<v-list-item
		:href="item.href"
		:to="item.to"
		:target="item.target"
		:rel="item.rel"
		color="primary"
		:density="density"
		tabindex="0"
		:active="isActive"
		:data-testid="item.testId"
	>
		<template #prepend>
			<v-icon v-if="hasIcon(item)" :icon="item.icon" class="mr-2" />
		</template>
		<v-list-item-title :title="$t(item.title)">
			{{ $t(item.title) }}
		</v-list-item-title>
	</v-list-item>
</template>

<script setup lang="ts">
import { SidebarSingleItem } from "../types";
import { useSidebarSelection } from "./SidebarSelection.composable";
import { computed, PropType } from "vue";

const props = defineProps({
	item: {
		type: Object as PropType<SidebarSingleItem>,
		required: true,
	},
});

const { isActive } = useSidebarSelection(() => props.item);

const density = computed(() => (props.item.icon ? "default" : "compact"));

const hasIcon = (item: SidebarSingleItem) => item.icon !== undefined && item.icon !== "";
</script>

<style scoped>
.v-icon {
	opacity: 1 !important;
}
</style>
