<template>
	<v-container fluid class="wireframe-container">
		<v-custom-breadcrumbs
			v-if="breadcrumbs.length"
			:breadcrumbs="breadcrumbs"
		></v-custom-breadcrumbs>
		<slot name="header">
			<h1 class="text-h3">
				{{ headline }}
			</h1>
		</slot>
		<v-container
			:class="{
				'container-max-width': !fullWidth,
				'container-full-width': fullWidth,
			}"
			class="main-content"
		>
			<slot></slot>
		</v-container>
	</v-container>
</template>
<script lang="ts">
import vCustomBreadcrumbs from "@/components/atoms/vCustomBreadcrumbs.vue";

export type Breadcrumb = {
	text: string;
	href?: string;
	disabled?: boolean;
};

export default {
	components: {
		vCustomBreadcrumbs,
	},
	props: {
		breadcrumbs: {
			type: Array,
			required: false,
			default: () => [],
		},
		headline: {
			type: String,
			required: false,
			default: null,
		},
		fullWidth: {
			type: Boolean,
			required: true,
		},
	},
};
</script>
<style lang="scss" scoped>
@import "@styles";

.container.wireframe-container {
	padding: 0 var(--space-lg); // Desktop
}

.container.main-content {
	padding: 0;
}

.container.container-max-width {
	max-width: var(--size-content-width-max);
}
.container.container-full-width {
	max-width: none;
	margin: 0;
}
</style>
