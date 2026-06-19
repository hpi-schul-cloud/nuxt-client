import { $axios } from "@/utils/api";
import { BoardErrorReportApiFactory, BoardErrorReportBodyParams } from "@api-server";
import { logger } from "@util-logger";
import { useEventListener } from "@vueuse/core";
import { type Socket } from "socket.io-client";
import { computed } from "vue";

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

export const useConnectionErrorHandling = (socket: Socket) => {
	let startTime = Date.now();
	let timeoutHandle: NodeJS.Timeout | null = null;
	let inFlightReport: Promise<void> | null = null;
	let pendingReport: {
		type: string;
		message: string;
		retryCount: number;
		logSteps: string[];
		reportRetries: number;
	} | null = null;

	const log = (message: string) => {
		logs.push(`[${Date.now() - startTime}ms]${message}`);
	};

	const clearScheduledReport = () => {
		if (timeoutHandle) {
			clearTimeout(timeoutHandle);
			timeoutHandle = null;
		}
	};

	const resetLogs = () => {
		startTime = Date.now();
		logs.splice(0, logs.length);
		clearScheduledReport();
	};

	const handleError = (error: Error & { data?: unknown }) => {
		const errorData = error.data as { code?: number; message?: string; status?: number } | undefined;
		log(`ERR:${errorData?.message ?? error.message}`);
	};

	// whenever this function is called the actual execution is delayed by X ms, if the function is called again within this delay, the previous call is canceled and the timer restarts
	const reportBoardError = (type: string, message: string, retryCount: number, logSteps: string[]) => {
		clearScheduledReport();
		timeoutHandle = setTimeout(() => {
			void apiCall(type, message, retryCount, logSteps);
		}, 7000);

		if (logs.length > 30) {
			reportLogs("log_limit_reached");
		}
	};

	const apiCall = async (
		type: string,
		message: string,
		retryCount: number,
		steps: string[] = [],
		reportRetries = 3
	): Promise<void> => {
		const report = { type, message, retryCount, logSteps: steps, reportRetries };

		if (inFlightReport) {
			pendingReport = report;
			return inFlightReport;
		}

		const url = globalThis.location.href;
		const boardId = /boards\/([0-9a-fA-F]{24})/.exec(url)?.[1] ?? "unknown";
		const logSteps = [...report.logSteps, `${connectionState} ${socket.io.engine.transport.name ?? "unknown"}`].join(
			"|"
		);
		const data: BoardErrorReportBodyParams = {
			type: report.type,
			message: report.message,
			url,
			boardId,
			retryCount: report.retryCount,
			logSteps,
		};

		inFlightReport = (async () => {
			try {
				await boardErrorReportApi.boardErrorReportControllerReportError(data);
			} catch (err) {
				logger.error(`Failed to report error (retries left ${reportRetries})`, err);
				if (report.reportRetries <= 0) {
					return;
				}
				clearScheduledReport();
				timeoutHandle = setTimeout(() => {
					// try again in 5 seconds
					const { type, message, retryCount, logSteps, reportRetries } = report;
					void apiCall(type, message + " Failed => retry", retryCount, logSteps, reportRetries - 1);
				}, 5000);
			} finally {
				inFlightReport = null;
				if (pendingReport) {
					const { type, message, retryCount, logSteps, reportRetries } = pendingReport;
					pendingReport = null;
					clearScheduledReport();
					await apiCall(type, message, retryCount, logSteps, reportRetries);
				}
			}
		})();

		return inFlightReport;
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

	const cancelSocketReconnection = () => {
		void apiCall("socketio_connection", "reconnect_usr_canceled", 0, [...logs]);
		resetLogs();
		socket.disconnect();
		socket.close();
	};

	socket.on("connect_error", handleError);

	socket.io.engine.on("upgrade", () => {
		log(`upgr`);
	});

	// send logs when the user leaves the page or changes the tab to hidden

	useEventListener(document, "visibilitychange", () => {
		if (document.visibilityState === "hidden") {
			reportLogs("tab_hidden");
		}
	});

	useEventListener(globalThis, "beforeunload", () => {
		reportLogs("page_unload");
	});

	const reportLogs = (cause: string) => {
		if (logs.length > 0) {
			apiCall("socketio_connection", cause, 0, [...logs]);
			resetLogs();
		}
	};

	// make state accessible for testing

	const engine = socket.io.engine;
	const getState = computed(() => ({ startTime, transport: engine.transport.name, connectionState, logs }));

	return {
		cancelSocketReconnection,
		getState,
	};
};
