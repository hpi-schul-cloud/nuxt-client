import { logger } from "@util-logger";

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

				targetElement.scrollIntoView({ block: "center", inline: "center" });
				targetElement.focus();
				resolve();
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
