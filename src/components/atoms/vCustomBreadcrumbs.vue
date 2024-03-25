<template>
	<div>
		<v-icon>{{ mdiChevronLeft }}</v-icon>
		<v-breadcrumbs :items="breadcrumbs" class="custom-breadcrumb px-0 py-0">
			<template #divider>
				<v-icon>{{ mdiChevronLeft }}</v-icon>
			</template>
			<template #item="{ item, index }">
				<v-breadcrumbs-item
					:href="item.href"
					:to="item.to"
					:disabled="item.disabled"
					:exact="true"
					class="breadcrumbs-item"
					:data-testid="`breadcrumb-${index}`"
				>
					{{ item.title }}
				</v-breadcrumbs-item>
			</template>
		</v-breadcrumbs>
	</div>
</template>

<script setup>
import { mdiChevronLeft } from "@mdi/js";

defineProps({
	breadcrumbs: {
		type: Array,
		required: true,
	},
});
</script>

<style lang="scss" scoped>
.custom-breadcrumb {
	display: inline-flex;
	font-size: 14px;
}
</style>
