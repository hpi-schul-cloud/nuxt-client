<template>
	<v-breadcrumbs :items="breadcrumbs" class="custom-breadcrumb px-0 pb-0 pt-1">
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
import { PropType } from "vue";
import { mdiChevronRight } from "@icons/material";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";

defineProps({
	breadcrumbs: {
		type: Array as PropType<Breadcrumb[]>,
		required: true,
	},
});
</script>

<style lang="scss" scoped>
.custom-breadcrumb {
	font-size: 14px;
}
</style>
