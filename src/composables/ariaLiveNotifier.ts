import { useDebounceFn } from "@vueuse/core";

export const useAriaLiveNotifier = () => {
	const notifyOnScreenReader = useDebounceFn(
		(
			message: string,
			importance: "off" | "polite" | "assertive" = "polite"
		) => {
			// should be a div with aria-live="polite | assertive" attribute
			// and should be appended to the upper level of the DOM tree
			// the aria-live attribute should be set polite or assertive based on the importance of the message
			const element = document.getElementById(
				importance === "polite"
					? "notify-screen-reader-polite"
					: "notify-screen-reader-assertive"
			);

			if (!element) return;

			element.innerHTML = "";
			element.innerHTML = message;
		},
		1000,
		{ maxWait: 2000 }
	);

	return {
		notifyOnScreenReader,
	};
};
