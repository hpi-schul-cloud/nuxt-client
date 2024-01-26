<template>
	<OnClickOutside @trigger="onClickOutside">
		<div
			v-if="isMenu"
			role="menu"
			class="position-relative d-inline-block overflow-visible"
		>
			<v-btn rounded color="primary" size="large" @click="onClick">
				<v-icon v-if="icon">{{ icon }}</v-icon>
				<slot />
			</v-btn>
			<div
				v-if="isMenuOpen"
				class="position-absolute overflow-visible"
				:class="classes"
				ref="outlet"
			>
				<template v-for="(actionNode, i) in actions" :key="i">
					<component :is="actionNode" :speedDialIndex="i" />
				</template>
			</div>
		</div>
	</OnClickOutside>
</template>

<script lang="ts" setup>
import { computed, provide, ref, toRef, useSlots, withDefaults } from "vue";
import {
	INJECT_SPEED_DIAL_ACTION_CLICKED,
	INJECT_SPEED_DIAL_DIRECTION,
	INJECT_SPEED_DIAL_ORIENTATION,
} from "./injection-tokens";
import { OnClickOutside } from "@vueuse/components";
const slots = useSlots();

const props = withDefaults(
	defineProps<{
		icon?: string;
		direction?: "top" | "bottom";
		orientation?: "left" | "right";
	}>(),
	{ direction: "bottom", orientation: "left" }
);

provide(INJECT_SPEED_DIAL_DIRECTION, toRef(props, "direction"));
provide(INJECT_SPEED_DIAL_ORIENTATION, toRef(props, "orientation"));
provide(INJECT_SPEED_DIAL_ACTION_CLICKED, () => (isMenuOpen.value = false));

const actions = computed(() => (slots.actions ? slots.actions() : []));
const isMenu = computed(() => actions.value.length > 0);
const isMenuOpen = ref(false);

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

const onClick = () => (isMenuOpen.value = !isMenuOpen.value);
const onClickOutside = () => (isMenuOpen.value = false);
</script>

<style scoped lang="scss">
.position-absolute {
	position: absolute;
	z-index: 100;
}

.position-relative {
	position: relative;
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
</style>
