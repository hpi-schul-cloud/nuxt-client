<template>
	<v-list-item
		:href="item.href"
		:to="item.to"
		active-color="primary"
		base-color="secondary"
		:data-testid="item.testId"
		height="var(--sidebar-item-height-2)"
	>
		<template #prepend>
			<v-icon :icon="item.icon" class="icon mr-2" />
		</template>
		<v-list-item-title class="">
			{{ $t(item.title) }}
		</v-list-item-title>
	</v-list-item>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { SidebarItemData } from "@/utils/sidebar-base-items";

const props = defineProps({
	item: {
		type: Object as PropType<SidebarItemData>,
		required: true,
	},
});

// eslint-disable-next-line vue/no-setup-props-reactivity-loss
console.log(props.item);
</script>

<style lang="scss">
.icon {
	opacity: 1 !important;
}
</style>
