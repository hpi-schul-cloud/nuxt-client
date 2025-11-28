<template>
	<!-- TODO - size transition not working when using extended prop -->
	<VFab
		:absolute="!mdAndDown"
		color="primary"
		size="large"
		:transition="false"
		:style="{ top: fabOffset }"
		:location="fabLocation"
		:icon="isCollapsed"
		:extended="!isCollapsed"
		:data-testid="primaryAction.dataTestId"
		:to="primaryAction.to"
		:href="primaryAction.href"
		@click="onFabClick"
	>
		<VIcon>{{ fabIcon }}</VIcon>
		<span v-if="!isCollapsed" class="d-block">{{ primaryAction.label }}</span>
		<span v-else class="d-sr-only">{{ primaryAction.ariaLabel }}</span>
		<template v-if="isMenu">
			<VSpeedDial v-model="isMenuOpen" activator="parent" attach=".wireframe-container" :location="menuLocation">
				<template v-for="(action, index) in speedDialActions" :key="index">
					<SpeedDialMenuAction :action="action" />
				</template>
			</VSpeedDial>
		</template>
	</VFab>
</template>

<script lang="ts" setup>
import { FabAction } from "./types";
import { mdiClose } from "@icons/material";
import { SpeedDialMenuAction } from "@ui-speed-dial-menu";
import { useWindowScroll, watchThrottled } from "@vueuse/core";
import { computed, ref } from "vue";
import { useDisplay } from "vuetify";

const props = withDefaults(
	defineProps<{
		actions: FabAction[];
		fabOffset?: number;
	}>(),
	{
		fabOffset: 0,
	}
);

const emit = defineEmits(["fab:clicked"]);

const primaryAction = computed(() => props.actions[0]);
const speedDialActions = computed(() => props.actions.slice(1));
const fabIcon = computed(() => (isMenuOpen.value && isMenu.value ? mdiClose : primaryAction.value.icon));

const { mdAndDown } = useDisplay();
const { y: scrollOffsetY } = useWindowScroll();

const fabLocation = computed(() => (mdAndDown.value ? "bottom right" : "top right"));
const menuLocation = computed(() => (mdAndDown.value ? "top center" : "bottom center"));
const fabOffset = computed(() => (props.fabOffset && !mdAndDown.value ? `${props.fabOffset - 3}px` : undefined));

const isMenu = computed(() => props.actions.length > 1);
const isMenuOpen = ref(false);

const isCollapsed = computed(() => isMenuOpen.value || isForceCollapseOnMobileScroll.value);
const isForceCollapseOnMobileScroll = ref(false);

const onFabClick = () => {
	if (isMenu.value) {
		isMenuOpen.value = !isMenuOpen.value;
	} else {
		emit("fab:clicked");
	}
};

watchThrottled(
	scrollOffsetY,
	(newVal, oldVal) => {
		if (!mdAndDown.value) {
			isForceCollapseOnMobileScroll.value = false;
			return;
		}
		if (oldVal > 0 && oldVal > newVal) {
			isForceCollapseOnMobileScroll.value = false;
			return;
		}
		if (newVal > 100) {
			isForceCollapseOnMobileScroll.value = true;
		}
	},
	{ throttle: 200 }
);
</script>

<style scoped lang="scss">
.size-transition {
	transition: all 200ms ease-in-out;
	min-width: 56px;
}
</style>
