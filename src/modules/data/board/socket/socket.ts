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
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

const isInitialConnection = ref(true);
const dispatchHandlers: Array<(action: Action) => void> = [];
let instance: Socket | null = null;
let timeoutFn: ReturnType<typeof useTimeoutFn>;
let retryCount = 0;

export const resetSocketStateForTesting = () => {
	instance = null;
	dispatchHandlers.length = 0;
	retryCount = 0;
};

export const useSocketConnection = (dispatch: (action: Action) => void, options?: { isInitialConnection: boolean }) => {
	dispatchHandlers.push(dispatch);
	const boardStore = useBoardStore();
	const cardStore = useCardStore();
	const { t } = useI18n();

	const boardErrorReportApi = BoardErrorReportApiFactory(undefined, "/v3", $axios);

	isInitialConnection.value = options?.isInitialConnection !== undefined ? options.isInitialConnection : true;

	const getConnectedSocket = () => {
		if (instance === null) {
			instance = io(useEnvConfig().value.BOARD_COLLABORATION_URI, {
				path: "/board-collaboration",
				withCredentials: true,
				reconnectionAttempts: 20,
				closeOnBeforeunload: true,
			});

			instance.onAny((event, payload) => {
				dispatchHandlers.forEach((handler) => handler({ type: event, payload }));
			});

			instance.on("connect", async function () {
				logger.log("connected");
				if (retryCount > 0) {
					reportBoardError("connect after retry", "Connection restored after retry");
					retryCount = 0;
				}

				if (isInitialConnection.value) return;
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
				isInitialConnection.value = false;
				timeoutFn = useTimeoutFn(() => {
					notifyError(t("error.4500"));
				}, 1000);
			});

			instance.on("connect_error", (error: Error & { data?: unknown }) => {
				const errorData = error.data as { code?: number; message?: string; status?: number } | undefined;
				if (errorData?.message === "Session ID unknown") {
					reportBoardError("session_id_unknown", "Session ID unknown - automatically reset connection.");
					disconnectSocket();
				} else if (retryCount > 20) {
					reportBoardError("connect_error", "Max reconnection attempts reached");
					notifyError(t("error.4500"));
					retryCount = 0;
				} else {
					reportBoardError("connect_error", errorData?.message ?? error.message);
				}
				retryCount++;
			});
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
		isInitialConnection.value = true;
		if (timeoutFn?.isPending.value) timeoutFn.stop();
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
			logger.error("Failed to report error", err);
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
