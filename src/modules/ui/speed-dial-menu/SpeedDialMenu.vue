<template>
	<VFab
		:absolute="!mdAndDown"
		class="fab-size-transition"
		:class="{
			'fab-default-width': !isCollapsed,
			'positioning-lg': !mdAndDown,
			'position-fixed positioning-sm-md': mdAndDown,
		}"
		:rounded="!isCollapsed ? 'pill' : 'circle'"
		color="primary"
		size="large"
		elevation="4"
		:transition="false"
		:icon="isCollapsed"
		:to="primaryAction.to"
		:href="primaryAction.href"
		:data-testid="primaryAction.dataTestId"
		@click="onFabClick"
	>
		<VIcon>{{ fabIcon }}</VIcon>
		<span v-if="!isCollapsed" class="d-block">{{ primaryAction.label }}</span>
		<span v-else class="d-sr-only">{{ primaryAction.ariaLabel ?? primaryAction.label }}</span>
		<VSpeedDial v-if="isSpeedDial" v-model="isSpeedDialOpen" activator="parent" :location="speedDialLocation">
			<template v-for="(action, index) in speedDialActions" :key="index">
				<SpeedDialMenuAction :action="action" />
			</template>
		</VSpeedDial>
	</VFab>
</template>

<script lang="ts" setup>
import SpeedDialMenuAction from "./SpeedDialMenuAction.vue";
import { FabAction } from "./types";
import { mdiClose } from "@icons/material";
import { useWindowScroll, watchThrottled } from "@vueuse/core";
import { computed, ref } from "vue";
import { useDisplay } from "vuetify";

const props = defineProps<{
	actions: FabAction[];
}>();

const emit = defineEmits(["fab:clicked"]);

const primaryAction = computed(() => props.actions[0]);
const speedDialActions = computed(() => props.actions.slice(1));
const fabIcon = computed(() => (isSpeedDial.value && isSpeedDialOpen.value ? mdiClose : primaryAction.value.icon));

const { mdAndDown } = useDisplay();

const speedDialLocation = computed(() => (mdAndDown.value ? "top center" : "bottom center"));
const isSpeedDial = computed(() => props.actions.length > 1);
const isSpeedDialOpen = ref(false);

const { y: scrollOffsetY } = useWindowScroll();
const forceCollapseOnMobileScroll = ref(false);
const isCollapsed = computed(() => isSpeedDialOpen.value || forceCollapseOnMobileScroll.value);

const onFabClick = () => {
	if (isSpeedDial.value) {
		isSpeedDialOpen.value = !isSpeedDialOpen.value;
	} else {
		emit("fab:clicked");
	}
};

watchThrottled(
	scrollOffsetY,
	(newVal, oldVal) => {
		if (!mdAndDown.value) {
			forceCollapseOnMobileScroll.value = false;
			return;
		}
		if (oldVal > 0 && oldVal > newVal) {
			forceCollapseOnMobileScroll.value = false;
			return;
		}
		if (newVal > 100) {
			forceCollapseOnMobileScroll.value = true;
		}
	},
	{ throttle: 200 }
);
</script>

<style scoped>
.positioning-lg {
	top: 22px;
	right: 24px;
}

.positioning-sm-md {
	bottom: 32px;
	right: 24px;
}

.fab-size-transition :deep(.v-btn) {
	transition: all 200ms ease-in-out;
	min-width: 56px;
}

.fab-default-width :deep(.v-btn) {
	width: 100%;
}
</style>
