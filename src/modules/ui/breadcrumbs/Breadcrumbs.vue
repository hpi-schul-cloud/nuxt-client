<template>
	<v-breadcrumbs :items="breadcrumbs" class="custom-breadcrumb px-0 py-0">
		<template #divider>
			<v-icon>{{ mdiChevronRight }}</v-icon>
		</template>
		<template #item="{ item, index }">
			<v-breadcrumbs-item
				class="breadcrumbs-item"
				color="primary"
				exact
				:href="item.href"
				:to="item.to"
				:disabled="item.disabled"
				:data-testid="`breadcrumb-${index}`"
			>
				{{ item.title }}
			</v-breadcrumbs-item>
		</template>
	</v-breadcrumbs>
</template>

<script setup lang="ts">
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import { mdiChevronRight } from "@icons/material";
import { PropType } from "vue";

defineProps({
	breadcrumbs: {
		type: Array as PropType<Breadcrumb[]>,
		required: true,
	},
});
</script>

<style lang="scss" scoped>
.custom-breadcrumb {
	display: inline-flex;
	height: var(--breadcrumbs-height);
	font-size: 14px;
}
</style>
