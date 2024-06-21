import { computed, ref } from "vue";
import { useDebounceFn } from "@vueuse/core";

type Importance = "polite" | "assertive";
const queueingMode = ref(false);
const notifications = ref({
	polite: <string[]>[],
	assertive: <string[]>[],
});
let handle: NodeJS.Timeout | null = null;

export const useAriaLiveNotifier = () => {
	const numberOfNotifications = computed(
		() =>
			notifications.value["polite"].length +
			notifications.value["assertive"].length
	);

	const notifyOnScreenReader = (
		message: string,
		importance: Importance = "polite"
	) => {
		notifications.value[importance].push(message);
		console.log(
			"notifyOnScreenReader",
			message,
			notifications.value[importance].length
		);
		handleMessageOutput();
	};

	const handleMessageOutput = () => {
		console.log(
			"handleMessageOutput",
			numberOfNotifications.value,
			queueingMode.value
		);
		if (numberOfNotifications.value > 0) {
			if (queueingMode.value === true) {
				ensurePeriodicRetry();
				return;
			}
			writeAllNotifications();
			stopPeriodicRetry();
		}
	};

	const ensurePeriodicRetry = () => {
		console.log("ensurePeriodicRetry");
		if (handle === undefined) {
			handle = setInterval(handleMessageOutput, 1000);
		}
	};

	const stopPeriodicRetry = () => {
		if (handle) {
			clearInterval(handle);
		}
	};

	const writeAllNotifications = () => {
		writeNotifications("polite");
		writeNotifications("assertive");
		stopPeriodicRetry();
	};

	const writeNotifications = (importance: Importance) => {
		const element = document.getElementById(
			`notify-screen-reader-${importance}`
		);

		if (!element) {
			throw new Error(
				`useAriaLiveNotifier: Element with id >notify-screen-reader-${importance}< not found`
			);
		}

		if (notifications.value[importance].length > 0) {
			element.innerHTML = notifications.value[importance]
				.map((m) => `<span>${m}</span>`)
				.join("");
		}

		notifications.value[importance] = [];
		queueingMode.value = false;
	};

	const queueAriaLiveNotifications = () => {
		queueingMode.value = true;
	};

	const ensurePoliteNotifications = () => {
		queueAriaLiveNotifications();
		processNotificationsDebounced();
	};

	const processNotificationsDebounced = useDebounceFn(
		writeAllNotifications,
		1500,
		{ maxWait: 30000 }
	);

	return {
		notifyOnScreenReader,
		ensurePoliteNotifications,
		writeAllNotifications,
	};
};
