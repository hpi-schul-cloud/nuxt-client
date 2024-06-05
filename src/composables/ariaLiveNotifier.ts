export const useAriaLive = () => {
	const notifyOnScreenReader = (
		message: string,
		importance: "off" | "polite" | "assertive"
	) => {
		// should be a div with aria-live="polite | assertive" attribute
		// and should be appended to the upper level of the DOM tree
		// the aria-live attribute should be set polite or assertive based on the importance of the message
		const element = document.getElementById("notify-on-screen-reader");
		if (!element) return;

		element.setAttribute("aria-live", importance);
		element.innerHTML = message;

		// should have a setTimeout to remove the message after a few seconds
		// that is because if the same message is repeated, the screen reader will not reread it.
		setTimeout(() => {
			element.innerHTML = "";
			element.setAttribute("aria-live", "off");
		}, 10000);
	};

	return {
		notifyOnScreenReader,
	};
};
