<template>
	<VSpeedDial v-model="isSpeedDialOpen" :attach="true" :location="speedDialLocation" transition="fade-transition">
		<template #activator="{ props: activatorProps }">
			<VFab
				class="fab-size-transition"
				v-bind="activatorProps"
				:rounded="isCollapsed ? 'circle' : 'pill'"
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
				<VIcon :icon="fabIcon" />
				<span id="fab-label" :aria-label="activatorAriaText" class="d-block">
					{{ !isCollapsed ? primaryAction.label : "" }}
				</span>
			</VFab>
		</template>

		<template v-for="action in speedDialActions" :key="action.label">
			<SpeedDialMenuAction :action="action" />
		</template>
	</VSpeedDial>
</template>

<script lang="ts" setup>
import SpeedDialMenuAction from "./SpeedDialMenuAction.vue";
import { FabAction } from "./types";
import { mdiClose } from "@icons/material";
import { useWindowScroll, watchThrottled } from "@vueuse/core";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

const props = defineProps<{
	actions: FabAction[];
}>();

const { t } = useI18n();

const closeAriaText = t("common.labels.close");
const activatorAriaText = computed(() =>
	isCollapsed.value ? closeAriaText : (primaryAction.value.ariaLabel ?? primaryAction.value.label)
);
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
	if (primaryAction.value.clickHandler) primaryAction.value.clickHandler();
};

watchThrottled(
	scrollOffsetY,
	(newVal, oldVal) => {
		if (!mdAndDown.value) {
			forceCollapseOnMobileScroll.value = false;
		} else if (oldVal > 0 && oldVal > newVal) {
			forceCollapseOnMobileScroll.value = false;
		} else if (newVal > 100) {
			forceCollapseOnMobileScroll.value = true;
		}
	},
	{ throttle: 200 }
);
</script>

<style scoped>
.fab-size-transition :deep(.v-btn) {
	transition: all 200ms ease-in-out;
}
</style>
