<template>
	<v-list-item
		:href="item.href"
		:to="item.to"
		color="primary"
		base-color="secondary"
		:data-testid="item.testId"
		:height="ITEM_HEIGHT"
		:min-height="ITEM_HEIGHT"
	>
		<template #prepend>
			<v-icon
				v-if="(item as ItemData).icon"
				:icon="(item as ItemData).icon"
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
import { ItemData, ChildData } from "@/utils/sidebar-base-items";

const props = defineProps({
	item: {
		type: Object as PropType<ItemData | ChildData>,
		required: true,
	},
});

const ITEM_HEIGHT = (props.item as ItemData).icon
	? "var(--sidebar-item-height-2)"
	: "var(--sidebar-child-item-height)";
</script>

<style lang="scss">
.v-icon {
	opacity: 1 !important;
}
</style>
