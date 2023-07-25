<template>
	<div>
		<div ref="dndContainer">
			<div ref="draggable" :style="draggingStyle">
				<slot></slot>
				drag {{ draggingStyle }} {{ rootLeft }} {{ draggingX }} {{ rootTop }}
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { useDraggable, useElementBounding } from "@vueuse/core";
import { computed, defineComponent, ref } from "vue";
import { useDragAndDropListManager } from "../composables/DragAndDropListHandler.composable";
export default defineComponent({
	name: "DragAndDropItem",
	components: {},
	props: {
		groupName: {
			type: String,
			required: true,
		},
	},
	emits: ["drag-end", "drag-start"],
	setup(props, { slots }) {
		const TRANSITION_TIME = 200;
		const INITIAL_Z_INDEX = 100;
		const DRAGGING_Z_INDEX = 1000;
		const timeoutStyle = ref<string>("");
		const draggable = ref<HTMLElement | null>(null);
		const dndContainer = ref<HTMLElement | null>(null);

		const { register } = useDragAndDropListManager();
		const { handlerStartDrag, handlerStopDrag } = register(dndContainer);
		const onStart = () => {
			handlerStartDrag({ element: dndContainer });
			console.log("start dragging");
		};

		const onEnd = () => {
			console.log("stop dragging");
			handlerStopDrag();
			transitionToNewPosition();
		};

		const transitionToNewPosition = () => {
			timeoutStyle.value = `transition: all ease-in-out ${TRANSITION_TIME}ms; position: fixed;`;
			setTimeout(() => {
				timeoutStyle.value = "";
			}, TRANSITION_TIME);
		};

		const {
			left: rootLeft,
			top: rootTop,
			update,
		} = useElementBounding(dndContainer, {
			immediate: true,
		});

		const {
			x: draggingX,
			y: draggingY,
			isDragging,
		} = useDraggable(draggable, {
			initialValue: { x: rootLeft.value, y: rootTop.value },
			onStart,
			onEnd,
		});

		const draggingStyle = computed<string>(() => {
			if (isDragging.value === false) {
				// TODO: this has to be a target - not necessarily root if replacing in a list
				return createDraggingStyle({
					top: rootTop.value,
					left: rootLeft.value,
					zIndex: INITIAL_Z_INDEX,
				});
			}
			const top = draggingY.value > 0 ? draggingY.value : rootTop.value;
			const left = draggingX.value > 0 ? draggingX.value : rootLeft.value;
			return (
				createDraggingStyle({ top, left, zIndex: DRAGGING_Z_INDEX }) +
				"position: fixed;"
			);
		});

		const createDraggingStyle = ({
			top,
			left,
			zIndex,
		}: {
			top: number;
			left: number;
			zIndex: number;
		}): string => {
			const style =
				`top: ${Math.round(top)}px; left: ${Math.round(
					left
				)}px; z-index: ${zIndex};` + timeoutStyle.value;
			console.log(style);

			return style;
		};

		return {
			onStart,
			onEnd,
			isDragging,
			draggingStyle,
			rootLeft,
			rootTop,
			update,
			dndContainer,
			draggable,
			draggingX,
			draggingY,
		};
	},
});
</script>
