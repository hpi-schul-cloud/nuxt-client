<template>
	<div
		class="wireframe-container"
		:class="{ 'wireframe-container-flex': isFlexContainer }"
	>
		<div
			id="notify-screen-reader-polite"
			aria-live="polite"
			class="d-sr-only"
		/>
		<div
			id="notify-screen-reader-assertive"
			aria-live="assertive"
			class="d-sr-only"
		/>
		<div class="wireframe-header">
			<Breadcrumbs v-if="breadcrumbs.length" :breadcrumbs="breadcrumbs" />
			<div v-else :class="{ 'breadcrumbs-placeholder': smAndUp }" />
			<slot name="header">
				<h1 v-if="headline" :data-testid="dataTestid">
					{{ headline }}
				</h1>
			</slot>
			<div v-if="fabItems" class="fab-wrapper">
				<slot name="fab">
					<speed-dial-menu
						:class="{
							'wireframe-fab-relative': lgAndUp,
							'wireframe-fab-fixed': mdAndDown,
						}"
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
									:data-test-id="action.dataTestId"
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
			<v-divider class="mx-n6" role="presentation" />
		</div>
		<v-container
			:fluid="maxWidth !== 'nativ'"
			class="main-content"
			:class="{
				'pa-0': mainWithoutPadding,
				'container-short-width': maxWidth === 'short',
				'container-full-width': maxWidth === 'full',
				'main-content-flex': isFlexContainer,
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
	mainWithoutPadding: {
		type: Boolean,
	},
	// neded if we don't want to have full page scrolling, so it's restricted to browsers viewport height
	isFlexContainer: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits({
	onFabItemClick: (event: string | undefined) => !!event,
	"fab:clicked": () => true,
});

const onFabClicked = () => {
	emit("fab:clicked");
};

defineOptions({
	inheritAttrs: false,
});
const slots = useSlots();

const { mdAndDown, smAndUp, lgAndUp } = useDisplay();

const showDivider = computed(() => {
	return !props.hideBorder && !!(props.headline || slots.header);
});
</script>

<style lang="scss" scoped>
@use "@/styles/settings.scss" as *;

.wireframe-container-flex {
	height: calc(100vh - var(--topbar-height));
	display: flex;
	flex-direction: column;
}
.main-content-flex {
	flex: 1;
	overflow-y: auto;
}

.wireframe-container h1:first-of-type {
	margin-bottom: 16px;
}

.wireframe-header {
	padding: 0 24px;
	display: flex;
	flex-direction: column;
}

:deep(.v-application__wrap) {
	min-height: unset;
}

.main-content {
	padding: 0 24px 24px 24px;
	margin-top: 32px;
}

.container-short-width {
	max-width: var(--content-max-width);
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

.breadcrumbs-placeholder {
	height: 22px;
}

.sticky {
	position: sticky;
	top: var(--topbar-height);
	z-index: 20;
	background-color: rgb(var(--v-theme-white));
}

.wireframe-fab-relative {
	position: relative;
	top: 0;
}

.wireframe-fab-fixed {
	position: fixed;
	bottom: 2rem;
	right: 1rem;
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
