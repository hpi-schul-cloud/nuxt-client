<template>
	<v-list-group ref="fucker" :value="item.title">
		<template v-slot:activator="{ props }">
			<v-list-item
				v-bind="props"
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
				<template #append>
					<v-icon
						:icon="categoryToggleIcon"
						class="mr-2"
						@click.prevent="onClick"
					/>
				</template>
			</v-list-item>
		</template>
		<template v-for="child in item.children" :key="child.title">
			<SidebarItem :item="child" />
		</template>
	</v-list-group>
</template>

<script setup lang="ts">
// import { PropType } from "vue";
import { PropType, ref, computed } from "vue";
import { VListGroup } from "vuetify/components/VList";
import { SidebarItemData } from "@/utils/sidebar-base-items";
import SidebarItem from "./SidebarItem.vue";
import { mdiChevronDown, mdiChevronUp } from "@/components/icons/material";

defineProps({
	item: {
		type: Object as PropType<SidebarItemData>,
		required: true,
	},
});

const fucker = ref(null);

// const expanded = ref(false);

const onClick = (e: any) => {
	console.log(e);
	// console.log("hi", expanded.value);
	// expanded.value = !expanded.value;
	// console.log("bye", expanded.value);
};

const categoryToggleIcon = computed(() => {
	console.log(fucker.value);
	// eslint-disable-next-line no-constant-condition
	return true ? mdiChevronUp : mdiChevronDown;
});
</script>

<style lang="scss">
.v-icon {
	opacity: 1 !important;
}

.v-list-group__items .v-list-item {
	padding-inline-start: 56px !important;
}
</style>
