import { useBoardNotifier } from "@util-board";
import { useTimeoutFn } from "@vueuse/core";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
const lossSocketConnection = ref(false);
const lossInternetConnection = ref(false);
const timeout = ref(false);
const MAX_TIME_OUT_FOR_INACTIVITY = 3000;

export const useConnectionStatus = () => {
	const { t } = useI18n();
	const { showFailure, showInfo } = useBoardNotifier();

	const notifySocketConnectionLost = () => {
		lossSocketConnection.value = true;
		showFailure(t("error.4500"));
	};

	const notifyReconnectSocket = () => {
		if (lossSocketConnection.value) {
			showInfo("Socket reconnected");
			lossSocketConnection.value = false;
		}
	};

	window.addEventListener("offline", () => {
		if (!lossInternetConnection.value) {
			showFailure(t("error.4500"));
			lossInternetConnection.value = true;
		}
	});

	window.addEventListener("online", () => {
		if (lossInternetConnection.value) {
			showInfo(t("common.notification.connection.restored"));
			lossInternetConnection.value = false;
		}
	});

	window.addEventListener("visibilitychange", () => {
		const timeoutFn = useTimeoutFn(() => {
			timeout.value = true;
		}, MAX_TIME_OUT_FOR_INACTIVITY);

		if (document.hidden) {
			timeoutFn.stop();
			timeoutFn.start();
		} else {
			if (timeout.value) {
				showInfo("You should reload the page to get the latest data");
				timeout.value = false;
				return;
			}

			timeoutFn.stop();
		}
	});

	return {
		notifySocketConnectionLost,
		notifyReconnectSocket,
	};
};
