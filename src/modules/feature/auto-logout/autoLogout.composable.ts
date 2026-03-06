/**
 * Composable for managing automatic session timeout and logout functionality.
 * Handles session expiration warnings, session extension, and cross-tab synchronization.
 *
 * Uses environment variables for configuration:
 * - JWT_TIMEOUT_SECONDS: Total session duration (default: 2 hours)
 * - JWT_SHOW_TIMEOUT_WARNING_SECONDS: Time before expiry to show warning (default: 1 hour)
 *
 * @returns remainingTimeInSeconds - Readonly ref with remaining session time
 * @returns remainingTimeInMinutes - Readonly ref with remaining time in minutes
 * @returns sessionState - Current session state (Started, AboutToExpire, Extended, Expired, Error)
 * @returns showDialog - Whether to display the timeout warning/expired dialog
 * @returns createSession - Initialize and start the session timer
 * @returns extendSession - Attempt to extend the current session
 *
 * @example Basic usage in a layout component:
 * ```ts
 * const {
 *   showDialog,
 *   sessionState,
 *   remainingTimeInMinutes,
 *   createSession,
 *   extendSession,
 * } = useAutoLogout();
 *
 * onMounted(() => {
 *   createSession();
 * });
 * ```
 *
 * @example Handling session states:
 * ```vue
 * <AutoLogoutWarning
 *   v-if="showDialog && sessionState === SessionState.AboutToExpire"
 *   :remaining-minutes="remainingTimeInMinutes"
 *   @extend="extendSession"
 * />
 * <LoggedOutDialog v-if="sessionState === SessionState.Expired" />
 * ```
 */

import { useCountdownTimer } from "./countdownTimer.composable";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { $axios } from "@/utils/api";
import { notifyError, notifySuccess, useAppStore } from "@data-app";
import { useEnvConfig } from "@data-env";
import { SessionState, useSessionBroadcast } from "@util-broadcast-channel";
import { logger } from "@util-logger";
import { readonly, ref } from "vue";

const JWT_TIMER_ENDPOINT = "/v1/accounts/jwtTimer";
const MAX_RETRIES = 3;
const DEFAULT_TIMEOUT_SECONDS = 2 * 60 * 60; // 2 hours
const DEFAULT_WARNING_SECONDS = 1 * 60 * 60; // 1 hour

export const useAutoLogout = () => {
	const { execute } = useSafeAxiosTask();

	const showDialog = ref(false);
	const sessionState = ref<SessionState | null>(null);

	const { JWT_SHOW_TIMEOUT_WARNING_SECONDS, JWT_TIMEOUT_SECONDS } = useEnvConfig().value;
	const SESSION_TIMEOUT = JWT_TIMEOUT_SECONDS || DEFAULT_TIMEOUT_SECONDS;
	const WARNING_THRESHOLD = JWT_SHOW_TIMEOUT_WARNING_SECONDS || DEFAULT_WARNING_SECONDS;

	// --- Session Management ---

	const createSession = () => {
		startTimer();
		setStateAndBroadcast(SessionState.Started);
	};

	const extendSession = async () => {
		stopTimer();

		if (sessionState.value && [SessionState.Expired, SessionState.Error].includes(sessionState.value)) {
			return;
		}

		try {
			await extendSessionRequest();
			await setStateAndBroadcast(SessionState.Extended);
		} catch {
			await setStateAndBroadcast(SessionState.Error);
		}
	};

	// --- Interval Management ---

	const checkEverySecond = async () => {
		if (remainingTimeInSeconds.value <= 0) {
			await setStateAndBroadcast(SessionState.Expired);
		} else if (remainingTimeInSeconds.value <= WARNING_THRESHOLD) {
			await setStateAndBroadcast(SessionState.AboutToExpire);
		}
	};

	const countdownTimer = useCountdownTimer(checkEverySecond);
	const { remainingTimeInSeconds, remainingTimeInMinutes, setTime, startTimer, stopTimer } = countdownTimer;

	// --- State Handling ---

	const setStartedState = () => {
		sessionState.value = SessionState.Started;
		setTime(SESSION_TIMEOUT);
		showDialog.value = false;
	};

	const setAboutToExpireState = async () => {
		sessionState.value = SessionState.AboutToExpire;
		showDialog.value = true;
		await updateRemainingTime();
	};

	const setExtendedState = () => {
		sessionState.value = SessionState.Extended;
		showDialog.value = false;
		startTimer();
		notifySuccess("feature-autoLogout.message.extending-session-success");
	};

	const setExpiredState = async () => {
		sessionState.value = SessionState.Expired;
		setTime(0);
		stopTimer();
		showDialog.value = true;
		notifyError("feature-autoLogout.message.error.401", false);
		useAppStore().clearUserSession();
		await logoutUserSilently();
	};

	const setErrorState = () => {
		sessionState.value = SessionState.Error;
		stopTimer();
		notifyError("feature-autoLogout.message.extending-session-failure");
	};

	const stateFunctions: Record<SessionState, () => Promise<void> | void> = {
		[SessionState.Started]: setStartedState,
		[SessionState.AboutToExpire]: setAboutToExpireState,
		[SessionState.Extended]: setExtendedState,
		[SessionState.Expired]: setExpiredState,
		[SessionState.Error]: setErrorState,
	};

	// set a state and call the corresponding function without broadcasting
	const setState = async (state: SessionState) => {
		if (sessionState.value === state) return;

		const stateFunction = stateFunctions[state];
		if (stateFunction) {
			await stateFunction();
		}
	};

	// set a state and broadcast the new state to other tabs
	const setStateAndBroadcast = async (state: SessionState) => {
		if (sessionState.value === state) return;

		await setState(state);
		sendStateAndTime(sessionState.value, remainingTimeInSeconds.value);
	};

	// --- api interactions ---

	const logoutUserSilently = async () => {
		try {
			await $axios.get("/logout");
		} catch (error) {
			logger.error("Unexpected error during silent logout:", error);
		}
	};

	const extendSessionRequest = async () => {
		const result = await $axios.post(JWT_TIMER_ENDPOINT);
		setTime(result.data.ttl);
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

		if (result?.data?.ttl) {
			setTime(result.data.ttl);
		}
	};

	// --- Broadcast Session State Changes ---

	const { sendStateAndTime } = useSessionBroadcast({ setState, setTime });

	return {
		remainingTimeInSeconds: readonly(remainingTimeInSeconds),
		remainingTimeInMinutes: readonly(remainingTimeInMinutes),
		sessionState,
		showDialog,
		createSession,
		extendSession,
	};
};
