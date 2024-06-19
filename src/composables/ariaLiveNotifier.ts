import { ref } from "vue";

export const useAriaLiveNotifier = () => {
	const messagesPolite = ref<string[]>([]);
	const messagesAssertive = ref<string[]>([]);
	const silentMode = ref(false);
	const notifyOnScreenReader = (
		message: string,
		importance: "off" | "polite" | "assertive" = "polite"
	) => {
		// should be a div with aria-live="polite | assertive" attribute
		// and should be appended to the upper level of the DOM tree
		// the aria-live attribute should be set polite or assertive based on the importance of the message

		if (importance === "polite") {
			messagesPolite.value.push(message);
		}

		if (importance === "assertive") {
			messagesAssertive.value.push(message);
		}

		checkMessage();
	};

	const checkMessage = () => {
		if (messagesPolite.value.length > 0 || messagesAssertive.value.length > 0) {
			if (silentMode.value) {
				setTimeout(checkMessage, 1000);
			} else {
				writeMessages();
			}
		}
	};

	const writeMessages = () => {
		const elementPolite = document.getElementById(
			"notify-screen-reader-polite"
		);
		const elementAssertive = document.getElementById(
			"notify-screen-reader-assertive"
		);
		if (!(elementPolite && elementAssertive)) {
			console.error(`Element with id notify-screen-reader not found`);
			return;
		}

		elementPolite.innerHTML = messagesPolite.value
			.map((m) => `<span>${m}</span>`)
			.join("");

		elementAssertive.innerHTML = messagesAssertive.value
			.map((m) => `<span>${m}</span>`)
			.join("");

		messagesPolite.value = [];
		messagesAssertive.value = [];
	};

	const queueScreenReaderNotifications = () => {
		silentMode.value = true;
		console.trace("silentMode: ", silentMode.value);
	};

	const processQueuedScreenReaderNotifications = () => {
		silentMode.value = false;
		console.trace("silentMode: ", silentMode.value);
	};

	setTimeout(() => {
		notifyOnScreenReader(
			"Hello, this is a polite message -" + silentMode.value
		);
	}, 1000);

	setTimeout(() => {
		notifyOnScreenReader(
			"Hello, this is a polite message - 2 -" + silentMode.value
		);
	}, 5000);

	return {
		notifyOnScreenReader,
		queueScreenReaderNotifications,
		processQueuedScreenReaderNotifications,
	};
};
