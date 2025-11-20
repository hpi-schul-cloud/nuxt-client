<template>
	<!-- TODO - size transition not working when using extended prop -->
	<VFab
		app
		color="primary"
		size="large"
		:style="{ top: fabOffset }"
		:location="fabLocation"
		:icon="isCollapsed"
		:extended="!isCollapsed"
		:to="to"
		:href="href"
		@click="onFabClick"
	>
		<VIcon v-if="icon">{{ isMenuOpen && isMenu ? mdiClose : icon }}</VIcon>
		<span v-if="!isCollapsed" class="d-block"><slot /></span>
		<span v-else class="d-sr-only"><slot /></span>
		<template v-if="isMenu">
			<VSpeedDial v-model="isMenuOpen" activator="parent" :location="menuLocation">
				<template v-for="(action, index) in actions" :key="index">
					<div class="d-flex justify-end align-center pr-2">
						<VBtn
							class="mr-2"
							:data-test-id="action.dataTestId"
							:href="action.href"
							:to="action.to"
							:aria-label="action.ariaLabel"
							@click="$emit('onFabItemClick', action.customEvent)"
						>
							{{ action.label }}
						</VBtn>
						<VBtn
							color="primary"
							:data-test-id="action.dataTestId"
							:icon="action.icon"
							:href="action.href"
							:to="action.to"
							:aria-label="action.ariaLabel"
							@click="$emit('onFabItemClick', action.customEvent)"
						/>
					</div>
				</template>
			</VSpeedDial>
		</template>
	</VFab>
</template>

<script lang="ts" setup>
import { FabAction } from "@/components/templates/default-wireframe.types";
import { mdiClose } from "@icons/material";
import { useWindowScroll, watchThrottled } from "@vueuse/core";
import { computed, ref } from "vue";
import { useDisplay } from "vuetify";

const props = withDefaults(
	defineProps<{
		icon?: string;
		href?: string;
		to?: string;
		actions?: FabAction[];
		fabOffset?: number;
	}>(),
	{
		icon: "",
		href: "",
		to: "",
		actions: () => [],
		direction: "bottom",
		orientation: "right",
		fabOffset: 0,
	}
);

const emit = defineEmits(["fab:clicked", "onFabItemClick"]);

const { mdAndDown } = useDisplay();
const { y: scrollOffsetY } = useWindowScroll();

const fabLocation = computed(() => (mdAndDown.value ? "bottom right" : "top right"));
const menuLocation = computed(() => (mdAndDown.value ? "top center" : "bottom center"));
const fabOffset = computed(() => (props.fabOffset && !mdAndDown.value ? `${props.fabOffset}px` : undefined));

const isMenu = computed(() => props.actions.length > 0);
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
