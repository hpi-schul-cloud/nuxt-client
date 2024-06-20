import { computed, ref } from "vue";

type Importance = "polite" | "assertive";
const queueingMode = ref(false);
let handle: NodeJS.Timeout | null = null;

export const useAriaLiveNotifier = () => {
	const messages = ref({
		polite: <string[]>[],
		assertive: <string[]>[],
	});

	const numberOfMessages = computed(
		() => messages.value["polite"].length + messages.value["assertive"].length
	);

	const notifyOnScreenReader = (
		message: string,
		importance: Importance = "polite"
	) => {
		messages.value[importance].push(message);
		handleMessageOutput();
	};

	const handleMessageOutput = () => {
		if (numberOfMessages.value > 0) {
			if (queueingMode.value === true) {
				ensurePeriodicRetry();
				return;
			}
			writeAllMessages();
			stopPeriodicRetry();
		}
	};

	const ensurePeriodicRetry = () => {
		if (handle === undefined) {
			handle = setInterval(handleMessageOutput, 1000);
		}
	};

	const stopPeriodicRetry = () => {
		if (handle) {
			clearInterval(handle);
		}
	};

	const writeAllMessages = () => {
		writeMessages("polite");
		writeMessages("assertive");
	};

	const writeMessages = (importance: Importance) => {
		const element = document.getElementById(
			`notify-screen-reader-${importance}`
		);

		if (!element) {
			throw new Error(
				`useAriaLiveNotifier: Element with id >notify-screen-reader-${importance}< not found`
			);
		}

		element.innerHTML = messages.value[importance]
			.map((m) => `<span>${m}</span>`)
			.join("");

		messages.value[importance] = [];
	};

	const queueAriaLiveNotifications = () => {
		queueingMode.value = true;
	};

	const outputAriaLiveNotifications = () => {
		queueingMode.value = false;
	};

	return {
		notifyOnScreenReader,
		queueAriaLiveNotifications,
		outputAriaLiveNotifications,
	};
};
