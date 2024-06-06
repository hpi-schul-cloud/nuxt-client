import { useDebounceFn } from "@vueuse/core";

export const useAriaLiveNotifier = () => {
	const notifyOnScreenReader = useDebounceFn(
		(message: string, importance: "off" | "polite" | "assertive") => {
			// should be a div with aria-live="polite | assertive" attribute
			// and should be appended to the upper level of the DOM tree
			// the aria-live attribute should be set polite or assertive based on the importance of the message
			const element = document.getElementById("notify-on-screen-reader");
			if (!element) return;

			element.innerHTML = "";
			element.setAttribute("aria-live", importance);
			element.innerHTML = message;
		},
		1000,
		{ maxWait: 2000 }
	);

	return {
		notifyOnScreenReader,
	};
};
