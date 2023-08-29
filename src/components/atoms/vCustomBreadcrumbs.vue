<template>
	<div>
		<v-icon>{{ mdiChevronLeft }}</v-icon>
		<v-breadcrumbs
			color="secondary"
			:items="breadcrumbs"
			class="custom-breadcrumb px-0 py-0"
		>
			<template #divider>
				<v-icon>{{ mdiChevronLeft }}</v-icon>
			</template>
			<template #item="{ item }">
				<v-breadcrumbs-item
					:href="item.href"
					:to="item.to"
					:disabled="item.disabled"
					:exact="true"
					class="breadcrumbs-item"
				>
					{{ item.text }}
				</v-breadcrumbs-item>
			</template>
		</v-breadcrumbs>
	</div>
</template>

<script>
import { mdiChevronLeft } from "@mdi/js";

export default {
	props: {
		breadcrumbs: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			mdiChevronLeft: mdiChevronLeft,
		};
	},
};
</script>

<style lang="scss" scoped>
.custom-breadcrumb {
	display: inline-flex;
}
</style>
