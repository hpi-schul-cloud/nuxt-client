export const extractDataAttribute = (el: HTMLElement | null, attributeName: string): string | undefined => {
	if (!el) {
		return undefined;
	}

	if (el.dataset && el.dataset[attributeName] !== undefined) {
		return el.dataset[attributeName];
	}

	if (el.parentElement) {
		return extractDataAttribute(el.parentElement, attributeName);
	}

	return undefined;
};
