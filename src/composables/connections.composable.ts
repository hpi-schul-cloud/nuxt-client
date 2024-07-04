import { useBoardNotifier } from "@util-board";
import { useTimeoutFn } from "@vueuse/core";
import { useI18n } from "vue-i18n";

const connectionOptions = {
	lossSocketConnection: false,
	lossInternetConnection: false,
	timeout: false,
	MAX_TIME_OUT_FOR_INACTIVITY: 3000,
};

export const useConnectionStatus = () => {
	const { t } = useI18n();
	const { showFailure, showInfo } = useBoardNotifier();

	const notifySocketConnectionLost = () => {
		connectionOptions.lossSocketConnection = true;
		showFailure(t("error.4500"));
	};

	const notifyReconnectSocket = () => {
		if (connectionOptions.lossSocketConnection) {
			showInfo("Socket reconnected");
			connectionOptions.lossSocketConnection = false;
		}
	};

	window.addEventListener("offline", () => {
		if (!connectionOptions.lossInternetConnection) {
			showFailure(t("error.4500"));
			connectionOptions.lossInternetConnection = true;
		}
	});

	window.addEventListener("online", () => {
		if (connectionOptions.lossInternetConnection) {
			showInfo(t("common.notification.connection.restored"));
			connectionOptions.lossInternetConnection = false;
		}
	});

	const timeoutFn = useTimeoutFn(() => {
		connectionOptions.timeout = true;
	}, connectionOptions.MAX_TIME_OUT_FOR_INACTIVITY);

	window.addEventListener("visibilitychange", () => {
		if (timeoutFn.isPending) timeoutFn.stop();

		if (document.hidden) timeoutFn.start();

		if (connectionOptions.timeout) {
			showInfo("You should reload the page to get the latest data");
			connectionOptions.timeout = false;
		}
	});

	return {
		notifySocketConnectionLost,
		notifyReconnectSocket,
	};
};
