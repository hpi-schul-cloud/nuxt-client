<template>
	<div ref="menu" class="position-relative d-inline-block overflow-visible">
		<v-btn rounded color="primary" @click="onClick">
			<slot /> {{ hasActions }}
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
</template>

<script lang="ts" setup>
import {
	INJECT_SPEED_DIAL_DIRECTION,
	INJECT_SPEED_DIAL_ORIENTATION,
} from "./injection-tokens";
import { computed, provide, ref, toRef, useSlots, withDefaults } from "vue";
const slots = useSlots();

const props = withDefaults(
	defineProps<{
		direction: "top" | "bottom";
		orientation: "left" | "right";
	}>(),
	{ direction: "bottom", orientation: "left" }
);

provide(INJECT_SPEED_DIAL_DIRECTION, toRef(props, "direction"));
provide(INJECT_SPEED_DIAL_ORIENTATION, toRef(props, "orientation"));

const isMenuOpen = ref(false);
const actions = computed(() => (slots.actions ? slots.actions() : []));
const hasActions = computed(() => actions.value.length > 0);

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
