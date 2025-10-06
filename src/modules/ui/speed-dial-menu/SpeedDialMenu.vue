<template>
	<OnClickOutside @trigger="onClickOutside">
		<div v-if="isMenu" role="menu" class="position-relative d-inline-block overflow-visible">
			<v-btn
				id="fab"
				:rounded="!isCollapsed ? 'xl' : 'circle'"
				class="size-transition"
				:class="!isCollapsed ? 'default-width' : ''"
				:icon="isCollapsed"
				color="primary"
				size="large"
				@click="onFabItemClick"
			>
				<v-icon v-if="icon && !isMenuOpen">{{ icon }}</v-icon>
				<v-icon v-if="isMenuOpen">{{ mdiClose }}</v-icon>
				<span v-if="!isCollapsed" class="d-block"><slot /></span>
				<span v-else class="d-sr-only"><slot /></span>
			</v-btn>
			<div v-if="isMenuOpen" ref="outlet" class="position-absolute overflow-visible" :class="classes">
				<template v-for="(actionNode, i) in actions" :key="i">
					<component :is="actionNode" :speed-dial-index="i" />
				</template>
			</div>
		</div>
		<div v-else>
			<v-btn
				id="fab"
				:rounded="!isCollapsed ? 'xl' : 'circle'"
				class="size-transition"
				:class="!isCollapsed ? 'default-width' : ''"
				:icon="isCollapsed"
				color="primary"
				size="large"
				:href="href"
				:to="to"
				@click="onFabClick"
			>
				<v-icon v-if="icon">{{ isMenuOpen ? mdiClose : icon }}</v-icon>
				<span v-if="!isCollapsed" class="d-block"><slot /></span>
				<span v-else class="d-sr-only"><slot /></span>
			</v-btn>
		</div>
	</OnClickOutside>
</template>

<script lang="ts" setup>
import {
	INJECT_SPEED_DIAL_ACTION_CLICKED,
	INJECT_SPEED_DIAL_DIRECTION,
	INJECT_SPEED_DIAL_ORIENTATION,
} from "./injection-tokens";
import { mdiClose } from "@icons/material";
import { OnClickOutside } from "@vueuse/components";
import { useWindowScroll, watchThrottled } from "@vueuse/core";
import { computed, provide, ref, toRef, useSlots, VNode } from "vue";
import { useDisplay } from "vuetify";

interface Props {
	icon?: string;
	href?: string;
	to?: string;
	direction?: "top" | "bottom";
	orientation?: "left" | "right";
}

const props = withDefaults(defineProps<Props>(), {
	icon: "",
	href: "",
	to: "",
	direction: "bottom",
	orientation: "right",
});

const emit = defineEmits(["fab:clicked"]);

const slots = useSlots();

provide(INJECT_SPEED_DIAL_DIRECTION, toRef(props, "direction"));
provide(INJECT_SPEED_DIAL_ORIENTATION, toRef(props, "orientation"));
provide(INJECT_SPEED_DIAL_ACTION_CLICKED, () => (isMenuOpen.value = false));

const actions = computed(() => {
	const actionsInSlot = slots.actions ? slots.actions() : [];
	if (hasPseudoRenderElement(actionsInSlot)) {
		return actionsInSlot[0].children as VNode[];
	}
	return actionsInSlot;
});

const isMenu = computed(() => actions.value.length > 0);
const isMenuOpen = ref(false);

const { mdAndDown } = useDisplay();
const { y: scrollOffsetY } = useWindowScroll();

const isForceCollapseOnMobileScroll = ref(false);

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

const isCollapsed = computed(() => isMenuOpen.value || isForceCollapseOnMobileScroll.value);

const classes = computed(() => {
	const classList: string[] = [];
	if (props.orientation === "left") {
		classList.push("fix-to-left");
	}
	if (props.orientation === "right") {
		classList.push("fix-to-right");
	}
	if (props.direction === "top") {
		classList.push("fix-to-top");
	}
	return classList.join(" ");
});

const onFabItemClick = () => (isMenuOpen.value = !isMenuOpen.value);
const onFabClick = () => {
	emit("fab:clicked");
};
const onClickOutside = () => (isMenuOpen.value = false);

/**
 * Returns true if the actions in actions-slot are wrapped by a pseudo element.
 * This is the case if the actions were rendered in a v-for-loop
 */
const hasPseudoRenderElement = (actionsInSlot: VNode[]) =>
	actionsInSlot.length === 1 && actionsInSlot[0].props === null && Array.isArray(actionsInSlot[0].children);
</script>

<style scoped lang="scss">
.position-absolute {
	position: absolute;
	z-index: 100;
}

.default-width {
	width: 100%;
}

.position-relative {
	position: relative;
	z-index: 100;
}

.overflow-visible {
	overflow: visible;
}

.fix-to-left {
	left: 0;
}
.fix-to-right {
	right: 0;
}

.fix-to-top {
	top: -72px;
}

.size-transition {
	transition: all 200ms ease-in-out;
	min-width: 56px;
}
</style>
