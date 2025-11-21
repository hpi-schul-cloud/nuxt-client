<template>
	<v-breadcrumbs :items="breadcrumbs" class="custom-breadcrumb px-0 py-0">
		<template #divider>
			<v-icon>{{ mdiChevronRight }}</v-icon>
		</template>
		<template #item="{ item, index }">
			<v-breadcrumbs-item
				class="breadcrumbs-item"
				:class="{ 'breadcrumbs-item-max-width': xs }"
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
import { useDisplay } from "vuetify";

defineProps<{
	breadcrumbs: Breadcrumb[];
}>();

const { xs } = useDisplay();
</script>

<style lang="scss" scoped>
.custom-breadcrumb {
	display: inline-flex;
	height: var(--breadcrumbs-height);
	font-size: 14px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 100%;
}

.breadcrumbs-item {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	display: inline-block;
	vertical-align: middle;
}

.breadcrumbs-item-max-width {
	max-width: 120px;
}
</style>
