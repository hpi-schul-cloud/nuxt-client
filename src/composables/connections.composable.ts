import { useBoardNotifier } from "@util-board";
import { useI18n } from "vue-i18n";
let lossSocketConnection = false;
let lossInternetConnection = false;
let timeOutId: null | ReturnType<typeof setTimeout> = null;
let timeOut = false;

export const useConnectionStatus = () => {
	const { t } = useI18n();
	const { showFailure, showInfo } = useBoardNotifier();

	const notifySocketConnectionLost = () => {
		lossSocketConnection = true;
		showFailure(t("error.4500"));
	};

	const notifyReconnectSocket = () => {
		if (lossSocketConnection) {
			showInfo("Socket reconnected");
			lossSocketConnection = false;
		}
	};

	window.addEventListener("offline", () => {
		if (!lossInternetConnection) {
			showFailure(t("error.4500"));
			lossInternetConnection = true;
		}
	});

	window.addEventListener("online", () => {
		if (lossInternetConnection) {
			showInfo(t("common.notification.connection.restored"), false);
			lossInternetConnection = false;
		}
	});

	window.addEventListener("visibilitychange", () => {
		if (document.hidden) {
			clearTimeout(timeOutId as ReturnType<typeof setTimeout>);

			timeOutId = setTimeout(() => {
				timeOut = true;
			}, 3000);
		} else {
			if (timeOut) {
				showInfo("You should reload the page to get the latest data");
				timeOut = false;
				return;
			}

			clearTimeout(timeOutId as ReturnType<typeof setTimeout>);
		}
	});

	return {
		notifySocketConnectionLost,
		notifyReconnectSocket,
	};
};
