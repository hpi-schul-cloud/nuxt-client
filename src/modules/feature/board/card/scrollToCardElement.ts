import { getRenderedCardElements } from "./renderedCardElements";

const SCROLL_TARGET_GAP_PX = 32;
const FOCUSABLE_SELECTOR = "a[href], button, input, textarea, select, [tabindex]:not([tabindex='-1'])";

const focusElement = (wrapper: HTMLElement) => {
	const focusTarget = wrapper.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
	if (focusTarget) {
		focusTarget.focus({ preventScroll: true });
		return;
	}

	wrapper.tabIndex = -1;
	wrapper.focus({ preventScroll: true });
};

export const scrollToCardElement = (container: HTMLElement, elementId: string, isFirstElement: boolean): boolean => {
	const target = getRenderedCardElements(container).find(({ id }) => id === elementId)?.node;
	if (!target) return false;

	const offsetTop = target.getBoundingClientRect().top - container.getBoundingClientRect().top;
	const top = isFirstElement ? 0 : Math.max(0, container.scrollTop + offsetTop - SCROLL_TARGET_GAP_PX);
	const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	container.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
	focusElement(target);

	return true;
};
