<template>
	<v-list-item
		:href="item.href"
		:to="item.to"
		color="primary"
		base-color="secondary"
		:density="density"
		:data-testid="item.testId"
	>
		<template #prepend>
			<v-icon
				v-if="(item as SidebarSingleItem).icon"
				:icon="(item as SidebarSingleItem).icon"
				class="mr-2"
			/>
		</template>
		<v-list-item-title>
			{{ $t(item.title) }}
		</v-list-item-title>
	</v-list-item>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { SidebarSingleItem, SidebarLinkItem } from "./types";

const props = defineProps({
	item: {
		type: Object as PropType<SidebarSingleItem | SidebarLinkItem>,
		required: true,
	},
});

const density = (props.item as SidebarSingleItem).icon ? "default" : "compact";
</script>

<style lang="scss">
.v-icon {
	opacity: 1 !important;
}
</style>
