import { ref } from "vue";

const silentMode = ref(false);
let intervalHandle: NodeJS.Timeout | null = null;

export const useAriaLiveNotifier = () => {
	const messagesPolite = ref<string[]>([]);
	const messagesAssertive = ref<string[]>([]);
	const notifyOnScreenReader = (
		message: string,
		importance: "off" | "polite" | "assertive" = "polite"
	) => {
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
			if (silentMode.value === true) {
				if (!intervalHandle) {
					intervalHandle = setInterval(checkMessage, 1000);
				}
			} else {
				writeMessages();
				if (intervalHandle) {
					clearInterval(intervalHandle);
				}
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
	};

	const outputScreenReaderNotifications = () => {
		silentMode.value = false;
	};

	// setTimeout(() => {
	// 	notifyOnScreenReader("one");
	// }, 10000);

	// setTimeout(() => {
	// 	notifyOnScreenReader("Two");
	// }, 12000);

	// setTimeout(() => {
	// 	notifyOnScreenReader("three");
	// }, 13000);

	// setTimeout(() => {
	// 	notifyOnScreenReader("four");
	// }, 14000);

	return {
		notifyOnScreenReader,
		queueScreenReaderNotifications,
		outputScreenReaderNotifications,
	};
};
