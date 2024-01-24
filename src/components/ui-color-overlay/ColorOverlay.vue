<template>
	<div
		class="display-container"
		ref="containerRef"
		:tabindex="tabIndex"
		@click.stop.prevent="onClick"
		@focusin.stop.prevent="onFocusIn"
		@focusout.stop.prevent="onFocusOut"
		@keydown.enter.stop.prevent="onKeyDown"
		@keydown.space.stop.prevent="onKeyDown"
		@mouseenter.stop.prevent="onMouseEnter"
		@mouseleave.stop.prevent="onMouseLeave"
	>
		<slot />
		<div
			v-if="showOverlay"
			class="display-overlay rounded-t-sm"
			v-bind:style="{ background: color, opacity }"
		/>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
	name: "ColorOverlay",
	props: {
		color: { type: String, default: "#1b1b1b" },
		isOverlayDisabled: { type: Boolean },
		opacity: { type: Number, default: 0.2 },
	},
	emits: ["on:action"],
	setup(props, { emit }) {
		const containerRef = ref<HTMLDivElement | undefined>();
		const isFocused = ref(false);
		const isHovered = ref(false);

		const tabIndex = computed(() => (!props.isOverlayDisabled ? 0 : -1));

		const showOverlay = computed(
			() => !props.isOverlayDisabled && (isFocused.value || isHovered.value)
		);

		const onClick = () => {
			if (!props.isOverlayDisabled) {
				onUserAction();
				containerRef.value?.blur();
			}
		};

		const onFocusIn = () => {
			if (!props.isOverlayDisabled) {
				isFocused.value = true;
			}
		};

		const onFocusOut = () => {
			if (!props.isOverlayDisabled) {
				isFocused.value = false;
			}
		};

		const onKeyDown = () => {
			if (!props.isOverlayDisabled) {
				onUserAction();
			}
		};

		const onMouseEnter = () => {
			if (!props.isOverlayDisabled) {
				isHovered.value = true;
			}
		};

		const onMouseLeave = () => {
			if (!props.isOverlayDisabled) {
				isHovered.value = false;
			}
		};

		const onUserAction = () => {
			emit("on:action");
		};

		return {
			containerRef,
			showOverlay,
			tabIndex,
			onClick,
			onFocusIn,
			onFocusOut,
			onKeyDown,
			onMouseEnter,
			onMouseLeave,
		};
	},
});
</script>

<style scoped>
.display-container {
	position: relative;
}

.display-overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
</style>
