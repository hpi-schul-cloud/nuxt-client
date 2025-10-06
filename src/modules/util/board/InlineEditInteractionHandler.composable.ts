import { InlineEditInteractionEvent } from "@/types/board/InlineEditInteractionEvent.symbol";
import { useCurrentElement, useElementBounding } from "@vueuse/core";
import { inject, onMounted, Ref, ref, watch } from "vue";

export const useInlineEditInteractionHandler = (
	onFocusCallback: (interactionBoundary: { x: number; y: number }) => Promise<void>
) => {
	let interactionEvent: Ref<{ x: number; y: number } | undefined> | undefined = undefined;

	interactionEvent = inject<Ref<{ x: number; y: number } | undefined>>(
		InlineEditInteractionEvent,
		/**
		 * If the Composable is not included as a child of an InlineEditInteractionEvent component no events will be received
		 */
		ref(undefined)
	);

	const elementHost = useCurrentElement<HTMLElement>();
	const { top, right, bottom, left } = useElementBounding(elementHost);

	onMounted(() => {
		if (interactionEvent === undefined) {
			return;
		}
		watch(interactionEvent, async (interactionBoundary) => {
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
				await onFocusCallback(interactionBoundary);
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
) =>
	elementBoundary.top <= interactionBoundary.y &&
	interactionBoundary.y <= elementBoundary.bottom &&
	elementBoundary.left <= interactionBoundary.x &&
	interactionBoundary.x <= elementBoundary.right;
