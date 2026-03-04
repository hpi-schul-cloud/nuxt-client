import { SessionStatus } from "./types";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { $axios } from "@/utils/api";
import { AlertStatus, useAppStore, useNotificationStore } from "@data-app";
import { useEnvConfig } from "@data-env";
import { logger } from "@util-logger";
import { useBroadcastChannel } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const JWT_TIMER_ENDPOINT = "/v1/accounts/jwtTimer";
const MAX_RETRIES = 3;
const DEFAULT_TIMEOUT_SECONDS = 2 * 60 * 60;
const DEFAULT_WARNING_SECONDS = 1 * 60 * 60;

export const useAutoLogout = () => {
	const { t } = useI18n();
	const { execute } = useSafeAxiosTask();

	const showDialog = ref(false);
	const errorOnExtend = ref(false);
	const sessionStatus = ref<SessionStatus | null>(null);
	const remainingTimeInSeconds = ref(0);

	const { JWT_SHOW_TIMEOUT_WARNING_SECONDS, JWT_TIMEOUT_SECONDS } = useEnvConfig().value;
	const SESSION_TIMEOUT = JWT_TIMEOUT_SECONDS || DEFAULT_TIMEOUT_SECONDS;
	const WARNING_THRESHOLD = JWT_SHOW_TIMEOUT_WARNING_SECONDS || DEFAULT_WARNING_SECONDS;

	const remainingTimeInMinutes = computed(() => Math.max(Math.ceil(remainingTimeInSeconds.value / 60), 0));

	// --- Session Management ---

	const createSession = () => {
		startInterval();
		goToState(SessionStatus.Started);
	};

	const extendSession = async () => {
		stopInterval();

		if (sessionStatus.value === SessionStatus.Expired) {
			return;
		}

		try {
			await $axios.post(JWT_TIMER_ENDPOINT);
			await updateRemainingTime();
			await goToState(SessionStatus.Extended);
		} catch {
			await goToState(SessionStatus.Error);
		}
	};

	// --- Interval Management ---

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

	const handleTimerTick = async () => {
		if (remainingTimeInSeconds.value <= 0) {
			await goToState(SessionStatus.Expired);
		} else if (remainingTimeInSeconds.value <= WARNING_THRESHOLD) {
			await goToState(SessionStatus.AboutToExpire);
		}
		logger.log("Remaining Time (s):", remainingTimeInSeconds.value, "Status:", sessionStatus.value);
	};

	// --- State Handling ---

	const setStartedState = () => {
		sessionStatus.value = SessionStatus.Started;
		remainingTimeInSeconds.value = SESSION_TIMEOUT;
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
		stopInterval();
		showDialog.value = false;
		errorOnExtend.value = false;
		startInterval();
		notify("success", t("feature-autoLogout.message.extending-session-success"));
	};

	const setExpiredState = async () => {
		sessionStatus.value = SessionStatus.Expired;
		remainingTimeInSeconds.value = 0;
		stopInterval();
		showDialog.value = true;
		notify("error", t("feature-autoLogout.message.error.401"), false);
		useAppStore().clearUserSession();
		await fetch("/logout").catch((error) => {
			logger.error("Error during logout fetch call:", error);
		});
	};

	const setErrorState = () => {
		sessionStatus.value = SessionStatus.Error;
		errorOnExtend.value = true;
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
	const goToState = async (status: SessionStatus) => {
		if (sessionStatus.value === status) return;

		await setState(status);
		broadcastState();
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
			sessionStatus.value = SessionStatus.Error;
			return;
		}

		if (result.data.ttl) {
			remainingTimeInSeconds.value = result.data.ttl;
		}
	};

	// --- Broadcast Session Status Changes ---

	const sessionBroadcast = useBroadcastChannel({ name: "user-session-channel" });

	const broadcastState = () => {
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
				remainingTimeInSeconds.value = timeInSeconds;
			}
			setState(status as SessionStatus);
		}
	});

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
		remainingTimeInMinutes,
		remainingTimeInSeconds,
		sessionStatus,
		showDialog,
		createSession,
		extendSession,
	};
};
