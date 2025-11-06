import { SortableOptions } from "sortablejs";

export const getSortableOptions = (overrides: SortableOptions = {}): SortableOptions => ({
	delayOnTouchOnly: true,
	delay: 150, // milliseconds to wait before drag starts
	ghostClass: "opacity-50",
	touchStartThreshold: 3, // needed for sensitive touch devices
	fallbackTolerance: 3, // specifies how far the mouse should move before it's considered a drag
	easing: "cubic-bezier(1, 0, 0, 1)",
	draggable: ".draggable",
	animation: 250,
	forceFallback: true, // always use the sortablejs fallback (JS-based) drag implementation
	...overrides,
});
