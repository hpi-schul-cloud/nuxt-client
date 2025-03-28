<template>
	<div class="wireframe-container">
		<div
			aria-live="polite"
			id="notify-screen-reader-polite"
			class="d-sr-only"
		/>
		<div
			aria-live="assertive"
			id="notify-screen-reader-assertive"
			class="d-sr-only"
		/>
		<div class="wireframe-header sticky" :class="{ fixed: fixedHeader }">
			<Breadcrumbs v-if="breadcrumbs.length" :breadcrumbs="breadcrumbs" />
			<div v-else class="breadcrumbs-placeholder" />
			<slot name="header">
				<h1 v-if="headline" class="text-h3" :data-testid="dataTestid">
					{{ headline }}
				</h1>
			</slot>
			<div v-if="fabItems" class="fab-wrapper">
				<slot name="fab">
					<speed-dial-menu
						class="wireframe-fab"
						:direction="mdAndDown ? 'top' : 'bottom'"
						:orientation="'right'"
						:icon="fabItems.icon"
						:href="fabItems.href"
						:to="fabItems.to"
						:aria-label="fabItems.ariaLabel"
						:data-testid="fabItems.dataTestId"
						@fab:clicked="onFabClicked"
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
									:aria-label="action.ariaLabel"
									@click="$emit('onFabItemClick', action.customEvent)"
								>
									{{ action.label }}
								</speed-dial-menu-action>
							</template>
						</template>
					</speed-dial-menu>
				</slot>
			</div>
			<v-divider v-if="showDivider" class="mx-n6" role="presentation" />
		</div>
		<v-container
			:fluid="maxWidth !== 'nativ'"
			class="main-content"
			:class="{
				'pa-0': mainWithoutPadding,
				'container-short-width': maxWidth === 'short',
				'container-full-width': maxWidth === 'full',
			}"
		>
			<slot />
		</v-container>
	</div>
</template>

<script setup lang="ts">
import { Breadcrumbs } from "@ui-breadcrumbs";
import { SpeedDialMenu, SpeedDialMenuAction } from "@ui-speed-dial-menu";
import { computed, PropType, useSlots } from "vue";
import { Fab, Breadcrumb } from "./default-wireframe.types";
import { useDisplay } from "vuetify";

const props = defineProps({
	breadcrumbs: {
		type: Array as PropType<Breadcrumb[]>,
		required: false,
		default: () => [],
	},
	headline: {
		type: String,
		required: false,
		default: null,
	},
	maxWidth: {
		type: String as PropType<"full" | "short" | "nativ">,
		required: true,
		default: "short",
	},
	fabItems: {
		type: Object as PropType<Fab>,
		required: false,
		default: null,
	},
	hideBorder: {
		type: Boolean,
	},
	dataTestid: {
		type: String as PropType<string | null>,
		default: null,
	},
	fixedHeader: {
		type: Boolean,
	},
	mainWithoutPadding: {
		type: Boolean,
	},
});

const emit = defineEmits({
	onFabItemClick: (event: string) => (event ? true : false),
	"fab:clicked": () => true,
});

const onFabClicked = () => {
	emit("fab:clicked");
};

defineOptions({
	inheritAttrs: false,
});
const slots = useSlots();

const { mdAndDown } = useDisplay();

const showDivider = computed(() => {
	return !props.hideBorder && !!(props.headline || slots.header);
});
</script>

<style lang="scss" scoped>
@import "@/styles/settings.scss";
.wireframe-container h1:first-of-type {
	margin-bottom: var(--space-md);
}

.wireframe-header {
	padding: 0 var(--space-lg);
	display: flex;
	flex-direction: column;
}

:deep(.v-application__wrap) {
	min-height: unset;
}

.main-content {
	padding: 0 var(--space-lg) var(--space-lg) var(--space-lg);
	margin-top: var(--space-xl);
}

.container-short-width {
	max-width: var(--size-content-width-max);
}

.container-full-width {
	max-width: none;
	margin: 0;
}

.v-divider {
	z-index: -1;
	margin-right: -1.5rem;
	margin-left: -1.5rem;
}

@media #{map-get($display-breakpoints, 'sm-and-up')} {
	.breadcrumbs-placeholder {
		height: 22px;
	}
}

.sticky {
	position: sticky;
	top: var(--topbar-height);
	z-index: var(--layer-sticky-header);
	background-color: rgb(var(--v-theme-white));
}

.fixed {
	position: fixed;
	top: var(--topbar-height);
	width: 100%;
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
	margin-top: -#{$fab-wrapper-height};
	pointer-events: none;

	* {
		pointer-events: auto;
	}
}
</style>
