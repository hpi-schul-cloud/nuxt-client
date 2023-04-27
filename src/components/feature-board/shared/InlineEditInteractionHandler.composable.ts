import { useCurrentElement, useElementBounding } from "@vueuse/core";
import { inject, onMounted, Ref, watch } from "vue";
import { InlineEditInteractionEvent } from "../types/InlineEditInteractionEvent.symbol";

export const useInlineEditInteractionHandler = (
	onFocusCallback: (interactionBoundary: { x: number; y: number }) => void
) => {
	const interactionEvent = inject<Ref<{ x: number; y: number } | undefined>>(
		InlineEditInteractionEvent
	);
	const elementHost = useCurrentElement<HTMLElement>();
	const { top, right, bottom, left } = useElementBounding(elementHost);

	onMounted(() => {
		if (interactionEvent === undefined) {
			return;
		}
		watch(interactionEvent, (interactionBoundary) => {
			if (!interactionBoundary) {
				return;
			}
			if (
				isInteractionWithinElementBoundary(
					{
						top: top.value,
						bottom: bottom.value,
						left: left.value,
						right: right.value,
					},
					interactionBoundary
				)
			) {
				onFocusCallback(interactionBoundary);
			}
		});
	});

	return { top, right, bottom, left };
};

const isInteractionWithinElementBoundary = (
	elementBoundary: {
		top: number;
		bottom: number;
		left: number;
		right: number;
	},
	interactionBoundary: { x: number; y: number }
) => {
	return (
		elementBoundary.top <= interactionBoundary.y &&
		interactionBoundary.y <= elementBoundary.bottom &&
		elementBoundary.left <= interactionBoundary.x &&
		interactionBoundary.x <= elementBoundary.right
	);
};
