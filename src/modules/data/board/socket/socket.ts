import { useBoardStore } from "../Board.store";
import { useCardStore } from "../Card.store";
import { BoardErrorReportApiFactory } from "@/serverApi/v3";
import { Action } from "@/types/board/ActionFactory";
import { $axios } from "@/utils/api";
import { notifyError, notifySuccess } from "@data-app";
import { useEnvConfig } from "@data-env";
import { logger } from "@util-logger";
import { useTimeoutFn } from "@vueuse/shared";
import { io, type Socket } from "socket.io-client";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const dispatchHandlers: Array<(action: Action) => void> = [];
let isInitialConnection = true;
let instance: Socket | null = null;
let timeoutFn: ReturnType<typeof useTimeoutFn>;
let retryCount = 0;

export const resetSocketStateForTesting = (initialRetryCount = 0) => {
	instance = null;
	dispatchHandlers.length = 0;
	retryCount = initialRetryCount;
};

export const useSocketConnection = (dispatch: (action: Action) => void) => {
	dispatchHandlers.push(dispatch);
	const boardStore = useBoardStore();
	const cardStore = useCardStore();
	const { t } = useI18n();

	const boardErrorReportApi = BoardErrorReportApiFactory(undefined, "/v3", $axios);

	const getConnectedSocket = () => {
		if (instance === null) {
			instance = io(useEnvConfig().value.BOARD_COLLABORATION_URI, {
				path: "/board-collaboration",
				withCredentials: true,
				closeOnBeforeunload: true,
			});

			instance.onAny((event, payload) => {
				dispatchHandlers.forEach((handler) => handler({ type: event, payload }));
			});

			instance.on("connect", async function () {
				logger.log("connected");
				if (isInitialConnection) return;
				if (timeoutFn.isPending?.value) {
					timeoutFn.stop();
					return;
				}
				notifySuccess(t("common.notification.connection.restored"));
				if (!(boardStore.board && cardStore.cards)) return;
				await boardStore.reloadBoard();
				await cardStore.fetchCardRequest({
					cardIds: Object.keys(cardStore.cards),
				});
			});

			instance.on("disconnect", (reason, details) => {
				logger.log("disconnected");
				logger.log(reason, details);
				isInitialConnection = false;
				timeoutFn = useTimeoutFn(() => {
					notifyError(t("error.4500"));
				}, 1000);
			});

			addErrorHandling(instance);
		}
		if (!instance.connected) {
			instance.connect();
		}

		return instance;
	};

	const emitOnSocket = (action: string, data: unknown) => {
		const socket = getConnectedSocket();
		socket.emit(action, data);
	};

	const emitWithAck = (action: string, data: unknown) => {
		const socket = getConnectedSocket();
		return socket.timeout(30000).emitWithAck(action, data);
	};

	const disconnectSocket = () => {
		if (instance && instance.connected) {
			instance.disconnect();
		}
		instance = null;
		isInitialConnection = true;
		if (timeoutFn?.isPending.value) timeoutFn.stop();
	};

	const addErrorHandling = (instance: Socket) => {
		instance.on("connect_error", errorHandler);
		instance.on("connect", async function () {
			if (retryCount > 0) {
				reportBoardError("connect after retry", "Connection restored after retry");
				retryCount = 0;
			}
		});
	};

	const errorHandler = (error: Error & { data?: unknown }) => {
		const errorData = error.data as { code?: number; message?: string; status?: number } | undefined;
		if (errorData?.message === "Session ID unknown") {
			reportBoardError("session_id_unknown", "Session ID unknown - automatically reset connection.");
			// disconnect the socket - it will reconnect automatically on next emit
			disconnectSocket();
			return;
		}

		if (retryCount % 5 === 4) {
			// report every 5th try to establish the connection to the server
			reportBoardError("connect_error", errorData?.message ?? error.message);
			notifyError(t("error.4500"));
		}
		retryCount++;
	};

	const reportBoardError = (type: string, message: string) => {
		const url = window.location.href;
		const boardId = url.match(/boards\/([0-9a-fA-F]{24})/)?.[1] ?? "unknown";
		const dataWithBoardId = {
			type,
			message,
			url,
			boardId,
			retryCount,
		};

		boardErrorReportApi.boardErrorReportControllerReportError(dataWithBoardId).catch((err) => {
			logger.error("Failed to report error - will retry in 5 seconds", err);
			setTimeout(() => {
				// try again in 5 seconds
				reportBoardError(type, message);
			}, 5000);
		});
	};

	const connected = computed(() => instance?.connected ?? false);

	return {
		connected,
		getConnectedSocket,
		emitOnSocket,
		emitWithAck,
		disconnectSocket,
	};
};
