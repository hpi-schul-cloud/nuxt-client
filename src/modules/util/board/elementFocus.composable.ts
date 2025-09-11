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
			setTimeout(() => {
				scrollToNodeAndFocus(scrollTargetId);
			}, 500);
		}
	};

	return {
		focusNodeFromHash,
	};
};
