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

				const column = targetElement.closest<HTMLElement>("[data-column-scroller]");
				console.log(column);

				if (!column) {
					console.log("scroll here");
					targetElement.scrollIntoView({ block: "center", inline: "center", behavior: "smooth" });
					// targetElement.focus({ focusVisible: true });
					resolve();
					return;
				}

				let settled = false;

				const debouncedFocus = debounce(() => {
					if (settled) return;
					settled = true;
					stop();
					window.addEventListener(
						"scrollend",
						() => {
							console.log("with focus");
							targetElement.focus({ focusVisible: true });
							resolve();
						},
						{ once: true }
					);
					targetElement.scrollIntoView({ block: "center", inline: "center", behavior: "smooth" });
				}, 200);

				const { stop } = useResizeObserver(column, debouncedFocus);
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
