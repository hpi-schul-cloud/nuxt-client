export const useElementFocus = () => {
	const scrollToNodeAndFocus = (scrollTargetId: string) => {
		const targetElement: HTMLElement | null = document.querySelector(
			`[data-scroll-target="${scrollTargetId}"]`
		);

		if (targetElement) {
			targetElement.scrollIntoView({ block: "center", inline: "center" });
			targetElement.focus();
		}
	};

	const focusNodeFromHash = () => {
		if (window.location.hash) {
			const scrollTargetId: string = window.location.hash.slice(1);
			// Potential race condition: the target element may not be available
			// immediately after hash change due to async rendering or navigation.
			// Waiting briefly to solve the focusing issue.
			setTimeout(() => {
				scrollToNodeAndFocus(scrollTargetId);
			}, 500);
		}
	};

	return {
		focusNodeFromHash,
	};
};
