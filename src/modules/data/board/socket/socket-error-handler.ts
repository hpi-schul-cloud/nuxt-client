import { $axios } from "@/utils/api";
import { BoardErrorReportApiFactory } from "@api-server";
import { useSessionBroadcast } from "@util-broadcast-channel";
import { logger } from "@util-logger";
import Bowser from "bowser";
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

const { isJwtExpired } = useSessionBroadcast();

export const useConnectionErrorHandling = (socket: Socket) => {
	let startTime = Date.now();
	let timeoutHandle: NodeJS.Timeout | null = null;

	const log = (message: string) => {
		if (logs.length === 0) {
			startTime = Date.now();
		}
		const transport = socket.io.engine.transport.name;
		logs.push(`[${Date.now() - startTime}ms] ${transport} | ${message}`);
		logger.log(logs);
	};

	const resetLogs = () => {
		logs.splice(0, logs.length);
	};

	const handleError = (error: Error & { data?: unknown }) => {
		const errorData = error.data as { code?: number; message?: string; status?: number } | undefined;
		log(`ERR: ${errorData?.message ?? error.message}`);
	};

	const reportBoardError = (type: string, message: string, retryCount: number, delayMs = 100) => {
		const data = {
			type,
			message,
			retryCount,
			logSteps: logs,
		};
		logger.log(JSON.stringify(data, null, 2));
		delayedReportBoardError(type, message, retryCount, delayMs);
	};

	// whenever this function is called the actual execution is delayed by X ms, if the function is called again within this delay, the previous call is canceled and the timer restarts
	const delayedReportBoardError = (type: string, message: string, retryCount: number, delayMs: number) => {
		if (timeoutHandle) {
			clearTimeout(timeoutHandle);
		}
		timeoutHandle = setTimeout(() => {
			apiCall(type, message, retryCount);
		}, delayMs);
	};

	const apiCall = (type: string, message: string, retryCount: number) => {
		const url = globalThis.location.href;
		const boardId = /boards\/([0-9a-fA-F]{24})/.exec(url)?.[1] ?? "unknown";
		const { browser, os, platform } = Bowser.parse(globalThis.navigator.userAgent);
		const dataSubset = {
			type,
			message,
			url,
			boardId,
			retryCount,
			browser: `${browser.name} ${browser.version}`,
			os: `${os.name} ${os.version}`,
			deviceType: `${platform.type ?? "unknown"}`,
		};

		boardErrorReportApi
			.boardErrorReportControllerReportError(dataSubset)
			.then(() => {
				if (timeoutHandle) {
					clearTimeout(timeoutHandle);
				}
			})
			.catch((err) => {
				logger.error("Failed to report error - will retry in 5 seconds", err);
				timeoutHandle = setTimeout(() => {
					// try again in 5 seconds
					apiCall(type, message + " Failed => retry", retryCount);
				}, 5000);
			});
	};

	socket.on("connect", () => {
		connectionState = ConnectionState.CONNECTED;
	});

	socket.on("disconnect", () => {
		connectionState = ConnectionState.DISCONNECTED;
	});

	const manager = socket.io;

	manager.on("reconnect_attempt", (attempt) => {
		if (isJwtExpired.value) {
			log("JWT expired - will not attempt to reconnect");
			socket.disconnect();
			return;
		}
		connectionState = ConnectionState.RECONNECTING;
		log("reconnect_attempt");
		reportBoardError("reconnect_attempt", `Multiple reconnect attempts (${attempt})`, attempt, 6000);
	});

	manager.on("reconnect", (attempts: number) => {
		connectionState = ConnectionState.SUCCESS_AFTER_RETRIES;
		log(`reconnected after ${attempts} attempts`);
		reportBoardError("reconnect", `Connection restored after retry (${attempts} attempts)`, attempts, 500);
		resetLogs();
	});

	manager.on("reconnect_failed", () => {
		connectionState = ConnectionState.FAILED_AFTER_MAX_ATTEMPTS;
		reportBoardError("reconnect_failed", "Connection failed after maximum attempts", 0);
		log("reconnect_failed");
	});

	const engine = socket.io.engine;
	const getState = computed(() => ({ startTime, transport: engine.transport.name, connectionState, logs }));

	socket.on("connect_error", handleError);

	socket.io.engine.on("upgrade", (transport) => {
		log(`upgraded to ${transport.name}`);
	});

	return {
		getState,
	};
};
