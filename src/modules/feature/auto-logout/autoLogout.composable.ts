import { SessionStatus } from "./types";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { $axios } from "@/utils/api";
import { AlertStatus, useAppStore, useNotificationStore } from "@data-app";
import { useEnvConfig } from "@data-env";
import { logger } from "@util-logger";
import { useBroadcastChannel } from "@vueuse/core";
import { computed, readonly, Ref, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const JWT_TIMER_ENDPOINT = "/v1/accounts/jwtTimer";
const MAX_RETRIES = 3;
const DEFAULT_TIMEOUT_SECONDS = 2 * 60 * 60; // 2 hours
const DEFAULT_WARNING_SECONDS = 1 * 60 * 60; // 1 hour

export const useAutoLogout = () => {
	const { t } = useI18n();
	const { execute } = useSafeAxiosTask();

	const showDialog = ref(false);
	const errorOnExtend = ref(false);
	const sessionStatus = ref<SessionStatus | null>(null);

	const { JWT_SHOW_TIMEOUT_WARNING_SECONDS, JWT_TIMEOUT_SECONDS } = useEnvConfig().value;
	const SESSION_TIMEOUT = JWT_TIMEOUT_SECONDS || DEFAULT_TIMEOUT_SECONDS;
	const WARNING_THRESHOLD = JWT_SHOW_TIMEOUT_WARNING_SECONDS || DEFAULT_WARNING_SECONDS;

	// --- Countdown Timer Management ---

	const useCountdownTimer = (handleTimerTick: () => void) => {
		const remainingTimeInSeconds = ref(0);
		const remainingTimeInMinutes = computed(() => Math.max(Math.ceil(remainingTimeInSeconds.value / 60), 0));
		let remainingTimeInterval: ReturnType<typeof setInterval> | null = null;

		const startInterval = () => {
			stopInterval();

			remainingTimeInterval = setInterval(() => {
				remainingTimeInSeconds.value -= 1;
				handleTimerTick();
			}, 1000);
		};

		const stopInterval = () => {
			if (remainingTimeInterval) {
				clearInterval(remainingTimeInterval);
				remainingTimeInterval = null;
			}
		};

		const setTimer = (seconds: number) => {
			remainingTimeInSeconds.value = seconds;
		};

		return {
			remainingTimeInSeconds: readonly(remainingTimeInSeconds),
			remainingTimeInMinutes: readonly(remainingTimeInMinutes),
			setTimer,
			startInterval,
			stopInterval,
		};
	};

	// --- Broadcast Channel Management ---

	const useSessionBroadcast = (
		sessionStatus: Ref<SessionStatus | null>,
		setState: (status: SessionStatus) => Promise<void> | void,
		countdownTimer: ReturnType<typeof useCountdownTimer>
	) => {
		const sessionBroadcast = useBroadcastChannel({ name: "user-session-channel" });
		const { remainingTimeInSeconds, setTimer } = countdownTimer;

		// share current state and timing
		const sendState = () => {
			sessionBroadcast.post(`${sessionStatus.value ?? ""}:${remainingTimeInSeconds.value ?? "0"}`);
		};

		// handle incoming broadcast messages to sync session status across tabs
		watch(sessionBroadcast.data, (message) => {
			logger.log("Received broadcast message:", message);
			if (message === "logout") {
				setState(SessionStatus.Expired);
				globalThis.location.assign("/logout");
			}

			if (typeof message === "string" && message.includes(":")) {
				const [status, time] = message.split(":");
				const timeInSeconds = Number.parseInt(time, 10);
				if (!Number.isNaN(timeInSeconds)) {
					setTimer(timeInSeconds);
				}
				if (Object.values(SessionStatus).includes(status as SessionStatus)) {
					setState(status as SessionStatus);
				}
			}
		});

		return {
			sendState,
		};
	};

	// --- Session Management ---

	const createSession = () => {
		startInterval();
		setStateAndBroadcast(SessionStatus.Started);
	};

	const extendSession = async () => {
		stopInterval();

		if (sessionStatus.value && [SessionStatus.Expired, SessionStatus.Error].includes(sessionStatus.value)) {
			return;
		}

		try {
			await extendSessionRequest();
			await setStateAndBroadcast(SessionStatus.Extended);
		} catch {
			await setStateAndBroadcast(SessionStatus.Error);
		}
	};

	// --- Interval Management ---

	const checkEverySecond = async () => {
		if (remainingTimeInSeconds.value <= 0) {
			await setStateAndBroadcast(SessionStatus.Expired);
		} else if (remainingTimeInSeconds.value <= WARNING_THRESHOLD) {
			await setStateAndBroadcast(SessionStatus.AboutToExpire);
		}
		logger.log("Remaining Time (s):", remainingTimeInSeconds.value, "Status:", sessionStatus.value);
	};

	const countdownTimer = useCountdownTimer(checkEverySecond);
	const { remainingTimeInSeconds, remainingTimeInMinutes, setTimer, startInterval, stopInterval } = countdownTimer;

	// --- State Handling ---

	const setStartedState = () => {
		sessionStatus.value = SessionStatus.Started;
		setTimer(SESSION_TIMEOUT);
		showDialog.value = false;
		errorOnExtend.value = false;
	};

	const setAboutToExpireState = async () => {
		sessionStatus.value = SessionStatus.AboutToExpire;
		showDialog.value = true;
		await updateRemainingTime();
	};

	const setExtendedState = () => {
		sessionStatus.value = SessionStatus.Extended;
		showDialog.value = false;
		errorOnExtend.value = false;
		startInterval();
		notify("success", t("feature-autoLogout.message.extending-session-success"));
	};

	const setExpiredState = async () => {
		sessionStatus.value = SessionStatus.Expired;
		setTimer(0);
		stopInterval();
		showDialog.value = true;
		notify("error", t("feature-autoLogout.message.error.401"), false);
		useAppStore().clearUserSession();
		await logoutUserSilently();
	};

	const setErrorState = () => {
		sessionStatus.value = SessionStatus.Error;
		errorOnExtend.value = true;
		stopInterval();
		notify("error", t("feature-autoLogout.message.extending-session-failure"));
	};

	const stateFunctions: Record<SessionStatus, () => Promise<void> | void> = {
		[SessionStatus.Started]: setStartedState,
		[SessionStatus.AboutToExpire]: setAboutToExpireState,
		[SessionStatus.Extended]: setExtendedState,
		[SessionStatus.Expired]: setExpiredState,
		[SessionStatus.Error]: setErrorState,
	};

	// set a state and call the corresponding function without broadcasting
	const setState = async (status: SessionStatus) => {
		if (sessionStatus.value === status) return;

		const stateFunction = stateFunctions[status];
		if (stateFunction) {
			await stateFunction();
		} else {
			logger.warn("Unknown session status:", status);
		}
	};

	// set a state and broadcast the new state to other tabs
	const setStateAndBroadcast = async (status: SessionStatus) => {
		if (sessionStatus.value === status) return;

		await setState(status);
		sendState();
	};

	// --- api interactions ---

	const logoutUserSilently = async () => {
		await fetch("/logout").catch((error) => {
			logger.error("Error during logout fetch call:", error);
		});
	};

	const extendSessionRequest = async () => {
		const result = await $axios.post(JWT_TIMER_ENDPOINT);
		setTimer(result.data.ttl);
	};

	// call the server to receive the remaining time to live of the JWT
	const updateRemainingTime = async (retryCount = 0): Promise<void> => {
		const { result, error } = await execute(() => $axios.get(JWT_TIMER_ENDPOINT));

		if (error) {
			if (retryCount < MAX_RETRIES) {
				const delayMs = 2 ** retryCount * 1000;
				await new Promise((resolve) => setTimeout(resolve, delayMs));
				return updateRemainingTime(retryCount + 1);
			}
			setErrorState();
			return;
		}

		if (result.data.ttl) {
			setTimer(result.data.ttl);
		}
	};

	// --- Broadcast Session Status Changes ---

	const { sendState } = useSessionBroadcast(sessionStatus, setState, countdownTimer);

	// --- Helpers ---

	const notify = (status: AlertStatus, text: string, autoClose = true) => {
		useNotificationStore().notify({
			text,
			status,
			autoClose,
		});
	};

	return {
		errorOnExtend,
		remainingTimeInSeconds: readonly(remainingTimeInSeconds),
		remainingTimeInMinutes: readonly(remainingTimeInMinutes),
		sessionStatus,
		showDialog,
		createSession,
		extendSession,
	};
};
