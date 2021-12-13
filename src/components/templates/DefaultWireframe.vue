<template>
	<v-container fluid class="wireframe-container">
		<div class="wireframe-header sticky">
			<v-custom-breadcrumbs
				v-if="breadcrumbs.length"
				:breadcrumbs="breadcrumbs"
			></v-custom-breadcrumbs>
			<div v-else class="breadcrumbs-placeholder"></div>
			<slot name="header">
				<h1 class="text-h3">
					{{ headline }}
				</h1>
			</slot>
			<div v-if="fabItems" class="fab-wrapper">
				<slot name="fab">
					<v-custom-fab
						:data-testid="fabItems.testId"
						:icon="fabItems.icon"
						:title="fabItems.title"
						:href="fabItems.href"
						:actions="fabItems.actions"
						:class="fabItems.class"
						class="wireframe-fab"
					></v-custom-fab>
				</slot>
			</div>
			<div class="border"></div>
		</div>
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
import vCustomFab from "@components/atoms/vCustomFab.vue";

export type Breadcrumb = {
	text: string;
	href?: string;
	to?: string;
	disabled?: boolean;
};

type FabAction = {
	icon: String;
	label: String;
	href?: String;
	to?: String;
	dataTestid?: String;
	class?: String;
	testId?: String;
};

export type Fab = {
	actions?: FabAction[];
	icon: String;
	title: String;
	href?: String;
};

export default {
	components: {
		vCustomBreadcrumbs,
		vCustomFab,
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
		fabItems: {
			type: Object,
			required: false,
			default: null,
		},
	},
};
</script>
<style lang="scss" scoped>
@import "~vuetify/src/styles/styles.sass";
@import "@styles";

.wireframe-container h1:first-of-type {
	margin-bottom: var(--space-md);
}

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

.border {
	margin-right: calc(-1 * var(--space-lg));
	margin-bottom: var(--space-xl);
	margin-left: calc(-1 * var(--space-lg));
	border-bottom: 2px solid rgba(0, 0, 0, 0.12);
}

@media #{map-get($display-breakpoints, 'sm-and-up')} {
	.breadcrumbs-placeholder {
		height: 24px;
	}
}
.sticky {
	position: sticky;
	top: 0;
	z-index: var(--layer-sticky-header);
	background-color: var(--color-white);
}

@media #{map-get($display-breakpoints, 'md-and-up')} {
	.wireframe-fab {
		position: relative;
		top: 0;
	}
}

$fab-wrapper-height: 80px;

.fab-wrapper {
	position: relative;
	top: $fab-wrapper-height / 2;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	height: $fab-wrapper-height;
	margin-top: -#{$fab-wrapper-height}; // stylelint-disable-line sh-waqar/declaration-use-variable
	pointer-events: none;

	* {
		pointer-events: auto;
	}
}
</style>
