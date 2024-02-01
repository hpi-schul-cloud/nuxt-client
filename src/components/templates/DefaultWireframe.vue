<template>
	<v-app class="wireframe-container">
		<v-container fluid class="wireframe-header sticky px-6 py-0">
			<v-custom-breadcrumbs
				v-if="breadcrumbs.length"
				:breadcrumbs="breadcrumbs"
			/>
			<div v-else class="breadcrumbs-placeholder" />
			<slot name="header">
				<h1 class="text-h3 pl-2">
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
						:data-testid="fabItems.dataTestId"
					>
						{{ fabItems.title }}
						<template #actions>
							<speed-dial-menu-action
								v-for="(action, index) in fabItems.actions"
								:key="index"
								:data-testid="action.dataTestId"
								:icon="action.icon"
								:href="action.href"
								>{{ action.label }}</speed-dial-menu-action
							>
						</template>
					</speed-dial-menu>
				</slot>
			</div>
			<div v-if="showBorder" class="border" />
		</v-container>
		<v-main
			:class="{
				'container-max-width': !fullWidth,
				'container-full-width': fullWidth,
			}"
			class="main-content"
		>
			<slot />
		</v-main>
	</v-app>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import vCustomBreadcrumbs from "@/components/atoms/vCustomBreadcrumbs.vue";
import { SpeedDialMenuAction, SpeedDialMenu } from "@ui-speed-dial-menu";
import { useVuetifyBreakpoints } from "@util-device-detection";

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
	},
	computed: {
		showBorder(): boolean {
			return !!(this.headline || this.$slots.header);
		},
	},
	setup(props) {
		onMounted(() => console.log(props.fabItems));

		const { isSmallerOrEqual } = useVuetifyBreakpoints();

		const isMobile = isSmallerOrEqual("md");

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
:deep(.v-application__wrap) {
	min-height: unset;
}

.main-content {
	margin: 0 auto;
}

.container-max-width {
	max-width: var(--size-content-width-max);
}

.container-full-width {
	max-width: none;
	margin: 0px 24px;
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
