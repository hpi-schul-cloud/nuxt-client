import { useDebounceFn } from "@vueuse/core";
import { computed, ref } from "vue";

type Importance = "polite" | "assertive";
let mode: "write" | "queue" = "write";
const notifications = ref({
	polite: <string[]>[],
	assertive: <string[]>[],
});
let handle: NodeJS.Timeout | null = null;

export const useAriaLiveNotifier = () => {
	const numberOfNotifications = computed(
		() => notifications.value["polite"].length + notifications.value["assertive"].length
	);

	const notifyOnScreenReader = (message: string, importance: Importance = "polite") => {
		notifications.value[importance].push(message);
		handleNotificationWriting();
	};

	const ensurePoliteNotifications = () => {
		mode = "queue";
		processNotificationsDebounced();
	};

	const processNotificationsDebounced = useDebounceFn(
		() => {
			mode = "write";
			handleNotificationWriting(); // explicit call needed for test
		},
		1500,
		{ maxWait: 30000 }
	);

	const handleNotificationWriting = () => {
		if (numberOfNotifications.value > 0) {
			if (mode === "write") {
				stopPeriodicRetry();
				writeAllNotifications();
				return;
			} else {
				startPeriodicRetry();
			}
		}
	};

	const startPeriodicRetry = () => {
		if (handle === null) {
			handle = setInterval(handleNotificationWriting, 1000);
		}
	};

	const stopPeriodicRetry = () => {
		if (handle) {
			clearInterval(handle);
			handle = null;
		}
	};

	const writeAllNotifications = () => {
		writeNotifications("polite");
		writeNotifications("assertive");
	};

	const writeNotifications = (importance: Importance) => {
		const element = getElement(importance);

		if (element && notifications.value[importance].length > 0) {
			element.innerHTML = notifications.value[importance].map((m) => `<span>${m}</span>`).join("");
			notifications.value[importance] = [];
		}
	};

	const getElement = (importance: Importance): HTMLElement | null => {
		const element = document.getElementById(`notify-screen-reader-${importance}`);

		return element;
	};

	return {
		notifyOnScreenReader,
		ensurePoliteNotifications,
	};
};
