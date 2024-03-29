<template>
	<v-container fluid class="wireframe-container">
		<div class="wireframe-header sticky">
			<v-custom-breadcrumbs
				v-if="breadcrumbs.length"
				:breadcrumbs="breadcrumbs"
			/>
			<div v-else class="breadcrumbs-placeholder" />
			<slot name="header">
				<h1 class="text-h3 pl-2" :data-testid="dataTestid">
					{{ headline }}
				</h1>
			</slot>
			<div v-if="fabItems" class="fab-wrapper">
				<slot name="fab">
					<speed-dial-menu
						class="wireframe-fab"
						:direction="isMobile ? 'top' : 'bottom'"
						:orientation="'right'"
						:icon="fabItems.icon"
						:href="fabItems.href"
						:data-testid="fabItems.dataTestId"
					>
						{{ fabItems.title }}
						<template #actions>
							<template
								v-for="(action, index) in fabItems.actions"
								:key="index"
							>
								<speed-dial-menu-action
									:dataTestId="action.dataTestId"
									:icon="action.icon"
									:href="action.href"
									:to="action.to"
									@click="$emit('onFabItemClick', action.customEvent)"
									>{{ action.label }}</speed-dial-menu-action
								>
							</template>
						</template>
					</speed-dial-menu>
				</slot>
			</div>
			<div v-if="showBorder" class="border" />
		</div>
		<v-container
			:class="{
				'main-content': true,
				'container-max-width': !fullWidth,
				'container-full-width': fullWidth,
				'overflow-x': allowOverflowX,
			}"
		>
			<div style="padding: 0 var(--space-lg)">
				<slot />
			</div>
		</v-container>
	</v-container>
</template>

<script lang="ts">
import vCustomBreadcrumbs from "@/components/atoms/vCustomBreadcrumbs.vue";
import { SpeedDialMenu, SpeedDialMenuAction } from "@ui-speed-dial-menu";
import { useVuetifyBreakpoints } from "@util-device-detection";
import { defineComponent, PropType } from "vue";

export default defineComponent({
	inheritAttrs: false,
	components: {
		vCustomBreadcrumbs,
		SpeedDialMenu,
		SpeedDialMenuAction,
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
		allowOverflowX: {
			type: Boolean,
			required: false,
			default: false,
		},
		dataTestid: {
			type: String as PropType<string | null>,
			default: null,
		},
	},
	emits: {
		onFabItemClick: (event: string) => (event ? true : false),
	},
	computed: {
		showBorder(): boolean {
			return !!(this.headline || this.$slots.header);
		},
	},
	setup() {
		const isMobile = useVuetifyBreakpoints().smallerOrEqual("md");
		return {
			isMobile,
		};
	},
});
</script>
<style lang="scss" scoped>
@import "~vuetify/settings";

.wireframe-container h1:first-of-type {
	margin-bottom: var(--space-md);
}

.wireframe-header {
	padding: 0 var(--space-lg);
}
.wireframe-container {
	padding: 0;
}

:deep(.v-application__wrap) {
	min-height: unset;
}

.main-content {
	padding: 0;
}
.overflow-x {
	overflow-x: auto;
}

.container-max-width {
	max-width: var(--size-content-width-max);
}

.container-full-width {
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
	background-color: rgb(var(--v-theme-white));
}

@media #{map-get($display-breakpoints, 'lg-and-up')} {
	.wireframe-fab {
		position: relative;
		top: 0;
	}
}

@media #{map-get($display-breakpoints, 'md-and-down')} {
	.wireframe-fab {
		position: fixed !important;
		bottom: 2rem;
		right: 1rem;
	}
}

$fab-wrapper-height: 80px;

.fab-wrapper {
	position: relative;
	top: calc($fab-wrapper-height / 2);
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
