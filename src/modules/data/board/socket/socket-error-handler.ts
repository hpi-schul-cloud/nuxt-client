import { $axios } from "@/utils/api";
import { BoardErrorReportApiFactory, BoardErrorReportBodyParams } from "@api-server";
import { useSessionBroadcast } from "@util-broadcast-channel";
import { logger } from "@util-logger";
import { type Socket } from "socket.io-client";
import { computed } from "vue";
import { onBeforeRouteLeave } from "vue-router";

const logs: string[] = [];
const boardErrorReportApi = BoardErrorReportApiFactory(undefined, "/v3", $axios);

enum ConnectionState {
	STARTING = "starting",
	CONNECTED = "connected",
	RETRYING = "retrying",
	DISCONNECTED = "disconnected",
	RECONNECTING = "reconnecting",
	SUCCESS_AFTER_RETRIES = "success_after_retries",
	FAILED_AFTER_MAX_ATTEMPTS = "failed_after_max_attempts",
}

let connectionState: ConnectionState = ConnectionState.STARTING;

const { isJwtExpired } = useSessionBroadcast();

export const useConnectionErrorHandling = (socket: Socket) => {
	let startTime = Date.now();
	let timeoutHandle: NodeJS.Timeout | null = null;

	const log = (message: string) => {
		logs.push(`[${Date.now() - startTime}ms]${message}`);
	};

	const resetLogs = () => {
		startTime = Date.now();
		logs.splice(0, logs.length);
		if (timeoutHandle) {
			clearTimeout(timeoutHandle);
			timeoutHandle = null;
		}
	};

	const handleError = (error: Error & { data?: unknown }) => {
		const errorData = error.data as { code?: number; message?: string; status?: number } | undefined;
		log(`ERR:${errorData?.message ?? error.message}`);
	};

	// whenever this function is called the actual execution is delayed by X ms, if the function is called again within this delay, the previous call is canceled and the timer restarts
	const reportBoardError = (type: string, message: string, retryCount: number, logSteps: string[]) => {
		if (timeoutHandle) {
			clearTimeout(timeoutHandle);
		}
		timeoutHandle = setTimeout(() => {
			apiCall(type, message, retryCount, logSteps);
		}, 7000);

		if (logs.length > 30) {
			reportLogs("log_limit_reached");
		}
	};

	const apiCall = (type: string, message: string, retryCount: number, logSteps: string[], reportRetries = 3) => {
		if (isJwtExpired.value) {
			log("noSess");
			return;
		}

		const url = globalThis.location.href;
		const boardId = /boards\/([0-9a-fA-F]{24})/.exec(url)?.[1] ?? "unknown";
		const steps = [...logSteps, connectionState + " " + socket.io.engine.transport.name].join("|");
		const data: BoardErrorReportBodyParams = {
			type,
			message,
			url,
			boardId,
			retryCount,
			logSteps: steps,
		};

		boardErrorReportApi
			.boardErrorReportControllerReportError(data)
			.then(() => {
				if (timeoutHandle) {
					clearTimeout(timeoutHandle);
				}
			})
			.catch((err) => {
				logger.error(`Failed to report error (retries left ${reportRetries})`, err);
				if (reportRetries <= 0) {
					return;
				}
				timeoutHandle = setTimeout(() => {
					// try again in 5 seconds
					apiCall(type, message + " Failed => retry", retryCount, logSteps, reportRetries - 1);
				}, 5000);
			});
	};

	// attach socket- and manager-eventhandlers

	socket.on("connect", () => {
		connectionState = ConnectionState.CONNECTED;
	});

	socket.on("disconnect", () => {
		connectionState = ConnectionState.DISCONNECTED;
	});

	const manager = socket.io;

	manager.on("reconnect_attempt", (attempt) => {
		if (isJwtExpired.value) {
			log("noSess");
			socket.disconnect();
			return;
		}
		connectionState = ConnectionState.RECONNECTING;
		log(`re_att${attempt}`);
		reportBoardError("socketio_connection", "reconnect_attempt", attempt, [...logs]);
	});

	manager.on("reconnect", (attempts: number) => {
		connectionState = ConnectionState.SUCCESS_AFTER_RETRIES;
		log(`reconn`);
		apiCall("socketio_connection", "reconnect_succeeded", attempts, [...logs]);
		resetLogs();
	});

	manager.on("reconnect_failed", () => {
		connectionState = ConnectionState.FAILED_AFTER_MAX_ATTEMPTS;
		apiCall("socketio_connection", "reconnect_failed", 0, [...logs]);
		log("reconn_failed");
	});

	socket.on("connect_error", handleError);

	socket.io.engine.on("upgrade", () => {
		log(`upgr`);
	});

	// send logs when the user leaves the page or changes the tab to hidden

	document.addEventListener("visibilitychange", async () => {
		if (document.visibilityState === "hidden") {
			await reportLogs("tab_hidden");
		}
	});

	window.addEventListener("beforeunload", async () => {
		await reportLogs("page_unload");
	});

	onBeforeRouteLeave(async () => {
		await reportLogs("new_route");
	});

	const reportLogs = async (cause: string) => {
		if (logs.length > 0) {
			await apiCall("socketio_connection", cause, 0, [...logs]);
			resetLogs();
		}
	};

	// make state accessible for testing

	const engine = socket.io.engine;
	const getState = computed(() => ({ startTime, transport: engine.transport.name, connectionState, logs }));

	return {
		getState,
	};
};
