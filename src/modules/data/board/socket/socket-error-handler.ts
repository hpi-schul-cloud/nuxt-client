import { BoardErrorReportApiFactory } from "@/serverApi/v3";
import { $axios } from "@/utils/api";
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

export const useConnectionErrorHandling = (socket: Socket) => {
	let startTime = Date.now();
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

	const reportBoardError = (type: string, message: string, retryCount: number) => {
		const url = globalThis.location.href;
		const boardId = /boards\/([0-9a-fA-F]{24})/.exec(url)?.[1] ?? "unknown";
		const { browser, os, platform } = Bowser.parse(globalThis.navigator.userAgent);
		const data = {
			type,
			message,
			url,
			boardId,
			retryCount,
			logSteps: logs,
			browser: `${browser.name} ${browser.version}`,
			os: `${os.name} ${os.version}`,
			deviceType: `${platform.type ?? "unknown"}`,
		};
		logger.log(data);

		boardErrorReportApi.boardErrorReportControllerReportError(data).catch((err) => {
			logger.error("Failed to report error - will retry in 5 seconds", err);
			setTimeout(() => {
				// try again in 5 seconds
				reportBoardError(type, message, retryCount);
			}, 5000);
		});
	};

	const manager = socket.io;

	manager.on("reconnect_attempt", (attempt) => {
		connectionState = ConnectionState.RECONNECTING;
		log("reconnect_attempt");
		if (attempt > 3) {
			reportBoardError("reconnect_attempt", "Multiple reconnect attempts", attempt);
		}
	});

	manager.on("reconnect", (attempts: number) => {
		connectionState = ConnectionState.SUCCESS_AFTER_RETRIES;
		log(`reconnected after ${attempts} attempts`);
		reportBoardError("connect_after_retry", "Connection restored after retry", attempts);
		resetLogs();
	});

	manager.on("reconnect_failed", () => {
		connectionState = ConnectionState.FAILED_AFTER_MAX_ATTEMPTS;
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
