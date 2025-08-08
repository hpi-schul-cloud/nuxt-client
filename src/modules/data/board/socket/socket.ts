import { io, type Socket } from "socket.io-client";
import { Action } from "@/types/board/ActionFactory";
import { envConfigModule } from "@/store";
import { useBoardStore } from "../Board.store";
import { useCardStore } from "../Card.store";
import { useBoardNotifier } from "@util-board";
import { useI18n } from "vue-i18n";
import { useTimeoutFn } from "@vueuse/shared";
import { ref } from "vue";
import { logger } from "@util-logger";
import { BoardErrorReportApiFactory } from "@/serverApi/v3";
import { $axios } from "@/utils/api";

const isInitialConnection = ref(true);
let instance: Socket | null = null;
let timeoutFn: ReturnType<typeof useTimeoutFn>;
let retryCount = 0;

export const useSocketConnection = (
	dispatch: (action: Action) => void,
	options?: { isInitialConnection: boolean }
) => {
	const boardStore = useBoardStore();
	const cardStore = useCardStore();
	const { showFailure, showSuccess } = useBoardNotifier();
	const { t } = useI18n();

	const boardErrorReportApi = BoardErrorReportApiFactory(
		undefined,
		"/v3",
		$axios
	);

	isInitialConnection.value =
		options?.isInitialConnection !== undefined
			? options.isInitialConnection
			: true;

	if (instance === null) {
		instance = io(envConfigModule.getEnv.BOARD_COLLABORATION_URI, {
			path: "/board-collaboration",
			withCredentials: true,
			transports: ["websocket"],
		});

		instance.on("connect", async function () {
			logger.log("connected");
			if (retryCount > 0) {
				const url = window.location.href;
				const boardId =
					url.match(/boards\/([0-9a-fA-F]{24})/)?.[1] ?? "unknown";
				const data = {
					type: "connect after retry",
					message: "Connection restored after retry",
					url,
					boardId,
					retryCount,
				};
				reportBoardError(data);
			}

			retryCount = 0;
			if (isInitialConnection.value) return;
			if (timeoutFn.isPending?.value) {
				timeoutFn.stop();
				return;
			}
			showSuccess(t("common.notification.connection.restored"));

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
				showFailure(t("error.4500"));
			}, 1000);
		});

		instance.on("connect_error", (error: Error) => {
			const { type, description, message } = error as unknown as {
				type: string;
				description: string;
				message: string;
			};

			logger.log("connect_error description", type, description, message);
			const url = window.location.href;
			const boardId = url.match(/boards\/([0-9a-fA-F]{24})/)?.[1] ?? "unknown";
			const data = {
				type: "connect_error",
				message: message ?? type,
				url,
				boardId,
				retryCount,
			};
			reportBoardError(data);
			logger.log(data);

			retryCount++;
			// showFailure(t("error.4500"));
		});
	}

	const socket = instance;

	socket.onAny((event, ...args) => {
		dispatch({ type: event, payload: args[0] });
	});

	const emitOnSocket = (action: string, data: unknown) => {
		if (!socket.connected) {
			socket.connect();
		}
		socket.emit(action, data);
	};

	const emitWithAck = (action: string, data: unknown) => {
		if (!socket.connected) {
			socket.connect();
		}
		return socket.timeout(30000).emitWithAck(action, data);
	};

	const disconnectSocket = () => {
		socket.disconnect();
		isInitialConnection.value = true;
		if (timeoutFn.isPending.value) timeoutFn.stop();
	};

	const reportBoardError = (data) => {
		boardErrorReportApi
			.boardErrorReportControllerReportError(data)
			.catch((err) => {
				logger.error("Failed to report error", err);
			});
	};

	return {
		emitOnSocket,
		emitWithAck,
		disconnectSocket,
	};
};
