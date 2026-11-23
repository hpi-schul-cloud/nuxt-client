// ContentElementList marks the wrapper of every element with its id.
const ELEMENT_WRAPPER_SELECTOR = "[data-element-id]";

export type RenderedCardElement = { id: string; node: HTMLElement };

export const getRenderedCardElements = (container: HTMLElement): RenderedCardElement[] =>
	Array.from(container.querySelectorAll<HTMLElement>(ELEMENT_WRAPPER_SELECTOR)).flatMap((node) =>
		node.dataset.elementId ? [{ id: node.dataset.elementId, node }] : []
	);
