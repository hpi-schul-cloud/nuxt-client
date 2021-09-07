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
import vCustomBreadcrumbs from "@components/molecules/vCustomBreadcrumbs.vue";

export type Breadcrump = {
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
			required: false,
			// eslint-disable-next-line vue/no-boolean-default
			default: true,
		},
	},
};
</script>
<style lang="scss" scoped>
@import "@styles";

.container.wireframe-container {
	padding: 0 var(--space-lg); // Desktop
	// padding: 0 36px;
	// padding: 0 36px;
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
