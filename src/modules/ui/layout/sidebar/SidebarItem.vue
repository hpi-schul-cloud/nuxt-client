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
import { computed, toRef, PropType } from "vue";
import { SidebarSingleItem } from "../types";
import { useRoute } from "vue-router";

const props = defineProps({
	item: {
		type: Object as PropType<SidebarSingleItem>,
		required: true,
	},
});

const route = useRoute();

const isActive = computed(() => {
	const sidebarItem = toRef(props.item);

	const anyCoursePageIsActive =
		route.path.includes("room") && sidebarItem.value.to === "/rooms-overview";

	if (anyCoursePageIsActive) {
		return true;
	}

	return (
		route.path.includes(sidebarItem.value.to as string) ||
		route.path.includes(sidebarItem.value.href as string)
	);
});

const density = (props.item as SidebarSingleItem).icon ? "default" : "compact";

const hasIcon = (item: SidebarSingleItem) => {
	return item.icon !== undefined && item.icon !== "";
};
</script>

<style scoped>
.v-icon {
	opacity: 1 !important;
}
</style>
