import { computed, ref } from "vue";

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
		importance: "polite" | "assertive" = "polite"
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

	const writeMessages = (importance: "polite" | "assertive") => {
		const element = document.getElementById(
			`notify-screen-reader-${importance}`
		);

		if (!element) {
			console.error(
				`Element with id notify-screen-reader-${importance} not found`
			);
			return;
		}

		element.innerHTML = messages.value[importance]
			.map((m) => `<span>${m}</span>`)
			.join("");

		messages.value[importance] = [];
	};

	const queueScreenReaderNotifications = () => {
		queueingMode.value = true;
	};

	const outputScreenReaderNotifications = () => {
		queueingMode.value = false;
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
