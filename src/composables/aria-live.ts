export const useAriaLive = () => {
	const notifyOnScreenReader = (
		message: string,
		importance: "off" | "polite" | "assertive" | "rude"
	) => {
		// const action = actionTypeMap[actionType as keyof typeof actionTypeMap];
		// if (!action) return;

		// should be a div with aria-live="polite | assertive" attribute
		// and should be appended to the root of the application or the main layout
		// the aria-live attribute should be set polite or assertive based on the importance of the message
		const element = document.getElementById("notify-on-screen-reader");
		if (!element) return;

		element.setAttribute("aria-live", importance);
		element.innerHTML = message;

		// should have a setTimeout to remove the message after a few seconds
		// that is because to avoid repeating messages
		// and also if the same message is repeated, the screen reader will not read it again
		setTimeout(() => {
			element.innerHTML = "";
		}, 5000);
	};

	return {
		notifyOnScreenReader,
	};
};
