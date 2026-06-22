import { logger } from "@util-logger";
import { useResizeObserver } from "@vueuse/core";
import { debounce } from "lodash-es";

const ATTEMPTS_LIMIT = 10;
const TIMEOUT_BETWEEN_ATTEMPTS = 100;

export const useElementFocus = () => {
	const scrollToNodeAndFocus = (scrollTargetId: string): Promise<void> =>
		new Promise((resolve, reject) => {
			let attempts = 0;
			const tryFocus = () => {
				if (attempts >= ATTEMPTS_LIMIT) {
					reject("Element not found after multiple attempts.");
					return;
				}

				const targetElement = document.querySelector<HTMLElement>(`[data-scroll-target="${scrollTargetId}"]`);

				if (!targetElement) {
					attempts++;
					setTimeout(tryFocus, TIMEOUT_BETWEEN_ATTEMPTS);
					return;
				}

				const scrollerElement = targetElement.closest<HTMLElement>("[data-column-scroller]");

				// Actually mitigating that it's very hard to keep track of the loading process of the board/card/card-elements.
				// Therefore, it would still be possible to scroll to target, but not ending up seeing it, because of async loading content.
				// Future: Have websocket transmission only. Keep track of board-column finished loading to start scrolling.
				// --> loadData --> renderContent --> nextTick(focusElement)
				const debouncedFocus = debounce(() => {
					targetElement.scrollIntoView({ block: "center", inline: "center", behavior: "smooth" });
					targetElement.focus({ focusVisible: true, preventScroll: true });
					stop();
					resolve();
				}, 200);

				const { stop } = useResizeObserver(scrollerElement, debouncedFocus);
				debouncedFocus();
			};

			tryFocus();
		});

	const focusNodeFromHash = async () => {
		if (!window.location.hash) return;

		const scrollTargetId: string = window.location.hash.slice(1);
		try {
			await scrollToNodeAndFocus(scrollTargetId);
		} catch (error: Error | unknown) {
			logger.error(error);
		}
	};

	return {
		focusNodeFromHash,
	};
};
