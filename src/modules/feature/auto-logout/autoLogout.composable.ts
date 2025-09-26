import { AlertPayload } from "@/store/types/alert-payload";
import { computed, Ref, ref, watch } from "vue";
import { notifierModule } from "@/store";
import { useI18n } from "vue-i18n";
import { $axios } from "@/utils/api";
import { SessionStatus } from "./types";
import { useEnvConfig } from "@data-env";
import { useAppStore } from "@data-app";

export const useAutoLogout = () => {
	const { t } = useI18n();
	const showDialog = ref(false);
	const errorOnExtend = ref(false);
	const sessionStatus: Ref<SessionStatus | null> = ref(null);
	const isTTLUpdated = ref(false);

	let remainingTimePolling: ReturnType<typeof setInterval> | null = null;
	let ttlTimeoutPolling: ReturnType<typeof setTimeout> | null = null;
	let retry = 0;

	const { JWT_SHOW_TIMEOUT_WARNING_SECONDS, JWT_TIMEOUT_SECONDS } =
		useEnvConfig().value;

	const defaultRemainingTime = JWT_TIMEOUT_SECONDS || 2 * 60 * 60;
	const DEFAULT_SHOW_WARNING_TIME =
		JWT_SHOW_TIMEOUT_WARNING_SECONDS || 1 * 60 * 60;

	let remainingTimeInSeconds = defaultRemainingTime;
	let ttlCount = 0;

	const remainingTimeInMinutes = computed(() =>
		Math.max(Math.floor(remainingTimeInSeconds / 60), 0)
	);

	const clearPollings = () => {
		if (remainingTimePolling) {
			clearInterval(remainingTimePolling);
			remainingTimePolling = null;
		}
		if (ttlTimeoutPolling) {
			clearTimeout(ttlTimeoutPolling);
			ttlTimeoutPolling = null;
		}
	};

	const startTimeout = () => {
		return setTimeout(
			async () => {
				retry++;
				try {
					const response = await $axios.get("/v1/accounts/jwtTimer");
					ttlCount = response.data.ttl;

					if (ttlCount > remainingTimeInSeconds) {
						isTTLUpdated.value = true;
						showDialog.value = false;
					} else {
						showDialog.value = true;
					}
					return ttlCount;
				} catch {
					sessionStatus.value = SessionStatus.Error;
					return -1;
				} finally {
					if (ttlTimeoutPolling) {
						clearTimeout(ttlTimeoutPolling);
						ttlTimeoutPolling = null;
					}
				}
			},
			2 ** retry * 1000
		);
	};

	const checkTTL = async () => {
		if (ttlTimeoutPolling) return ttlCount;

		ttlTimeoutPolling = startTimeout();
	};

	const createSession = () => {
		clearPollings();

		remainingTimeInSeconds = defaultRemainingTime;
		if (showDialog.value) showDialog.value = false;
		sessionStatus.value = null;
		errorOnExtend.value = false;
		isTTLUpdated.value = false;
		retry = 0;

		remainingTimePolling = setInterval(async () => {
			remainingTimeInSeconds -= 1;

			if (remainingTimeInSeconds <= DEFAULT_SHOW_WARNING_TIME) {
				sessionStatus.value = null;
				await checkTTL();
			}

			if (remainingTimeInSeconds <= 0) {
				sessionStatus.value = SessionStatus.Ended;
				clearInterval(remainingTimePolling!);
				remainingTimePolling = null;
			}
		}, 1000);
	};

	const extendSession = async () => {
		clearPollings();

		if (sessionStatus.value === SessionStatus.Ended) {
			useAppStore().logout();
			return;
		}

		try {
			await $axios.post("/v1/accounts/jwtTimer");
			const response = await $axios.get("/v1/accounts/jwtTimer");
			const ttlCount = response.data.ttl;

			remainingTimeInSeconds = ttlCount;
			showDialog.value = false;
			errorOnExtend.value = false;
			isTTLUpdated.value = true;

			createSession();
			retry = 0;
			sessionStatus.value = SessionStatus.Continued;
		} catch {
			errorOnExtend.value = true;
			sessionStatus.value = SessionStatus.Error;
		}
	};

	const notificationMap: Record<SessionStatus, AlertPayload> = {
		[SessionStatus.Continued]: {
			text: t("feature-autoLogout.message.success"),
			status: "success",
			timeout: 5000,
		},
		[SessionStatus.Error]: {
			text: t("feature-autoLogout.message.error"),
			status: "error",
			timeout: 5000,
		},
		[SessionStatus.Ended]: {
			text: t("feature-autoLogout.message.error.401"),
			status: "error",
			autoClose: false,
		},
	};

	watch(
		() => sessionStatus.value,
		(newValue) => {
			if (newValue === null) return;
			notifierModule.show(notificationMap[newValue]);
		}
	);

	watch(
		() => isTTLUpdated.value,
		(newValue) => {
			if (newValue) {
				createSession();
				isTTLUpdated.value = false;
			}
		}
	);

	return {
		errorOnExtend,
		isTTLUpdated,
		remainingTimeInMinutes,
		remainingTimeInSeconds,
		sessionStatus,
		showDialog,
		createSession,
		extendSession,
	};
};
