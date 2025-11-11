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
let instance: Socket | null = null;
const _connected = ref(false);
const dispatchHandlers = Array<(action: Action) => void>();
let timeoutFn: ReturnType<typeof useTimeoutFn>;
let retryCount = 0;

export const __resetSocketStateForTesting = () => {
	instance = null;
	_connected.value = false;
	dispatchHandlers.length = 0;
	isInitialConnection.value = true;
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

			instance.on("connect", async function () {
				_connected.value = true;
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
				_connected.value = false;
				logger.log("disconnected");
				logger.log(reason, details);
				isInitialConnection.value = false;
				timeoutFn = useTimeoutFn(() => {
					notifyError(t("error.4500"));
				}, 1000);
			});

			instance.on("connect_error", (error: Error & { data?: unknown }) => {
				const { type, message } = error as unknown as {
					type: string;
					message: string;
					data?: { code?: number; message?: string; status?: number };
				};

				// TODO: check
				// Prüfe auf Session-ID-Fehler
				if (
					error &&
					(error.data as unknown) &&
					(error.data as { code?: number; message?: string; status?: number }).code === 1 &&
					(error.data as { code?: number; message?: string; status?: number }).message === "Session ID unknown" &&
					(error.data as { code?: number; message?: string; status?: number }).status === 400
				) {
					notifyError(t("error.sessionIdUnknown"));
					reportBoardError("session_id_unknown", "Session ID unknown - please reload or re-authenticate.");
					// Optional: Automatisch disconnecten oder neu verbinden
					disconnectSocket();
					instance = null;
					return;
				}

				reportBoardError("connect_error", message ?? type);

				if (retryCount > 20) {
					reportBoardError("connect_error", "Max reconnection attempts reached");
					notifyError(t("error.4500"));
					retryCount = 0;
					return;
				}

				retryCount++;
			});

			instance.onAny((event, ...args) => {
				dispatchHandlers.forEach((handler) => handler({ type: event, payload: args[0] }));
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

	const connected = computed(() => _connected.value);

	return {
		connected,
		getConnectedSocket,
		emitOnSocket,
		emitWithAck,
		disconnectSocket,
		__resetSocketStateForTesting,
	};
};
